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

    # Look if the trip exists an thren if the trip is created by the same user that
    # requests to join
    trip = Trip.find_by(id: trip_id)
    # if it doesnt exists
    if trip.nil?
      redirect_to(root_path, alert: 'Un error inesperado ocurrió, el viaje al que solicitaste unirte no existe')
      return
    # if exists and is created by the same user that requests to join
    elsif trip.user_id == current_user.id
      redirect_to(root_path, alert: 'No puedes unirte a tu propio viaje')
      return
    end

    previous_request = PassengerRequest.where(trip_id: trip_id)
    # Look if the user has already requested to join
    already_requested = previous_request.find_by(user_id: current_user.id)
    unless already_requested.nil?
      redirect_to(root_path, alert: 'Ya has solicitado unirte a este viaje')
      return
    end

    # Look if the trip has already accepted the limit amount of passengers
    requests_accepted = PassengerRequest.where(trip_id: trip_id, status: 'accepted')
    # if there are available seats, create the request
    if requests_accepted.length < trip.available_seats
      PassengerRequest.create(comments: comment, trip_id: trip_id, status: 'pending', user_id: current_user.id)
      redirect_to(root_path, alert: 'Solicitud creada con éxito')
    # if not
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
    # can't cancel a request that doesn't belongs to you
    if @passenger_request.user_id != current_user.id
      redirect_to(passenger_requests_from_user_path(id: current_user.id), alert: 'No puedes cancelar una solicitud que no es tuya')
      return
    end

    # if the request was accepted, notify the driver
    if @passenger_request.status == 'accepted'
      AdminMailer.with({
        passenger: @passenger_request.user,
        trip: @passenger_request.trip,
        driver: @passenger_request.trip.user,
        origin_place: @passenger_request.trip.from,
        destination_place: @passenger_request.trip.to
      }).request_canceled.deliver_now
    end

    @passenger_request.destroy

    redirect_to(passenger_requests_from_user_path(id: current_user.id), alert: 'Se ha cancelado la solicitud con éxito')
    nil
  end

  def passenger_requests_from_user
    user_id = params[:id]
    if Integer(user_id, 10) != current_user.id
      redirect_to(root_path)
    else
      users_passenger_requests = PassengerRequest.where(user_id: user_id)
      @users_passenger_requests = users_passenger_requests.as_json(methods: %i[formatted_created_at], include: %i[user trip])
    end
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_passenger_request
    @passenger_request = PassengerRequest.where(id: params[:id])
    if @passenger_request.length.zero?
      redirect_to(passenger_requests_from_user_path(id: current_user.id), alert: 'No existe la solicitud pedida')
    else
      @passenger_request = @passenger_request.first
    end
  end

  # Only allow a list of trusted parameters through.
  def passenger_request_params
    params.require(:passenger_request).permit(:comments, :trip_id)
  end
end
