class Api::V1::StoriesController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }

  def create
    ride = Ride.find_by(ride_id: params["ride_id"].to_s)
    story = Story.create(
      ride: ride,
      title: params["name"],
      body: params["body"]
    )
    message = story.errors.full_messages
    render :json => message
  end
end
