class AddUsersToTrips < ActiveRecord::Migration[6.1]
  def change

    add_reference :passenger_requests, :user, foreign_key: true
    add_reference :passenger_requests, :trip, foreign_key: true

  end
end
