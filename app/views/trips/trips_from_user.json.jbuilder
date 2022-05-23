# frozen_string_literal: true

json.array!(@today_trips, partial: 'trips/trip', as: :today_trip)
json.array!(@future_trips, partial: 'trips/trip', as: :future_trip)
json.array!(@previous_trips, partial: 'trips/trip', as: :previous_trip)
