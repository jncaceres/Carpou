# frozen_string_literal: true

# {User} modelo responsable de almacenar la información de los usuarios.
#
# @!attribute id
#   @return [Int] ID de {User}.
#
# @!attribute name
#   @return [String] Nombre de {User}.
#
# @!attribute last_name
#   @return [String] Apellido de {User}.
#
# @!attribute rut
#   @return [String] Rut de {User}.
#
# @!attribute phone
#   @return [String] Número de {User}.
#
# @!attribute gender
#   @return [String] Genero de {User}.
#
# @!attribute birthdate
#   @return [DateTime] Fecha de nacimiento de {User}.
#
# @!attribute admin
#   @return [Boolean] Estado de {User}.
#
# @!attribute email
#   @return [String] Email de {User}.
#
# @!attribute trips
#   @return [Array<Trip>] Viajes de {User}.
#
# @!attribute trips
#   @return [Array<PassengerRequest>] Solicitudes de {User}.
#
# @!attribute created_at
#   @return [DateTime] Momento en que {User} fue creado.
#
# @!attribute updated_at
#   @return [DateTime] Momento en que {User} fue editado por ultima vez.
class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable,
         :confirmable, :lockable

  has_many :trips, dependent: :destroy
  has_many :passenger_requests, dependent: :destroy
  has_many :trips, through: :passenger_requests

  validates :rut, format: { with: /[0-9]+[-|‐]{1}[0-9kK]{1}/ }
  validates :phone, format: { with: /(\+?56)?(\s?)(0?9)(\s?)[9876543]\d{7}/ }
  validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }
  validate :must_be_adult

  # Se obtiene la edad del usuario
  #
  # @return [Int] Edad del usuario
  def age
    today = Date.today
    out = today.year - birthdate
          .year
    out -= 1 if
         birthdate.month >  today.month ||
           (birthdate.month >= today.month && birthdate.day > today.day)

    out
  end

  def must_be_adult
    errors.add(:birthdate, 'No puede ser menor a 18 años') if age < 18
  end
end
