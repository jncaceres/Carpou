# frozen_string_literal: true

class CarpouDeviseMailer < Devise::Mailer
  layout 'mailer'

  # gives access to all helpers defined within `application_helper`.
  helper :application

  # Optional. eg. `confirmation_url`
  include Devise::Controllers::UrlHelpers

  # to make sure that your mailer uses the devise views
  default template_path: 'users/mailer'
end
