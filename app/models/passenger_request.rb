# frozen_string_literal: true

class PassengerRequest < ApplicationRecord
  belongs_to :trip
  belongs_to :user

  enum status: {
    pending: 0,
    accepted: 1,
    rejected: 2,
    canceled: 3
  }

  def formatted_created_at
    created_at.strftime('%d/%m/%Y %H:%M')
  end
end
