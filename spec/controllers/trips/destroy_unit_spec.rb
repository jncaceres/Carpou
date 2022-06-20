# frozen_string_literal: true

require 'rails_helper'

RSpec.describe(TripsController) do
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
  end

  after(:each) do
    PassengerRequest.delete_all
    Trip.delete_all
    User.delete_all
    Place.delete_all
  end

  describe 'Delete trip' do
    it 'a trip is deleted if user is allowed' do
      sign_in @user1
      expect { delete(:destroy, params: { id: @trip_driver1.id }) }.to(change { Trip.count }.by(-1))
    end
    it 'a trip is not deleted if user is not allowed' do
      sign_in @user1
      expect { delete(:destroy, params: { id: @trip_driver2.id }) }.to(change { Trip.count }.by(0))
    end
    it 'send an email if trip has pending requests' do
      request = FactoryBot.create(:passenger_request, comments: 'Some comments', user_id: @user2.id, trip_id: @trip_driver1.id, status: 0)
      request.save
      sign_in @user1
      expect { delete(:destroy, params: { id: @trip_driver1.id }) }.to(change { ActionMailer::Base.deliveries.count }.by(1))
    end
    it 'send an email if trip has accepted requests' do
      request = FactoryBot.create(:passenger_request, comments: 'Some comments', user_id: @user2.id, trip_id: @trip_driver1.id, status: 1)
      request.save
      sign_in @user1
      expect { delete(:destroy, params: { id: @trip_driver1.id }) }.to(change { ActionMailer::Base.deliveries.count }.by(1))
    end
    it 'dont send an email for rejected requests' do
      request = FactoryBot.create(:passenger_request, comments: 'Some comments', user_id: @user2.id, trip_id: @trip_driver1.id, status: 2)
      request.save
      sign_in @user1
      expect { delete(:destroy, params: { id: @trip_driver1.id }) }.to(change { ActionMailer::Base.deliveries.count }.by(0))
    end
    it 'dont send an email for canceled requests' do
      request = FactoryBot.create(:passenger_request, comments: 'Some comments', user_id: @user2.id, trip_id: @trip_driver1.id, status: 3)
      request.save
      sign_in @user1
      expect { delete(:destroy, params: { id: @trip_driver1.id }) }.to(change { ActionMailer::Base.deliveries.count }.by(0))
    end
  end
end
