# frozen_string_literal: true

class Trip < ApplicationRecord
  belongs_to :user
  has_many :passenger_requests
  has_many :users, through: :passenger_requests
  belongs_to :to, class_name: 'Place', foreign_key: 'to_id'
  belongs_to :from, class_name: 'Place', foreign_key: 'from_id'

  validate :check_trip_leaving_at
  validates :from_address, presence: {message: 'Ingresar dirección de origen'}
  validates :to_address, presence: {message: 'Ingresar la dirección de destino'}
  validates :available_seats, presence: {message: 'Ingresar número de asientos disponibles'},numericality: { only_integer: true }
  validates :leaving_at, presence: {message: 'Ingresar la fecha y hora de salida'}
  validates :price, presence: {message:'Ingresar el monto a pagar'}
  validates :car_license_plate, presence: {message: 'Ingresar la patente del auto'}
  validates :car_brand, presence: {message: 'Ingresar la marca del auto'}
  validates :car_color, presence: {message: 'Ingresar el color del auto'}
  validates :car_model, presence: {message:'Ingresar el modelo del auto'}
  validates :from_id, presence: {message:'Ingresar la comuna de origen'}
  validates :to_id, presence: {message: 'Ingresar la comuna de destino'}

  def check_trip_leaving_at
    if leaving_at 
      errors.add(:leaving_at, 'Error en la fecha del viaje') if leaving_at.to_date < Date.today
    end
  end

 


end
