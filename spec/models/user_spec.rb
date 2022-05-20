# frozen_string_literal: true

require 'rails_helper'

RSpec.describe(User, type: :model) do
  it 'sends welcome_email' do
    user = FactoryBot.create(:user)
    expect { AdminMailer.with(user: user).welcome_email.deliver_now }.to(change { ActionMailer::Base.deliveries.count }.by(1))
  end

  it 'sends request_accepted' do
    passenger = FactoryBot.create(:user)
    driver = FactoryBot.create(:user)
    origin_place = FactoryBot.create(:place)
    destination_place = FactoryBot.create(:place)
    trip = FactoryBot.create(:trip, from_id: origin_place.id, to_id: destination_place.id, user_id: passenger.id)
    expect { AdminMailer.with(passenger: passenger, driver: driver, origin_place: origin_place, destination_place: destination_place, trip: trip).request_accepted.deliver_now }.to(change { ActionMailer::Base.deliveries.count }.by(1))
  end

  it 'sends request_rejected' do
    passenger = FactoryBot.create(:user)
    driver = FactoryBot.create(:user)
    origin_place = FactoryBot.create(:place)
    destination_place = FactoryBot.create(:place)
    trip = FactoryBot.create(:trip, from_id: origin_place.id, to_id: destination_place.id, user_id: passenger.id)
    expect { AdminMailer.with(passenger: passenger, driver: driver, origin_place: origin_place, destination_place: destination_place, trip: trip).request_rejected.deliver_now }.to(change { ActionMailer::Base.deliveries.count }.by(1))
  end
end
