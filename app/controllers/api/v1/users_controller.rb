class Api::V1::UsersController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:create, :update]

  def show
    user = current_user
    render json: user
  end
end
