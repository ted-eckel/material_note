Rails.application.routes.draw do
  root to: "static_pages#root"

  resources :users, only: [:new, :create]
  resource :session, only: [:new, :create, :destroy]
  namespace :api, defaults: {format: :json} do
    resources :notes, only: [:create, :destroy, :index, :show, :update]
    resources :notebooks, only: [:create, :destroy, :index, :show, :update]
    resources :tags, only: [:create, :destroy, :index, :show, :update]
  end
end
