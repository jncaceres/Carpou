# frozen_string_literal: true

FactoryBot.define do
  factory :user do
    name { 'Some Name' }
    last_name { 'Some LastName' }
    email { 'some@email.com' }
    rut { '1111111-1' }
    phone { '12345678' }
    birthdate { '2000-02-02' }
    password { 'password' }
  end
end
