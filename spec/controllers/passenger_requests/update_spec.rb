# frozen_string_literal: true

require 'rails_helper'

RSpec.describe(PassengerRequestsController) do
  before(:each) do
    @request.env['devise.mapping'] = Devise.mappings[:user]
    @driver_user = FactoryBot.create(:user)
    @passenger_user = FactoryBot.create(:user)
    @from = FactoryBot.create(:place)
    @to = FactoryBot.create(:place)
    @trip = FactoryBot.create(:trip, from_id: @from.id, to_id: @to.id, user_id: @driver_user.id)
    @passenger_request = FactoryBot.create(:passenger_request, trip_id: @trip.id, user_id: @passenger_user.id, status: 'pending',
                                                               comments: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris.'
    )
    sign_in @driver_user
  end

  after(:each) do
    PassengerRequest.delete_all
    Trip.delete_all
    User.delete_all
    Place.delete_all
  end

  describe 'PATCH /update' do
    context 'with accepted status' do
      let(:new_params) do
        { id: @passenger_request.id, status: 'accepted' }
      end
      it 'should update passenger request status to accepted' do
        request.accept = 'application/json'
        request.content_type = 'application/json'
        patch :update, params: new_params
        @passenger_request.reload
        expect(@passenger_request.status).to(eq('accepted'))
      end
    end
  end
  describe 'PATCH /update' do
    context 'with rejected status' do
      let(:new_params) do
        { id: @passenger_request.id, status: 'rejected' }
      end
      it 'should update passenger request status to accepted' do
        request.accept = 'application/json'
        request.content_type = 'application/json'
        patch :update, params: new_params
        @passenger_request.reload
        expect(@passenger_request.status).to(eq('rejected'))
      end
    end
  end
end
