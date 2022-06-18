# frozen_string_literal: true

ActiveAdmin.register(Trip) do
  # See permitted parameters documentation:
  # https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
  #
  # Uncomment all parameters which should be permitted for assignment
  #
  # permit_params :from_address, :to_address, :available_seats, :leaving_at, :price,
  #               :comments, :car_license_plate, :car_brand, :car_model, :car_color, :user_id, :from_id, :to_id
  #
  # or
  #
  # permit_params do
  #   permitted = [:from_address, :to_address, :available_seats, :leaving_at, :price, :comments, :car_license_plate, :car_brand,
  #                :car_model, :car_color, :user_id, :from_id, :to_id]
  #   permitted << :other if params[:action] == 'create' && current_user.admin?
  #   permitted
  # end
end
