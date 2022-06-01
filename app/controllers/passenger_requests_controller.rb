# frozen_string_literal: true

# Controlador de PassengerRequests
class PassengerRequestsController < ApplicationController
  before_action :set_passenger_request, only: %i[show edit update destroy]

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
    @passenger_request = PassengerRequest.new
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
    @passenger_request = PassengerRequest.new(passenger_request_params)

    respond_to do |format|
      if @passenger_request.save
        format.html { redirect_to(passenger_request_url(@passenger_request), notice: 'Passenger request was successfully created.') }
        format.json { render(:show, status: :created, location: @passenger_request) }
      else
        format.html { render(:new, status: :unprocessable_entity) }
        format.json { render(json: @passenger_request.errors, status: :unprocessable_entity) }
      end
    end
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

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_passenger_request
    @passenger_request = PassengerRequest.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def passenger_request_params
    params.require(:passenger_request).permit(:comments, :status)
  end
end
