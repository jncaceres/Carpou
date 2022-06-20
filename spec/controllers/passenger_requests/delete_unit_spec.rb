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

    @request_user1_driver2_pending = FactoryBot.create(:passenger_request, comments: 'Some comments', user_id: @user1.id, trip_id: @trip_driver2.id, status: 'pending')
    @request_user1_driver2_accepted = FactoryBot.create(:passenger_request, comments: 'Some comments', user_id: @user1.id, trip_id: @trip_driver2.id, status: 'accepted')
    @request_user1_driver2_rejected = FactoryBot.create(:passenger_request, comments: 'Some comments', user_id: @user1.id, trip_id: @trip_driver2.id, status: 'rejected')
    @request_user1_driver2_canceled = FactoryBot.create(:passenger_request, comments: 'Some comments', user_id: @user1.id, trip_id: @trip_driver2.id, status: 'canceled')
    @request_user2_driver1_pending = FactoryBot.create(:passenger_request, comments: 'Some comments', user_id: @user2.id, trip_id: @trip_driver1.id, status: 'pending')
    @request_user1_driver2_pending.save
    @request_user1_driver2_accepted.save
    @request_user2_driver1_pending.save
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
      delete :destroy, params: { id: @request_user1_driver2_pending.id }
      expect(response).to(have_http_status(302))
    end
    it 'get a 302 response if not connected' do
      delete :destroy, params: { id: @request_user1_driver2_pending.id }
      expect(response).to(have_http_status(302))
    end
    it 'a request is updated to canceled if user is allowed and request is pending' do
      sign_in @user1
      delete :destroy, params: { id: @request_user1_driver2_pending.id }
      @request_user1_driver2_pending.reload
      expect(@request_user1_driver2_pending.status).to(eq('canceled'))
    end
    it 'a request is updated to canceled if user is allowed and request is accepted' do
      sign_in @user1
      delete :destroy, params: { id: @request_user1_driver2_accepted.id }
      @request_user1_driver2_accepted.reload
      expect(@request_user1_driver2_accepted.status).to(eq('canceled'))
    end
    it 'a request is not updated if user is allowed and request is rejected' do
      sign_in @user1
      delete :destroy, params: { id: @request_user1_driver2_rejected.id }
      @request_user1_driver2_rejected.reload
      expect(@request_user1_driver2_rejected.status).to(eq('rejected'))
    end
    it 'a request is not updated if user is allowed and request is canceled' do
      sign_in @user1
      delete :destroy, params: { id: @request_user1_driver2_canceled.id }
      @request_user1_driver2_canceled.reload
      expect(@request_user1_driver2_canceled.status).to(eq('canceled'))
    end
    it 'a request is not updated if user is not allowed' do
      sign_in @user1
      original_status = @request_user2_driver1_pending.status
      delete :destroy, params: { id: @request_user2_driver1_pending.id }
      @request_user1_driver2_pending.reload
      expect(@request_user2_driver1_pending.status).to(eq(original_status))
    end
    it 'send an email if requeste was accepted' do
      sign_in @user1
      expect { delete(:destroy, params: { id: @request_user1_driver2_accepted.id }) }.to(change { ActionMailer::Base.deliveries.count }.by(1))
    end
  end
end
