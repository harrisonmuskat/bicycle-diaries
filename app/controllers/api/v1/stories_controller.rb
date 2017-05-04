class Api::V1::StoriesController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }

  def create
    ride = Ride.find_by(ride_id: params["ride_id"].to_s)
    Story.create(
      ride: ride,
      title: params["name"],
      body: params["body"]
    )
    render :
  end
end
