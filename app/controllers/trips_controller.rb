# frozen_string_literal: true

class TripsController < ApplicationController
  before_action :set_trip, only: %i[show edit update destroy]

  # GET /trips or /trips.json
  def index
    from_place = list_query_params[:from]
    to_place = list_query_params[:to]
    date = list_query_params[:date]
    @trips = if from_place && to_place && date
               Trip.where(from_id: from_place, to_id: to_place, leaving_at: date)
             else
               Trip.all
             end
  end

  # GET /trips/1 or /trips/1.json
  def show; end

  # GET /trips/new
  def new
    #@trip = Trip.new
    @places = Place.all
  end

  # GET /trips/1/edit
  def edit; end

  # POST /trips or /trips.json
  def create
    @trip = Trip.new(trip_params)
    if @trip.save
      redirect_to(trip_url(@trip), notice: "El viaje fue creado correctamente")
    else
      redirect_to(new_trip_path, notice: "¡Error al crear el viaje!")      
    end
  end

  # PATCH/PUT /trips/1 or /trips/1.json
  def update
    respond_to do |format|
      if @trip.update(trip_params)
        format.html { redirect_to(trip_url(@trip), notice: 'Trip was successfully updated.') }
        format.json { render(:show, status: :ok, location: @trip) }
      else
        format.html { render(:edit, status: :unprocessable_entity) }
        format.json { render(json: @trip.errors, status: :unprocessable_entity) }
      end
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

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_trip
    @trip = Trip.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def trip_params
    params.require(:trip).permit(:from_address, :to_address, :available_seats, :leaving_at, :price, :comments, :car_license_plate, :car_brand,
                                 :car_model, :car_color, :user_id, :from_id, :to_id)
  end

  def list_query_params
    params.permit(:from, :to, :date)
  end
end
