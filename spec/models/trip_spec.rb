# frozen_string_literal: true

require 'rails_helper'

RSpec.describe(Trip, type: :model) do
  it 'is valid with valid attributtes' do
    from = FactoryBot.create(:place)
    to = FactoryBot.create(:place)
    user = FactoryBot.create(:user)
    trip = FactoryBot.create(:trip, from_id: from.id, to_id: to.id, user_id: user.id)
    expect(trip).to(be_valid)
  end
end
