# frozen_string_literal: true

ActiveAdmin.register(PassengerRequest) do
  # See permitted parameters documentation:
  # https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
  #
  # Uncomment all parameters which should be permitted for assignment
  #
  permit_params :comments, :status, :user_id, :trip_id
  #
  # or
  #
  # permit_params do
  #   permitted = [:comments, :status, :user_id, :trip_id]
  #   permitted << :other if params[:action] == 'create' && current_user.admin?
  #   permitted
  # end

  sidebar 'Asociaciones', only: %i[show edit] do
    ul do
      li link_to('Usuario', admin_user_path(resource.user))
      li link_to('Viaje', admin_trip_path(resource.trip))
    end
  end

  form title: 'Editar Passenger Request' do |f|
    inputs do
      li "ID: #{f.object.id}" unless f.object.new_record?
      input :user_id, as: :select, collection: User.all.map { |u| ["#{u.name} #{u.last_name} #{u.email}", u.id] }, include_blank: false
      input :trip_id, as: :select, collection: Trip.eager_load(:from, :to, :user).all.map { |t|
                                                 ["#{t.from.name}/#{t.to.name} de #{t.user.email}", t.id]
                                               }, include_blank: false
      input :status, include_blank: false
      input :comments
      li "Created at #{f.object.created_at}" unless f.object.new_record?
    end
    para 'Press cancel to return to the list without saving.'
    actions
  end
end
