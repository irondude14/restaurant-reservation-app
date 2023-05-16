Rails.application.routes.draw do
  resources :restaurants
  resources :owners
  resources :reservations
  resources :users

  post '/sessions', to: 'users#create_session'
  delete '/sessions', to: 'users#destroy_session'
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get '*path',
      to: 'fallback#index',
      constraints: ->(req) { !req.xhr? && req.format.html? }
end
