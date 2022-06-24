# frozen_string_literal: true

require 'rails_helper'

RSpec.describe(TripsController) do
  before(:each) do
    @user = FactoryBot.create(:user)
    @from = FactoryBot.create(:place)
    @to = FactoryBot.create(:place)
    @user.save
    @from.save
    @to.save
  end
  after(:each) do
    PassengerRequest.delete_all
    Trip.delete_all
    Place.delete_all
    User.delete_all
  end
  describe 'GET index' do
    it 'get all valid trips' do
      trip = FactoryBot.create(:trip, from_id: @from.id, to_id: @to.id, user_id: @user.id)
      trip.save
      json_trip = trip.as_json(include: %i[user to from])
      get :index
      controller_trips = controller.view_assigns['trips']
      expect(controller_trips).to(eq([json_trip]))
    end

    it 'should not get trips if trip is from past' do
      trip = FactoryBot.create(:trip, :skip_validate, from_id: @from.id, to_id: @to.id, user_id: @user.id, leaving_at: '2021-09-02T18:24:00.000Z')
      trip.save
      get :index
      controller_trips = controller.view_assigns['trips']
      expect(controller_trips).to(eq([]))
    end

    it 'should only get trips which matches the parameters' do
      first_trip = FactoryBot.create(:trip, from_id: @from.id, to_id: @to.id, user_id: @user.id, leaving_at: '2022-09-02T18:24:00.000Z')
      second_trip = FactoryBot.create(:trip, from_id: @from.id, to_id: @to.id, user_id: @user.id, leaving_at: '2022-10-02T18:24:00.000Z')
      first_trip.save
      second_trip.save
      get :index, params: { from: first_trip.from_id, to: first_trip.to_id, date: '2022-09-02', checked: 'false' }
      json_first_trip = first_trip.as_json(include: %i[user to from])
      controller_trips = controller.view_assigns['trips']
      expect(controller_trips).to(eq([json_first_trip]))
    end

    it 'should only get trips which matches the parameters and from future if checked equals true' do
      first_trip = FactoryBot.create(:trip, from_id: @from.id, to_id: @to.id, user_id: @user.id, leaving_at: '2022-09-02T18:24:00.000Z')
      second_trip = FactoryBot.create(:trip, from_id: @from.id, to_id: @to.id, user_id: @user.id, leaving_at: '2022-10-02T18:24:00.000Z')
      first_trip.save
      second_trip.save
      get :index, params: { from: first_trip.from_id, to: first_trip.to_id, date: '2022-09-02', checked: 'true' }
      json_first_trip = first_trip.as_json(include: %i[user to from])
      json_second_trip = second_trip.as_json(include: %i[user to from])
      controller_trips = controller.view_assigns['trips']
      expect(controller_trips).to(eq([json_first_trip, json_second_trip]))
    end
  end
  describe 'GET my_trips' do
    before(:each) do
      @user = FactoryBot.create(:user)
      @user.confirm
      @user.save
      sign_in @user
      @user2 = FactoryBot.create(:user)
      @user2.save
      @from = FactoryBot.create(:place)
      @to = FactoryBot.create(:place)
      @from.save
      @to.save
    end
    it 'get a 200 response if connected and ask for its trips' do
      get :trips_from_user, params: { id: @user.id }
      expect(response).to(have_http_status(:success))
    end
    it 'get a 302 response if connected and ask for trips of other users' do
      get :trips_from_user, params: { id: @user2.id }
      expect(response).to(have_http_status(:redirect))
    end
    it 'should only get trips which matches the owner with the user' do
      first_trip = FactoryBot.create(:trip, from_id: @from.id, to_id: @to.id, user_id: @user.id, leaving_at: '2022-09-02T18:24:00.000Z')
      second_trip = FactoryBot.create(:trip, from_id: @from.id, to_id: @to.id, user_id: @user2.id, leaving_at: '2022-10-02T18:24:00.000Z')
      first_trip.save
      second_trip.save
      # get "/users/#{@user.id}/trips"
      get :trips_from_user, params: { id: @user.id }
      json_first_trip = first_trip.as_json(include: %i[user to from])
      controller_trips = controller.view_assigns['future_trips']
      expect(controller_trips).to(eq([json_first_trip]))
    end
    it 'should not get trips which matches the owner with other user' do
      second_trip = FactoryBot.create(:trip, from_id: @from.id, to_id: @to.id, user_id: @user2.id, leaving_at: '2022-10-02T18:24:00.000Z')
      second_trip.save
      # get "/users/#{@user.id}/trips"
      get :trips_from_user, params: { id: @user.id }
      controller_trips = controller.view_assigns['future_trips']
      expect(controller_trips).to(eq([]))
    end
  end
end
