class CreatePassengerRequests < ActiveRecord::Migration[6.1]
  def change
    create_table :passenger_requests do |t|
      t.text :comments
      t.integer :status, null: false, default: 0

      t.timestamps
    end
  end
end
