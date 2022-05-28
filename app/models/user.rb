# frozen_string_literal: true

class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable,
         :confirmable, :lockable

  has_many :trips
  has_many :passenger_requests
  has_many :trips, through: :passenger_requests

  def age
    today = Date.today
    out = today.year - birthdate
          .year
    out -= 1 if
         birthdate.month >  today.month or
           (birthdate.month >= today.month and birthdate.day > today.day)

    out
  end

end
