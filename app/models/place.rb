# frozen_string_literal: true

# {Place} modelo responsable de almacenar la información de diferentes comunas.
#
# @!attribute id
#   @return [Int] ID de {Place}.
#
# @!attribute name
#   @return [String] Nombre de {Place}.
#
# @!attribute lat
#   @return [Float] latitud de {Place}.
#
# @!attribute long
#   @return [Float] Longitud de {Place}.
#
# @!attribute created_at
#   @return [DateTime] Momento en que {Place} fue creado.
#
# @!attribute updated_at
#   @return [DateTime] Momento en que {Place} fue editado por ultima vez.
class Place < ApplicationRecord
  has_many :trips_to, class_name: 'Trip', foreign_key: 'to_id'
  has_many :trips_from, class_name: 'Trip', foreign_key: 'from_id'
end
