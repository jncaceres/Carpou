# frozen_string_literal: true

class ApplicationController < ActionController::Base
  before_action :configure_permitted_parameters, if: :devise_controller?

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: %i[name last_name email])
    # devise_parameter_sanitizer.permit(:account_update, keys: %i[username password name phone_number description
    #                                                            email current_password password_confirmation])
  end
end
