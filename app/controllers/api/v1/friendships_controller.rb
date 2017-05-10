class Api::V1::FriendshipsController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }

  def create
    friendship = Friendship.new()
    friendship.user_id = params["currentUserId"]
    friendship.friend_id = params["friendRequestUserId"]
    if friendship.save!
      render json: {message: "Friend added!"}
    else
      render json: {message: "An error occurred."}
    end
  end

  def destroy
    friendship = Friendship.find_by(user_id: params["currentUserId"], friend_id: params["friendRequestUserId"])
    if Friendship.destroy(friendship)
      render json: {message: "Friend removed!"}
    else
      render json: {message: "An error occurred."}
    end
  end
end
