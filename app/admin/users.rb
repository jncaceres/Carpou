ActiveAdmin.register(User) do
  # See permitted parameters documentation:
  # https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
  #
  # Uncomment all parameters which should be permitted for assignment
  #
  index do
    selectable_column
    id_column
    column :name
    column :last_name
    column :rut
    column :phone
    column :gender
    column :birthdate
    column :admin
    column :email
    actions
  end
  permit_params :name, :last_name, :rut, :phone, :gender, :birthdate, :admin, :email # , :encrypted_password, :reset_password_token, :reset_password_sent_at, :remember_created_at, :confirmation_token, :confirmed_at, :confirmation_sent_at, :unconfirmed_email, :failed_attempts, :unlock_token, :locked_at
  #
  # or
  #
  # permit_params do
  #   permitted = [:name, :last_name, :rut, :phone, :gender, :birthdate, :admin, :email, :encrypted_password, :reset_password_token, :reset_password_sent_at, :remember_created_at, :confirmation_token, :confirmed_at, :confirmation_sent_at, :unconfirmed_email, :failed_attempts, :unlock_token, :locked_at]
  #   permitted << :other if params[:action] == 'create' && current_user.admin?
  #   permitted
  # end
end
