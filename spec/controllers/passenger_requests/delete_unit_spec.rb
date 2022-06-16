# frozen_string_literal: true

require 'rails_helper'

RSpec.describe(PassengerRequestsController) do
  before(:each) do
    @user1 = FactoryBot.create(:user)
    @user2 = FactoryBot.create(:user, name: 'second_user')
    @user1.save
    @user2.save

    @from = FactoryBot.create(:place)
    @to = FactoryBot.create(:place)
    @from.save
    @to.save

    @trip_driver1 = FactoryBot.create(:trip, from_id: @from.id, to_id: @to.id, user_id: @user1.id, available_seats: 2)
    @trip_driver2 = FactoryBot.create(:trip, from_id: @from.id, to_id: @to.id, user_id: @user2.id, available_seats: 2)
    @trip_driver1.save
    @trip_driver2.save

    @request_user1_driver2 = FactoryBot.create(:passenger_request, comments: "Some comments", user: @user1.id, trip: @trip_driver2.id)
    @request_user2_driver1 = FactoryBot.create(:passenger_request, comments: "Some comments", user: @user2.id, trip: @trip_driver1.id)
  end

  after(:each) do
    PassengerRequest.delete_all
    Trip.delete_all
    User.delete_all
    Place.delete_all
  end

  describe 'DELETE passenger_request/:id' do
    it 'get a 302 response if connected' do
      sign_in @user1
      delete "/passenger_request/#{request_user1_driver2}"
      expect(response).to have_http_status(302)
    end
    it 'get a 302 response if not connected' do
      delete "/passenger_request/#{request_user1_driver2}"
      expect(response).to have_http_status(302)
    end
  end
end
