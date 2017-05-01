Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: "application#index"
  get '/auth/strava/callback', to: 'sessions#create'
  delete 'logout', to: 'sessions#destroy'
end
