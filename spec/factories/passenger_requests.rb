# frozen_string_literal: true

FactoryBot.define do
  factory :passenger_request do
    comments { 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris.' }
    user_id { 'some-id' }
    trip_id { 'some-id' }
    status {'some-status'}
  end
end
