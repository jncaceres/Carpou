# frozen_string_literal: true

class PassengerRequestsController < ApplicationController
  before_action :set_passenger_request, only: %i[show edit update destroy]
  before_action :authenticate_user!, only: [:new, :create]

  # GET /passenger_requests or /passenger_requests.json
  def index
    @passenger_requests = PassengerRequest.all
  end

  # GET /passenger_requests/1 or /passenger_requests/1.json
  def show; end

  # GET /passenger_requests/new
  def new
    trip_id = Integer(params[:trip_id], 10)
    @trip = Trip.where(id: trip_id)
    @trip = @trip.as_json(include: %i[user to from])
  end

  # GET /passenger_requests/1/edit
  def edit; end

  # POST /passenger_requests or /passenger_requests.json
  def create
    comment = passenger_request_params["comments"]
    trip_id = passenger_request_params["trip_id"]
    trip = Trip.find_by(id: trip_id)
    if trip.nil?
      redirect_to root_path, alert: "Un error inesperado ocurrió, el viaje al que solicitaste unirte no existe"
      return
    elsif trip.user_id == current_user.id
      redirect_to root_path, alert: "No puedes unirte a tu propio viaje"
      return
    end

    previous_request = PassengerRequest.where(trip_id: trip_id)
    already_requested = previous_request.find_by(user_id: current_user.id)
    if already_requested != nil
      redirect_to root_path, alert: "Ya has solicitado unirte a este viaje"
      return
    elsif previous_request.length < trip.available_seats
      PassengerRequest.create(comments: comment, trip_id: trip_id, status: 0, user_id: current_user.id)
      redirect_to root_path, alert: "Viaje creado con éxito"
      return
    else
      redirect_to root_path, alert: "No quedan asientos disponibles :C"
      return
    end
    
    
  end

  # PATCH/PUT /passenger_requests/1 or /passenger_requests/1.json
  def update
    if @passenger_request.trip.user == current_user
      @passenger_request.assign_attributes(status: params[:status])
    elsif @passenger_request.user == current_user
      @passenger_request.assign_attributes(comment: params[:comments])
    end
    respond_to do |format|
      if @passenger_request.save
        format.html { redirect_to(passenger_request_url(@passenger_request), notice: 'Passenger request was successfully updated.') }
        format.json { render(:show, status: :ok, location: @passenger_request) }
      else
        format.html { render(:edit, status: :unprocessable_entity) }
        format.json { render(json: @passenger_request.errors, status: :unprocessable_entity) }
      end
    end
  end

  def driver_update
    return unless @passenger_request.trip.user == current_user

    respond_to do |format|
      if @passenger_request.update(passenger_request_params)
        format.html { redirect_to(passenger_request_url(@passenger_request), notice: 'Passenger request was successfully updated.') }
        format.json { render(:show, status: :ok, location: @passenger_request) }
      else
        format.html { render(:edit, status: :unprocessable_entity) }
        format.json { render(json: @passenger_request.errors, status: :unprocessable_entity) }
      end
    end
  end

  # DELETE /passenger_requests/1 or /passenger_requests/1.json
  def destroy
    @passenger_request.destroy

    respond_to do |format|
      format.html { redirect_to(passenger_requests_url, notice: 'Passenger request was successfully destroyed.') }
      format.json { head(:no_content) }
    end
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_passenger_request
    @passenger_request = PassengerRequest.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def passenger_request_params
    params.require(:passenger_request).permit(:comments, :trip_id)
  end
end
