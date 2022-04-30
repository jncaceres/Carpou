# frozen_string_literal: true

require 'csv'
require 'date'

puts 'comunas'
CSV.foreach(Rails.root.join('lib/comunas.csv'), headers: true) do |row|
  Place.create({ name: row[1], lat: row[2], long: row[3] })
end

puts 'users'
CSV.foreach(Rails.root.join('lib/users.csv'), headers: true, col_sep: ';') do |row|
  birthday_year = Integer(row[4].split('-')[0])
  birthday_month = Integer(row[4].split('-')[1])
  birthday_day = Integer(row[4].split('-')[2])
  User.create({
    name: row[0],
    last_name: row[2],
    rut: row[1],
    phone: row[7].gsub('-', ''),
    gender: row[13],
    birthdate: DateTime.new(birthday_year,
                            birthday_month,
                            birthday_day
                           ),
    admin: row[11],
    email: row[9],
    password: row[10],
    confirmed_at: DateTime.now
  }
             )
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
    status: row[1],
    user_id: row[2],
    trip_id: row[3]
  }
                         )
end
