Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: "application#index"
  get '/auth/strava/callback', to: 'sessions#create'
  delete 'logout', to: 'sessions#destroy'

  namespace :api do
    namespace :v1 do
      resources :users, only: [:index, :show]
      get '/user', to: 'users#getcurrentuser'
      get '/:user_id/rides', to: 'rides#userrides'
      resources :rides, only: [:index, :create, :show, :destroy]
      resources :stories, only: [:index, :create, :update, :edit, :show] do
        resources :images, only: [:index]
      end
      resources :friendships, only: [:create]
      resource :friendship, only: [:destroy]
      resources :images, only: [:create]
    end
  end

  get "*path", to: "application#index"
end
