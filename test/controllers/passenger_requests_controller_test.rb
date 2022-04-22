# frozen_string_literal: true

require 'test_helper'

class PassengerRequestsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @passenger_request = passenger_requests(:one)
  end

  test 'should get index' do
    get passenger_requests_url
    assert_response :success
  end

  test 'should get new' do
    get new_passenger_request_url
    assert_response :success
  end

  test 'should create passenger_request' do
    assert_difference('PassengerRequest.count') do
      post passenger_requests_url, params: { passenger_request: { comments: @passenger_request.comments, status: @passenger_request.status } }
    end

    assert_redirected_to passenger_request_url(PassengerRequest.last)
  end

  test 'should show passenger_request' do
    get passenger_request_url(@passenger_request)
    assert_response :success
  end

  test 'should get edit' do
    get edit_passenger_request_url(@passenger_request)
    assert_response :success
  end

  test 'should update passenger_request' do
    patch passenger_request_url(@passenger_request),
          params: { passenger_request: { comments: @passenger_request.comments, status: @passenger_request.status } }
    assert_redirected_to passenger_request_url(@passenger_request)
  end

  test 'should destroy passenger_request' do
    assert_difference('PassengerRequest.count', -1) do
      delete passenger_request_url(@passenger_request)
    end

    assert_redirected_to passenger_requests_url
  end
end
