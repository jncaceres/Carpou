# frozen_string_literal: true

# {Trip} modelo responsable de almacenar la información de los viajes.
#
# @!attribute id
#   @return [Int] ID de {Trip}.
#
# @!attribute from_address
#   @return [String] Dirección de salida de {Trip}.
#
# @!attribute to_address
#   @return [String] Dirección de llegada de {Trip}.
#
# @!attribute available_seats
#   @return [Int] Asientos disponibles de {Trip}.
#
# @!attribute leaving_at
#   @return [DateTime] Momento de salida de {Trip}.
#
# @!attribute price
#   @return [Int] Precio de {Trip}.
#
# @!attribute comments
#   @return [String] Comentario de {Trip}.
#
# @!attribute car_license_plate
#   @return [String] Patente del auto de {Trip}.
#
# @!attribute car_brand
#   @return [String] Marca del auto de {Trip}.
#
# @!attribute car_model
#   @return [String] Modelo del auto de {Trip}.
#
# @!attribute car_color
#   @return [String] Color del auto de {Trip}.
#
# @!attribute user
#   @return [User] Usuario creador del {Trip}.
#
# @!attribute passenger_requests
#   @return [Array<PassengerRequest>] Solicitudes de {Trip}.
#
# @!attribute to
#   @return [Place] Lugar de llegada de {Trip}.
#
# @!attribute from
#   @return [Place] Lugar de salida de {Trip}.
#
# @!attribute users
#   @return [Array<User>] Usuarios pasajeros del {Trip}.
#
# @!attribute created_at
#   @return [DateTime] Momento en que {Trip} fue creado.
#
# @!attribute updated_at
#   @return [DateTime] Momento en que {Trip} fue editado por ultima vez.

class Trip < ApplicationRecord
  belongs_to :user
  has_many :passenger_requests
  has_many :users, through: :passenger_requests
  belongs_to :to, class_name: 'Place', foreign_key: 'to_id'
  belongs_to :from, class_name: 'Place', foreign_key: 'from_id'

  validate :check_trip_leaving_at
  validates :from_address, presence: { message: 'Ingresar dirección de origen' }
  validates :to_address, presence: { message: 'Ingresar la dirección de destino' }
  validates :available_seats, presence: { message: 'Ingresar número de asientos disponibles' }, numericality: { only_integer: true }
  validates :leaving_at, presence: { message: 'Ingresar la fecha y hora de salida' }
  validates :price, presence: { message: 'Ingresar el monto a pagar' }
  validates :car_license_plate, presence: { message: 'Ingresar la patente del auto' }
  validates :car_brand, presence: { message: 'Ingresar la marca del auto' }
  validates :car_color, presence: { message: 'Ingresar el color del auto' }
  validates :car_model, presence: { message: 'Ingresar el modelo del auto' }
  validates :from_id, presence: { message: 'Ingresar la comuna de origen' }
  validates :to_id, presence: { message: 'Ingresar la comuna de destino' }

  # retorna si es que la salida de un nuevo viaje es valida o no.
  def check_trip_leaving_at
    errors.add(:leaving_at, 'Error en la fecha del viaje') if leaving_at && (leaving_at.to_date < Date.today)
  end
end
