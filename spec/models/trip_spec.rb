# frozen_string_literal: true

require 'rails_helper'

RSpec.describe(Trip, type: :model) do
  it 'is valid with valid attributtes' do
    from = FactoryBot.create(:place)
    to = FactoryBot.create(:place)
    user = FactoryBot.create(:user)
    trip = FactoryBot.create(:trip, from_id: from.id, to_id: to.id, user_id: user.id)
    expect(trip).to(be_valid)
  end
  context 'When invalid inputs are giving to create a trip' do
    it 'should not be valid because has no leaving_at' do
      from = FactoryBot.create(:place)
      to = FactoryBot.create(:place)
      user = FactoryBot.create(:user)
      trip = Trip.new(from_address: 'address1', to_address: 'address2', 
      available_seats: 5, price: '2000', comments: 'llevo un perrito',
      car_license_plate:'AA-5656', car_brand: 'volvo', car_model: 'XC60', 
      car_color: 'rojo', user_id: user.id, from_id: from.id, to_id: to.id )
      expect(trip).not_to be_valid
    end
  
    it 'should not be valid because leaving_at is in the past' do
      from = FactoryBot.create(:place)
      to = FactoryBot.create(:place)
      user = FactoryBot.create(:user)
      trip = Trip.new(from_address: 'address1', to_address: 'address2', 
      available_seats: 5,leaving_at:'2021-09-02T18:24:00.000Z', price: '2000', comments: 'llevo un perrito',
      car_license_plate:'AA-5656', car_brand: 'volvo', car_model: 'XC60', 
      car_color: 'rojo', user_id: user.id, from_id: from.id, to_id: to.id )
      expect(trip).not_to be_valid
    end
    
  end
  






end
