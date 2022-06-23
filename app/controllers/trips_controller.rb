# frozen_string_literal: true

require 'json'

# Controlador de Trips
class TripsController < ApplicationController
  before_action :set_trip, only: %i[show edit update destroy]
  before_action :authenticate_user!, only: %i[new create trips_from_user destroy]

  # GET /trips or /trips.json
  # Obtener una lista de trips que cumplen con ciertos parametros
  #
  # @param from [Int]
  #
  # @param to [Int]
  #
  # @param date [DateTime]
  #
  # @return [Array<Trip>]
  def index
    from_place = list_query_params[:from]
    to_place = list_query_params[:to]
    date = list_query_params[:date]
    filtered_trips = []
    if from_place && to_place && date
      checked = JSON.parse(list_query_params[:checked])
      obtained_trips = Trip.where(from_id: from_place, to_id: to_place)
      obtained_trips.each do |trip|
        filtered_trips.push(trip) if trip.should_show_trip(checked, date)
      end
    else
      obtained_trips = Trip.all
      obtained_trips.each do |trip|
        filtered_trips.push(trip) if trip.leaving_at.to_date >= Date.today
      end
    end
    @trips = filtered_trips.as_json(include: %i[user to from])
  end

  # GET /trips/:id or /trips/:id.json
  # Obtener un Trip
  #
  # @param id [Int]
  #
  # @return [Array<PassengerRequest>, Trip]
  def show
    @passenger_requests = if @trip.user == current_user
                            @trip.passenger_requests.as_json(methods: %i[formatted_created_at], include: {
                              user: {
                                only: %i[
                                  name last_name phone email
                                  gender
                                ],
                                methods: %i[age]
                              }
                            }
                            )
                          else
                            []
                          end
    @trip = @trip.as_json(include: %i[user to from])
  end

  # GET /trips/new
  # Inicializar un nuevo Trip
  #
  # @return [Array<Place>]
  def new
    @places = Place.all
  end

  # GET /trips/:id/edit
  # Obtiene un Trip para editar
  #
  # @param id [Int]
  #
  # @return [Array<Place>, Trip]
  def edit
    @trip = @trip.as_json(include: %i[user to from])

    @places = Place.all
  end

  # POST /trips or /trips.json
  # Crear un Trip
  #
  # @param from_address [String]
  #
  # @param to_address [String]
  #
  # @param available_seats [Int]
  #
  # @param leaving_at [DateTime]
  #
  # @param price [Int]
  #
  # @param comments [String]
  #
  # @param car_license_plate [String]
  #
  # @param car_brand [String]
  #
  # @param car_model [String]
  #
  # @param car_color [String]
  #
  # @param user_id [Int]
  #
  # @param from_id [Int]
  #
  # @param to_id [Int]
  #
  # @return [Trip]
  def create
    @trip = Trip.create(trip_params)
    if @trip.save
      redirect_to(trip_url(@trip), notice: 'El viaje fue creado correctamente')
    else
      redirect_to(new_trip_path, notice: '¡Error al crear el viaje!')
    end
  end

  # PATCH/PUT /trips/:id or /trips/:id.json
  # Editar un Trip
  #
  # @param id [Int]
  #
  # @param from_address [String]
  #
  # @param to_address [String]
  #
  # @param available_seats [Int]
  #
  # @param leaving_at [DateTime]
  #
  # @param price [Int]
  #
  # @param comments [String]
  #
  # @param car_license_plate [String]
  #
  # @param car_brand [String]
  #
  # @param car_model [String]
  #
  # @param car_color [String]
  #
  # @param user_id [Int]
  #
  # @param from_id [Int]
  #
  # @param to_id [Int]
  #
  # @return [Trip]
  def update
    @trip = Trip.find(params[:id])
    if @trip.user_id == current_user.id
      if @trip.update(trip_params)
        redirect_to(trip_url(@trip), notice: 'El viaje fue editado correctamente', status: :see_other)
      else
        redirect_to(edit_trip_path(@trip.id), notice: '¡Error al editar el viaje!', status: :see_other)
      end
    else
      redirect_to(edit_trip_path(@trip.id), notice: '¡No tienes los permisos para editar este viaje!', status: :see_other)
    end
  end

  # DELETE /trips/:id or /trips/:id.json
  # Eliminar un Trip
  #
  # @param id [Int]
  def destroy
    if @trip.user_id != current_user.id
      redirect_to(trips_from_user_path(id: current_user.id), alert: 'No puedes cancelar un viaje que no es tuyo', status: :see_other)
      return
    end

    @trip.destroy
    redirect_to(trips_from_user_path(id: current_user.id), status: :see_other)
    nil
  end

  # GET /users/:id/trips
  # Obtener trips de un User
  #
  # @param id [Int]
  #
  # @return [Array<Trip>]
  def trips_from_user
    user_id = params[:id]
    if Integer(user_id, 10) != current_user.id
      redirect_to(root_path)
    else
      today_trips = []
      future_trips = []
      previous_trips = []
      obtained_trips = Trip.where(user_id: user_id)
      obtained_trips.each do |trip|
        if trip.leaving_at.to_date >= Date.today
          future_trips.push(trip)
        elsif trip.leaving_at.to_date == Date.today
          today_trips.push(trip)
        else
          previous_trips.push(trip)
        end
      end
      @today_trips = today_trips.as_json(include: %i[user to from])
      @future_trips = future_trips.as_json(include: %i[user to from])
      @previous_trips = previous_trips.as_json(include: %i[user to from])
    end
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_trip
    @trip = Trip.find_by(id: params[:id])
    redirect_to(root_path, alert: 'No existe el viaje pedido') if @trip.nil?
  end

  # Only allow a list of trusted parameters through.
  def trip_params
    params.require(:trip).permit(:from_address, :to_address, :available_seats, :leaving_at, :price, :comments, :car_license_plate, :car_brand,
                                 :car_model, :car_color, :user_id, :from_id, :to_id
    )
  end

  def list_query_params
    params.permit(:from, :to, :date, :checked)
  end
end
