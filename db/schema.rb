# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20_220_422_192_442) do
  # These are extensions that must be enabled in order to support this database
  enable_extension 'plpgsql'

  create_table 'passenger_requests', force: :cascade do |t|
    t.text('comments')
    t.string('status')
    t.datetime('created_at', precision: 6, null: false)
    t.datetime('updated_at', precision: 6, null: false)
    t.bigint('user_id')
    t.bigint('trip_id')
    t.index(['trip_id'], name: 'index_passenger_requests_on_trip_id')
    t.index(['user_id'], name: 'index_passenger_requests_on_user_id')
  end

  create_table 'places', force: :cascade do |t|
    t.string('name')
    t.float('lat')
    t.float('long')
    t.datetime('created_at', precision: 6, null: false)
    t.datetime('updated_at', precision: 6, null: false)
  end

  create_table 'trips', force: :cascade do |t|
    t.string('from_address')
    t.string('to_address')
    t.integer('available_seats')
    t.datetime('leaving_at')
    t.integer('price')
    t.text('comments')
    t.string('car_license_plate')
    t.string('car_brand')
    t.string('car_model')
    t.string('car_color')
    t.datetime('created_at', precision: 6, null: false)
    t.datetime('updated_at', precision: 6, null: false)
    t.bigint('user_id')
    t.bigint('from_id')
    t.bigint('to_id')
    t.index(['from_id'], name: 'index_trips_on_from_id')
    t.index(['to_id'], name: 'index_trips_on_to_id')
    t.index(['user_id'], name: 'index_trips_on_user_id')
  end

  create_table 'users', force: :cascade do |t|
    t.string('name', null: false)
    t.string('last_name', null: false)
    t.string('rut', null: false)
    t.string('phone', null: false)
    t.string('gender')
    t.datetime('birthdate', null: false)
    t.boolean('admin')
    t.string('email', default: '', null: false)
    t.string('encrypted_password', default: '', null: false)
    t.string('reset_password_token')
    t.datetime('reset_password_sent_at')
    t.datetime('remember_created_at')
    t.datetime('created_at', precision: 6, null: false)
    t.datetime('updated_at', precision: 6, null: false)
    t.index(['email'], name: 'index_users_on_email', unique: true)
    t.index(['reset_password_token'], name: 'index_users_on_reset_password_token', unique: true)
  end

  add_foreign_key 'passenger_requests', 'trips'
  add_foreign_key 'passenger_requests', 'users'
  add_foreign_key 'trips', 'places', column: 'from_id'
  add_foreign_key 'trips', 'places', column: 'to_id'
  add_foreign_key 'trips', 'users'
end
