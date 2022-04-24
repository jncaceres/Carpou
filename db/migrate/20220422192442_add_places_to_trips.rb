class AddPlacesToTrips < ActiveRecord::Migration[6.1]
  def change
    add_reference :trips, :from, foreign_key: { to_table: :places }
    add_reference :trips, :to, foreign_key: { to_table: :places }
  end
end
