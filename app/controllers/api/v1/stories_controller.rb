class Api::V1::StoriesController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }

  def index
    stories = Story.all.order(created_at: :desc)
    render json: stories
  end

  def show
    story = Story.find(params["id"])
    ride = Ride.find(story.ride_id)
    render json: ride
  end

  def create
    ride = Ride.find_by(ride_id: params["ride_id"].to_s)
    user = ride.user
    story = Story.new(
      ride: ride,
      user: user,
      title: params["title"],
      body: params["body"]
    )
    if story.save!
      message = { message: "Story saved successfully!" }
    else
      message = story.errors.full_messages
    end
    render json: message
  end

  def edit
    story = Story.find(params["id"])
    render json: story
  end

  def update
    story = Story.find(params["id"])
    if story.update_attributes(story_params)
      message = { message: "Story updated successfully!" }
    else
      message = story.errors.full_messages
    end
    render json: message
  end

  private

  def story_params
    params.require(:story).permit(:title, :body, :images).merge(
      ride: Ride.find(params["ride_id"])
    )
  end

end
