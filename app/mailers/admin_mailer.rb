# frozen_string_literal: true

class AdminMailer < ApplicationMailer
  def welcome_email
    @user = params[:user]
    mail(to: @user.email, subject: 'Bienvenido a Carpou, ¡empieza a viajar ahora!')
  end

  def request_accepted
    @passenger = params[:passenger]
    @trip = params[:trip]
    @driver = params[:driver]
    @origin_place = params[:origin_place]
    @destination_place = params[:destination_place]
    mail(to: @passenger.email,
         subject: format('Tu viaje de %<origin_place>s a %<destination_place>s ha sido aceptado', origin_place: @origin_place.name,
                                                                                                  destination_place: @destination_place.name
         )
        )
  end

  def request_rejected
    @passenger = params[:passenger]
    @trip = params[:trip]
    @driver = params[:driver]
    @origin_place = params[:origin_place]
    @destination_place = params[:destination_place]
    mail(to: @passenger.email,
         subject: format('Tu viaje de %<origin_place>s a %<destination_place>s ha sido rechazado', origin_place: @origin_place.name,
                                                                                                   destination_place: @destination_place.name
         )
        )
  end

  def request_canceled
    @passenger = params[:passenger]
    @trip = params[:trip]
    @driver = params[:driver]
    @origin_place = params[:origin_place]
    @destination_place = params[:destination_place]
    mail(to: @driver.email,
         subject: format('Alguien canceló su asistencia en tu viaje de %<origin_place>s a %<destination_place>',
                         origin_place: @origin_place.name,
                         destination_place: @destination_place.name
                        )
        )
  end

  def trip_canceled
        @passenger = params[:passenger]
        @trip = params[:trip]
        @driver = params[:driver]
        @origin_place = params[:origin_place]
        @destination_place = params[:destination_place]
        mail(to: @passenger.email,
             subject: format('El viaje de %<origin_place>s a %<destination_place>s ha sido cancelado', origin_place: @origin_place.name,
                                                                                                       destination_place: @destination_place.name
             )
            )
      end
end
