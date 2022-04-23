class AdminMailer < ApplicationMailer

    def welcome_email
        @user = params[:user]
        mail(to: @user.email, subject: 'Bienvenido a Carpou, ¡empieza a viajar ahora!')
    end
  
    def request_accepted
      @passenger = params[:passenger]
      @trip = params[:trip]
      @driver = params[:driver]
      @origin_place =  params[:origin_place]
      @destination_place =  params[:destination_place]
      mail(to: @passenger.email, subject: 'Tu viaje de %{origin_place} a %{destination_place} ha sido aceptado' % {origin_place: @origin_place.name, destination_place: @destination_place.name})
    end

    def request_rejected
      @passenger = params[:passenger]
      @trip = params[:trip]
      @driver = params[:driver]
      @origin_place =  params[:origin_place]
      @destination_place =  params[:destination_place]
      mail(to: @passenger.email, subject: 'Tu viaje de %{origin_place} a %{destination_place} ha sido rechazado' % {origin_place: @origin_place.name, destination_place: @destination_place.name})
    end

end
