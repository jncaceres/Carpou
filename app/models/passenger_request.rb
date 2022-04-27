# frozen_string_literal: true

class PassengerRequest < ApplicationRecord
  belongs_to :trip
  belongs_to :user
end
