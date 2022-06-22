# frozen_string_literal: true

ActiveAdmin.register(Trip) do
  # See permitted parameters documentation:
  # https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
  #
  # Uncomment all parameters which should be permitted for assignment
  #
  permit_params :from_address, :to_address, :available_seats, :leaving_at, :price,
                :comments, :car_license_plate, :car_brand, :car_model, :car_color, :user_id, :from_id, :to_id
  #
  # or
  #
  # permit_params do
  #   permitted = [:from_address, :to_address, :available_seats, :leaving_at, :price, :comments, :car_license_plate, :car_brand,
  #                :car_model, :car_color, :user_id, :from_id, :to_id]
  #   permitted << :other if params[:action] == 'create' && current_user.admin?
  #   permitted
  # end

  sidebar 'Asociaciones', only: %i[show edit] do
    ul do
      li link_to('Usuario', admin_user_path(resource.user))
      li link_to('Origen', admin_trip_path(resource.from))
      li link_to('Destino', admin_trip_path(resource.to))
    end
  end

  form title: 'Editar Viaje' do |f|
    inputs do
      li "ID: #{f.object.id}" unless f.object.new_record?
      input :user_id, as: :select, collection: User.all.map { |u| ["#{u.name} #{u.last_name} #{u.email}", u.id] }, include_blank: false
      input :from_id, as: :select, collection: Place.all.map { |p|
                                                 [p.name, p.id]
                                               }, include_blank: false
      input :from_address
      input :to_id, as: :select, collection: Place.all.map { |p|
                                               [p.name, p.id]
                                             }, include_blank: false
      input :to_address
      input :available_seats
      input :leaving_at
      input :price
      input :comments
      input :car_license_plate
      input :car_brand
      input :car_model
      input :car_color, as: :string
      li "Created at #{f.object.created_at}" unless f.object.new_record?
    end
    para 'Press cancel to return to the list without saving.'
    actions
  end
end
