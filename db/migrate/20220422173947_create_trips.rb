class CreateTrips < ActiveRecord::Migration[6.1]
  def change
    create_table :trips do |t|
      t.string :from_address
      t.string :to_address
      t.int :available_seats
      t.datetime :leaving_at
      t.int :price
      t.text :comments
      t.string :car_license_plate
      t.string :car_brand
      t.string :car_model
      t.string :car_color

      t.timestamps
    end
  end
end
