class CreatePassengerRequests < ActiveRecord::Migration[6.1]
  def change
    create_table :passenger_requests do |t|
      t.text :comments
      t.string :status

      t.timestamps
    end
  end
end
