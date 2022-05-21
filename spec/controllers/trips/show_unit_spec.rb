# frozen_string_literal: true

require 'rails_helper'

RSpec.describe(TripsController) do
  before(:each) do
    @first_user = FactoryBot.create(:user)
    @second_user = FactoryBot.create(:user, name: 'second_user')
    @from = FactoryBot.create(:place)
    @to = FactoryBot.create(:place)
    @first_user.save
    @second_user.save
    @from.save
    @to.save
  end
  after(:each) do
    Trip.delete_all
    Place.delete_all
    User.delete_all
  end
  describe 'GET show' do
    it 'should display info of correct trip' do
      first_trip = FactoryBot.create(:trip, from_id: @from.id, to_id: @to.id, user_id: @first_user.id)
      second_trip = FactoryBot.create(:trip, from_id: @from.id, to_id: @to.id, user_id: @second_user.id)
      first_trip.save
      second_trip.save
      json_trip = first_trip.as_json(include: %i[user to from])
      json_trip2 = second_trip.as_json(include: %i[user to from])
      get :show, params: { id: first_trip.id }
      controller_trip = controller.view_assigns['trip']
      expect(controller_trip).to(eq(json_trip))
      expect(controller_trip).not_to(eq(json_trip2))
    end
  end
end
