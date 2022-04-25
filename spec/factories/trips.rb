# frozen_string_literal: true

FactoryBot.define do
    factory :trip do
        from_address { 'Some Address' }
        to_address { 'Some other Address' }
        available_seats { 4 }
        leaving_at { new Date }
        price { 5000 }
        comments { 'Some comment' }
        car_licence_plate { 'AAAA00' }
        car_brand { 'Brand' }
        car_model { 'Model' }
        car_color { 'Color' }
    end
  end
  