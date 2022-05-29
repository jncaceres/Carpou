# frozen_string_literal: true

FactoryBot.define do
  factory :passenger_request do
    comments { 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris.' }
    user { 'some-id' }
    trip { 'some-id' }
  end
end
