# frozen_string_literal: true

require 'csv'
require 'date'

Place.delete_all
User.delete_all
Trip.delete_all
PassengerRequest.delete_all

puts 'comunas'
CSV.foreach(Rails.root.join('lib/comunas.csv'), headers: true) do |row|
  Place.create({ name: row[1], lat: row[2], long: row[3] })
end

puts 'users'
i = 1
CSV.foreach(Rails.root.join('lib/users.csv'), headers: true, col_sep: ';') do |row|
  birthday_year = Integer(row[4].split('-')[0])
  birthday_month = Integer(row[4].split('-')[1])
  birthday_day = Integer(row[4].split('-')[2])
  rut = "#{row[1][0, row[1].length - 2]}-#{row[1][-1]}"
  User.create({
    name: row[0],
    last_name: row[2],
    rut: rut,
    phone: '19336168157',
    gender: row[13],
    birthdate: DateTime.new(birthday_year,
                            birthday_month,
                            birthday_day
                           ),
    admin: row[11],
    email: "passenger#{i}@yopmail.com",
    password: row[10],
    confirmed_at: DateTime.now
  }
             )
  i += 1
end

puts 'trips'
CSV.foreach(Rails.root.join('lib/trips.csv'), headers: true, col_sep: ';') do |row|
  leaving_at_year = Integer(row[3].split('-')[0])
  leaving_at_month = Integer(row[3].split('-')[1])
  leaving_at_day = Integer(row[3].split('-')[2])
  leaving_at_hour = Integer(row[3].split('-')[3])
  leaving_at_minute = Integer(row[3].split('-')[4])
  Trip.create({
    from_address: row[0],
    to_address: row[1],
    available_seats: row[2],
    leaving_at: DateTime.new(leaving_at_year,
                             leaving_at_month,
                             leaving_at_day,
                             leaving_at_hour,
                             leaving_at_minute,
                             0
                            ),
    price: row[4],
    comments: 'comentario',
    car_license_plate: row[5],
    car_brand: row[6],
    car_model: row[7],
    car_color: row[8],
    user_id: row[9],
    from_id: row[10],
    to_id: row[11]
  }
             )
end

puts 'passenger_requests'
CSV.foreach(Rails.root.join('lib/passenger_requests.csv'), headers: true, col_sep: ';') do |row|
  PassengerRequest.create({
    comments: row[0],
    status: Integer(row[1], 10),
    user_id: row[2],
    trip_id: row[3]
  }
                         )
end

# Happy path test data
test_driver = User.new({
  name: 'Carpou',
  last_name: 'Driver',
  rut: '11.111.111-1',
  phone: '987664421',
  gender: 'Male',
  birthdate: Date.today - 21.years,
  admin: false,
  email: 'driver@carpou.com',
  password: 'password',
  confirmed_at: Date.today - 2.days
}
                      )

test_passenger = User.new({
  name: 'Carpou',
  last_name: 'Passenger',
  rut: '22.111.111-1',
  phone: '987664421',
  gender: 'Female',
  birthdate: Date.today - 21.years,
  admin: false,
  email: 'pass@carpou.com',
  password: 'password',
  confirmed_at: Date.today - 2.days
}
                         )

test_passenger2 = User.new({
  name: 'Carpou',
  last_name: 'Passenger2222',
  rut: '22.111.111-2',
  phone: '987664421',
  gender: 'Female',
  birthdate: Date.today - 21.years,
  admin: false,
  email: 'pass2@carpou.com',
  password: 'password',
  confirmed_at: Date.today - 2.days
}
                          )

driver_trip = Trip.new({
  from_address: 'test',
  to_address: 'test',
  available_seats: '3',
  leaving_at: DateTime.now + 3.days,
  price: 1000,
  comments: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris.',
  car_license_plate: 'JJS420',
  car_brand: 'BMW',
  car_model: 'M1',
  car_color: 'negro',
  user: test_driver,
  from_id: 295,
  to_id: 100
}
                      )

pr1 = PassengerRequest.new({
  comments: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris.',
  user: test_passenger,
  trip: driver_trip
}
                          )

pr2 = PassengerRequest.new({
  comments: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris.',
  user: test_passenger2,
  trip: driver_trip
}
                          )

print "Test driver created successfully.\n" if test_driver.save
print "Test passenger created successfully.\n" if test_passenger.save
print "Test passenger 2 created successfully.\n" if test_passenger2.save
print "Driver Trip created successfully.\n" if driver_trip.save
print "PR1 creado correctamente \n" if pr1.save
print "PR2 creado correctamente \n" if pr2.save
print 'Done'
AdminUser.create!(email: 'admin@example.com', password: 'password', password_confirmation: 'password') if Rails.env.development?
