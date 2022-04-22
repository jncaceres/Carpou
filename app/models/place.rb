# frozen_string_literal: true

class Place < ApplicationRecord
  has_many :trips_to, class_name: 'Trip', foreign_key: 'to_id'
  has_many :trips_from, class_name: 'Trip', foreign_key: 'from_id'
end
