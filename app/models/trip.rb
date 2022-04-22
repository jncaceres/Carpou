# frozen_string_literal: true

class Trip < ApplicationRecord
  belongs_to :user
  has_many :passenger_requests
  has_many :users, through: :passenger_requests
  belongs_to :to, class_name: 'Place', foreign_key: 'to_id'
  belongs_to :from, class_name: 'Place', foreign_key: 'from_id'
end
