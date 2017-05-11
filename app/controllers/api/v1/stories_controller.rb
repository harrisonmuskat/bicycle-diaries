class Api::V1::StoriesController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }

  def index
    stories = Story.all.order(created_at: :desc)
    render json: stories
  end

  def create
    ride = Ride.find_by(ride_id: params["ride_id"].to_s)
    user = ride.user
    story = Story.create(
      ride: ride,
      user: user,
      title: params["title"],
      body: params["body"]
    )
    message = story.errors.full_messages
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
    params.require(:story).permit(:title, :body)
  end

end
