# frozen_string_literal: true

FactoryBot.define do
  factory :trip do
    from_address { 'address1' }
    to_address { 'address2' }
    available_seats { 5 }
    leaving_at { '2023-09-02T18:24:00.000Z' }
    price { '12345678' }
    comments { 'comments' }
    car_license_plate { 'AA-5656' }
    car_brand { 'Volvo' }
    car_model { 'XC60' }
    car_color { 'rojo' }
    user_id { 'some-id' }
    from_id { 'some-id' }
    to_id { 'to-id' }
  end

  trait :skip_validate do
    to_create {|instance| instance.save(validate: false)}
  end
end
