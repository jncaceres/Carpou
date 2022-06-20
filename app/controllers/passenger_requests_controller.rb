# frozen_string_literal: true

# Controlador de PassengerRequests
class PassengerRequestsController < ApplicationController
  before_action :set_passenger_request, only: %i[show edit update destroy]
  before_action :authenticate_user!, only: %i[new create]

  # GET /passenger_requests or /passenger_requests.json
  # Obtiene todos los PassengerRequests
  #
  # @return [Array<PassengerRequest>]
  def index
    @passenger_requests = PassengerRequest.all
  end

  # GET /passenger_requests/:id or /passenger_requests/:id.json
  # Obtiene un PassengerRequest
  #
  # @param id [Int]
  # @return [PassengerRequest]
  def show; end

  # GET /passenger_requests/new
  # Inicializa un PassengerRequest
  #
  # @return [PassengerRequest]
  def new
    trip_id = Integer(params[:trip_id], 10)
    @trip = Trip.where(id: trip_id)
    @trip = @trip.as_json(include: %i[user to from])
  end

  # GET /passenger_requests/:id/edit
  # Obtiene un PassengerRequest para editar
  #
  # @param id [Int]
  # @return [PassengerRequest]
  def edit; end

  # POST /passenger_requests or /passenger_requests.json
  # Creación de un PassengerRequest
  #
  # @param comments [String]
  #
  # @return [PassengerRequest]
  def create
    comment = passenger_request_params['comments']
    trip_id = passenger_request_params['trip_id']
    trip = Trip.find_by(id: trip_id)
    if trip.nil?
      redirect_to(root_path, alert: 'Un error inesperado ocurrió, el viaje al que solicitaste unirte no existe')
      return
    elsif trip.user_id == current_user.id
      redirect_to(root_path, alert: 'No puedes unirte a tu propio viaje')
      return
    end

    previous_request = PassengerRequest.where(trip_id: trip_id)
    already_requested = previous_request.find_by(user_id: current_user.id)
    if !already_requested.nil?
      redirect_to(root_path, alert: 'Ya has solicitado unirte a este viaje')
    elsif previous_request.length < trip.available_seats
      PassengerRequest.create(comments: comment, trip_id: trip_id, status: 0, user_id: current_user.id)
      redirect_to(root_path, alert: 'Viaje creado con éxito')
    else
      redirect_to(root_path, alert: 'No quedan asientos disponibles :C')
    end
    nil
  end

  # PATCH/PUT /passenger_requests/:id or /passenger_requests/:id.json
  # Update de un PassengerRequest
  #
  # @param id [Int]
  #
  # @param comments [String]
  #
  # @param status [Int]
  #
  # @return [PassengerRequest]
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

  # DELETE /passenger_requests/:id or /passenger_requests/:id.json
  # Eliminar un PassengerRequest
  #
  # @param id [Int]
  def destroy
    @passenger_request.destroy

    respond_to do |format|
      format.html { redirect_to(passenger_requests_url, notice: 'Passenger request was successfully destroyed.') }
      format.json { head(:no_content) }
    end
  end

  def passenger_requests_from_user
    user_id = params[:id]
    if Integer(user_id, 10) != current_user.id
      redirect_to(root_path)
    else
      users_from_trips = []
      users_passenger_requests = PassengerRequest.where(user_id: user_id)
      users_passenger_requests.each do |users_passenger_request|
        user_from_trip_id = users_passenger_request.trip.user_id
        user_from_trip = User.where(id: user_from_trip_id)
        users_from_trips << user_from_trip[0]
      end
      @users_passenger_requests = users_passenger_requests.as_json(methods: %i[formatted_created_at], include: %i[user trip])
      @users_from_trips = users_from_trips.as_json
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
