# frozen_string_literal: true

# {PassengerRequest} modelo responsable de almacenar la información de las solicitudes de viaje.
#
# @!attribute id
#   @return [Int] ID de {PassengerRequest}.
#
# @!attribute comments
#   @return [String] Comentario del {PassengerRequest}.
#
# @!attribute status
#   @return [Int] Status de {PassengerRequest}.
#
# @!attribute created_at
#   @return [DateTime] Momento en que {PassengerRequest} fue creado.
#
# @!attribute updated_at
#   @return [DateTime] Momento en que {PassengerRequest} fue editado por ultima vez.

class PassengerRequest < ApplicationRecord
  belongs_to :trip
  belongs_to :user

  enum status: {
    pending: 0,
    accepted: 1,
    rejected: 2,
    canceled: 3
  }

  # Retorna la fecha formateada de la siguiente forma d/m/Y H:M
  #
  # @return [String] Fecha formateada
  def formatted_created_at
    created_at.strftime('%d/%m/%Y %H:%M')
  end
end
