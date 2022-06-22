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
  describe 'GET edit' do
    it 'get trips/:id/edit' do
      trip = FactoryBot.create(:trip, from_id: @from.id, to_id: @to.id, user_id: @user.id)
      trip.save
      json_trip = trip.as_json(include: %i[user to from])
      get :edit, params: { id: trip.id }
      controller_trip = controller.view_assigns['trip']
      expect(response).to(be_successful)
      expect(controller_trip).to(eq(json_trip))
    end
  end
  describe 'put #update' do
    it 'update specific trip and redirects to #show' do
      trip_bot = FactoryBot.create(:trip, from_id: @from.id, to_id: @to.id, user_id: @user.id)
      sign_in(@user, scope: :user)
      trip_bot.save
      put :update, params: {
        id: trip_bot.id,
        trip: {
          from_address: 'address1 #2',
          to_address: 'address2',
          available_seats: 5,
          leaving_at: DateTime.now + 3.days,
          price: 2000,
          comments: 'comments',
          car_license_plate: 'AA-5656',
          car_brand: 'Volvo',
          car_model: 'XC60',
          car_color: 'rojo',
          user_id: @user.id,
          from_id: @from.id,
          to_id: @to.id
        }
      }
      expect(response).to(redirect_to(trip_url(trip_bot)))
    end
    it 'update specific trip and redirects to #edit because attribute is missing' do
      trip_bot = FactoryBot.create(:trip, from_id: @from.id, to_id: @to.id, user_id: @user.id)
      trip_bot.save
      sign_in(@user, scope: :user)
      put :update, params: {
        id: trip_bot.id,
        trip: {
          from_address: 'address1',
          to_address: '',
          available_seats: 5,
          price: 2000,
          comments: 'comments',
          car_license_plate: 'AA-5656',
          car_brand: 'Volvo',
          car_model: 'XC60',
          car_color: 'rojo',
          user_id: @user.id,
          from_id: @from.id,
          to_id: @to.id
        }
      }
      expect(response).to(redirect_to(edit_trip_path(trip_bot.id)))
    end
    it 'updates specific trip and redirects to #edit because date is old' do
      trip_bot = FactoryBot.create(:trip, from_id: @from.id, to_id: @to.id, user_id: @user.id)
      sign_in(@user, scope: :user)
      trip_bot.save
      put :update, params: {
        id: trip_bot.id,
        trip: {
          from_address: 'address1 #2',
          to_address: 'address2',
          available_seats: 5,
          leaving_at: DateTime.now - 3.days,
          price: 2000,
          comments: 'comments',
          car_license_plate: 'AA-5656',
          car_brand: 'Volvo',
          car_model: 'XC60',
          car_color: 'rojo',
          user_id: @user.id,
          from_id: @from.id,
          to_id: @to.id
        }
      }
      expect(response).to(redirect_to(edit_trip_path(trip_bot.id)))
    end
  end
end
