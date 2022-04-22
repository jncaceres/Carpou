json.extract! passenger_request, :id, :comments, :status, :created_at, :updated_at
json.url passenger_request_url(passenger_request, format: :json)
