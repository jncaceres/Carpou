# frozen_string_literal: true

Rails.application.routes.draw do
  resources :trips
  resources :passenger_requests
  resources :places
  devise_for :users, controllers: {
    sessions: 'users/sessions', registrations: 'users/registrations'
  }
  get '/users/:id/trips', to: 'trips#trips_from_user', as: 'trips_from_user'
  root 'home#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
