# frozen_string_literal: true

json.array!(@passenger_requests, partial: 'passenger_requests/passenger_request', as: :passenger_request)
