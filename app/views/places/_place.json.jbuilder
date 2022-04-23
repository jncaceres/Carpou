# frozen_string_literal: true

json.extract!(place, :id, :name, :lat, :long, :created_at, :updated_at)
json.url(place_url(place, format: :json))
