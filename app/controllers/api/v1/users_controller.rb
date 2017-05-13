class Api::V1::UsersController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:create, :update]

  def index
    users = User.all
    render json: users
  end

  def show
    user = User.find(params["id"])
    render json: user
  end

  def getcurrentuser
    if current_user
      user = current_user
    else
      user = {message: "Not signed in"}
    end
    render json: user
  end

end
