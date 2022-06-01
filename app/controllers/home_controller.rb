# frozen_string_literal: true

class HomeController < ApplicationController
  # Obtiene todos los lugares (Places) para viajar.
  #
  # @return [Array<Place>]
  def index
    @places = Place.all
  end
end
