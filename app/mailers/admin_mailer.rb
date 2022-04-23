class AdminMailer < ApplicationMailer

    def welcome_email
        @user = params[:user]
        mail(to: @user.email, subject: 'Bienvenido a Carpou, ¡empieza a viajar ahora!')
      end

end
