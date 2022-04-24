class AddTripIdToUsers < ActiveRecord::Migration[6.1]
  def change
    add_reference :trips, :user, foreign_key: true
  end
end
