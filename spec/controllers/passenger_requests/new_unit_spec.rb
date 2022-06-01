# frozen_string_literal: true

require 'rails_helper'

RSpec.describe(PassengerRequestsController) do
  before(:each) do
    @first_user = FactoryBot.create(:user)
    @second_user = FactoryBot.create(:user, name: 'second_user')
    @from = FactoryBot.create(:place)
    @to = FactoryBot.create(:place)
    @first_user.save
    @second_user.save
    @from.save
    @to.save
    @trip_with_seats = FactoryBot.create(:trip, from_id: @from.id, to_id: @to.id, user_id: @second_user.id, available_seats: 2)
    @trip_with_seats.save
    @trip_with_noseats = FactoryBot.create(:trip, from_id: @from.id, to_id: @to.id, user_id: @second_user.id, available_seats: 0)
    @trip_with_noseats.save
    @trip_from_same_user = FactoryBot.create(:trip, from_id: @from.id, to_id: @to.id, user_id: @first_user.id, available_seats: 0)
    @trip_from_same_user.save
  end

  after(:each) do
    PassengerRequest.delete_all
    Trip.delete_all
    User.delete_all
    Place.delete_all
  end

  describe 'GET /new' do
    it 'get a 200 response if connected' do
      sign_in @first_user
      get :new, params: { trip_id: @trip_with_seats.id }
      expect(response).to(have_http_status(:success))
    end
    it 'get a 302 response if not connected' do
      get :new, params: { trip_id: @trip_with_seats.id }
      expect(response).to(have_http_status(302))
    end
  end
  describe 'POST create' do
    it 'a request is created if conditions are appropriate' do
      sign_in @first_user
      expect { post(:create, params: { passenger_request: { comment: 'a comment', trip_id: @trip_with_seats.id } }) }.to(change { PassengerRequest.count }.by(1))
    end
    it 'a request is not created if it has no seats' do
      sign_in @first_user
      expect { post(:create, params: { passenger_request: { comment: 'a comment', trip_id: @trip_with_noseats.id } }) }.to(change { PassengerRequest.count }.by(0))
    end
    it 'a request is not created if it belongs to the same user' do
      sign_in @first_user
      expect { post(:create, params: { passenger_request: { comment: 'a comment', trip_id: @trip_from_same_user.id } }) }.to(change { PassengerRequest.count }.by(0))
    end
    it 'a request is not created if user not connected' do
      sign_in @first_user
      expect { post(:create, params: { passenger_request: { comment: 'a comment', trip_id: @trip_from_same_user.id } }) }.to(change { PassengerRequest.count }.by(0))
    end
  end
end
