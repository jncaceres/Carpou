require 'rails_helper'

RSpec.describe Trip, type: :model do
    it "is valid with valid attributes" do
        from = Place.new
        to = Place.new
        user = User.new
        trip = Trip.create(from_id: from.id, to_id: to.id, user_id: user.id)
        expect(trip).to be_valid
    end
end