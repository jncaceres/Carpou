# frozen_string_literal: true

ActiveAdmin.register_page('Dashboard') do
  menu priority: 1, label: proc { I18n.t('active_admin.dashboard') }

  content title: proc { I18n.t('active_admin.dashboard') } do
    div class: 'blank_slate_container', id: 'dashboard_default_message' do
      span class: 'blank_slate' do
        span "Bienvenid@!"
        # small I18n.t('active_admin.dashboard_welcome.call_to_action')
      end
    end

    # Here is an example of a simple dashboard with columns and panels.
    #
    columns do
      column do
        panel 'Viajes creados recientemente' do
          ul do
            Trip.last(15).map do |trip|
              li link_to("#{trip.from.name} a #{trip.to.name} por #{trip.user.email}", admin_trip_path(trip))
            end
          end
        end
      end

      column do
        panel 'Solicitudes de viaje recientes' do
          ul do
            PassengerRequest.last(15).map do |pr|
              li link_to("#{pr.user.email} solicita viaje de #{pr.trip.from.name} a #{pr.trip.to.name} por #{pr.trip.user.email}", admin_passenger_request_path(pr))
            end
          end
        end
      end
    end
  end
end
