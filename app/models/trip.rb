class Trip < ApplicationRecord
    belongs_to :user
    has_many :passenger_requests
    has_many :users, through: :passenger_requests
end
