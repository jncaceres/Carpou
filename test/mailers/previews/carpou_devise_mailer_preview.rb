# frozen_string_literal: true

class CarpouDeviseMailerPreview < ActionMailer::Preview
  def confirmation_instructions
    passenger = User.new
    passenger.name = 'Fake User'
    passenger.email = 'fake@fake.com'
    CarpouDeviseMailer.confirmation_instructions(passenger, 'faketoken', {})
  end

  def reset_password_instructions
    passenger = User.new
    passenger.name = 'Fake User'
    passenger.email = 'fake@fake.com'
    CarpouDeviseMailer.reset_password_instructions(passenger, 'faketoken', {})
  end

  def unlock_instructions
    passenger = User.new
    passenger.name = 'Fake User'
    passenger.email = 'fake@fake.com'
    CarpouDeviseMailer.unlock_instructions(passenger, 'faketoken', {})
  end
end
