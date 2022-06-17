# frozen_string_literal: true

require 'rails_helper'

RSpec.describe(PassengerRequestsController) do
  before(:each) do
    @user = FactoryBot.create(:user)
    @user.save
  end

  after(:each) do
    User.delete_all
  end

  describe 'GET show' do
    it 'should redirect in case of non existing id' do
      sign_in @user
      id = (0...8).map { rand(48..90).chr }.join
      get :show, params: { id: id }
      expect(response).to(have_http_status(302))
    end
  end
end
