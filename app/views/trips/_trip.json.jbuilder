json.extract! trip, :id, :from_address, :to_address, :available_seats, :leaving_at, :price, :comments, :car_license_plate, :car_brand, :car_model, :car_color, :created_at, :updated_at
json.url trip_url(trip, format: :json)
