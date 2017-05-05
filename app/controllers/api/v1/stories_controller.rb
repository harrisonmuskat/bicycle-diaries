class Api::V1::StoriesController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }

  def index
    stories = Story.all.order(created_at: :desc)
    # rides = stories.map do |story|
    #   story.ride
    # end
    render :json => stories
  end

  def create
    ride = Ride.find_by(ride_id: params["ride_id"].to_s)
    user = ride.user
    story = Story.create(
      ride: ride,
      user: user,
      title: params["name"],
      body: params["body"]
    )
    message = story.errors.full_messages
    render :json => message
  end

end
