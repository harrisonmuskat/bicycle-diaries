Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: "application#index"
  get '/auth/strava/callback', to: 'sessions#create'
  delete 'logout', to: 'sessions#destroy'

  namespace :api do
    namespace :v1 do
      resource :user, only: [:show]
      resource :ride, only: [:create]
    end
  end
end
