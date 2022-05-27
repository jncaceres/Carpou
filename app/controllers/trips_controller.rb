# frozen_string_literal: true

class TripsController < ApplicationController
  before_action :set_trip, only: %i[show edit update destroy]
  before_action :authenticate_user!, only: %i[new create trips_from_user]

  # GET /trips or /trips.json
  def index
    from_place = list_query_params[:from]
    to_place = list_query_params[:to]
    date = list_query_params[:date]
    filtered_trips = []
    if from_place && to_place && date
      obtained_trips = Trip.where(from_id: from_place, to_id: to_place)
      obtained_trips.each do |trip|
        filtered_trips.push(trip) if trip.leaving_at.to_date == Date.parse(date)
      end
    else
      obtained_trips = Trip.all
      obtained_trips.each do |trip|
        filtered_trips.push(trip) if trip.leaving_at.to_date >= Date.today
      end
    end
    @trips = filtered_trips.as_json(include: %i[user to from])
  end

  # GET /trips/1 or /trips/1.json
  def show
    @trip = @trip.as_json(include: %i[user to from])
  end

  # GET /trips/new
  def new
    @places = Place.all
  end

  # GET /trips/1/edit
  def edit
    @trip = Trip.find(params[:id])
    @places = Place.all
  end

  # POST /trips or /trips.json
  def create
    @trip = current_user.trips.create(trip_params)
    if @trip.save
      redirect_to(trip_url(@trip), notice: 'El viaje fue creado correctamente')
    else
      redirect_to(new_trip_path, notice: '¡Error al crear el viaje!')
    end
  end

  # PATCH/PUT /trips/1 or /trips/1.json
  def update
    @trip = Trip.find(params[:id])
    if @trip.update(trip_params)
      redirect_to(trip_url(@trip), notice: 'El viaje fue editado correctamente')
    else
      redirect_to(edit_trip_path(@trip.id), notice: '¡Error al editar el viaje!')
    end
  end

  # DELETE /trips/1 or /trips/1.json
  def destroy
    @trip.destroy

    respond_to do |format|
      format.html { redirect_to(trips_url, notice: 'Trip was successfully destroyed.') }
      format.json { head(:no_content) }
    end
  end

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
    @trip = Trip.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def trip_params
    params.permit(:from_address, :to_address, :available_seats, :leaving_at, :price, :comments, :car_license_plate, :car_brand,
                  :car_model, :car_color, :user_id, :from_id, :to_id
    )
  end

  def list_query_params
    params.permit(:from, :to, :date)
  end
end
