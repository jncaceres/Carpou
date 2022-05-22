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

    it 'should only get trips which matches the parameters' do
      first_trip = FactoryBot.create(:trip, from_id: @from.id, to_id: @to.id, user_id: @user.id, leaving_at: '2022-09-02T18:24:00.000Z')
      second_trip = FactoryBot.create(:trip, from_id: @from.id, to_id: @to.id, user_id: @user.id, leaving_at: '2022-10-02T18:24:00.000Z')
      first_trip.save
      second_trip.save
      get :index, params: { from: first_trip.from_id, to: first_trip.to_id, date: '2022-09-02' }
      json_first_trip = first_trip.as_json(include: %i[user to from])
      controller_trips = controller.view_assigns['trips']
      expect(controller_trips).to(eq([json_first_trip]))
    end
  end
end
