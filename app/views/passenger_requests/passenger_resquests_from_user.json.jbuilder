# frozen_string_literal: true

json.array!(@users_passenger_requests, partial: 'passenger_requests/passenger_request', as: :users_passenger_request)
json.array!(@users_from_trips, partial: 'passenger_requests/passenger_request', as: :users_from_trips)
