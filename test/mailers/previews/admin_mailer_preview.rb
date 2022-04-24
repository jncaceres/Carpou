# frozen_string_literal: true

# Preview all emails at http://localhost:3000/rails/mailers/admin_mailer
class AdminMailerPreview < ActionMailer::Preview
  def welcome_email
    passenger = User.new
    passenger.name = 'Fake User'
    passenger.email = 'fake@fake.com'
    AdminMailer.with(user: passenger).welcome_email
  end

  def request_accepted
    passenger = User.new
    passenger.name = 'Fake User'
    passenger.email = 'fake@fake.com'
    trip = OpenStruct.new({ leaving_at: 'REVISAR FORMATO', from_address: 'La Esquina', price: 10_000 })
    driver = User.new
    driver.name = 'Fake Drive'
    driver.email = 'fake@fake.com'
    origin_place = OpenStruct.new({ name: 'Mi Casa' })
    destination_place = OpenStruct.new({ name: 'Tu Casa' })
    AdminMailer.with({
      passenger: passenger,
      trip: trip,
      driver: driver,
      origin_place: origin_place,
      destination_place: destination_place
    }
                    ).request_accepted
  end

  def request_rejected
    passenger = User.new
    passenger.name = 'Fake User'
    passenger.email = 'fake@fake.com'
    trip = OpenStruct.new({ leaving_at: 'REVISAR FORMATO', from_address: 'La Esquina', price: 10_000 })
    driver = User.new
    driver.name = 'Fake Drive'
    driver.email = 'fake@fake.com'
    origin_place = OpenStruct.new({ name: 'Mi Casa' })
    destination_place = OpenStruct.new({ name: 'Tu Casa' })
    AdminMailer.with({
      passenger: passenger,
      trip: trip,
      driver: driver,
      origin_place: origin_place,
      destination_place: destination_place
    }
                    ).request_rejected
  end
end
