class Api::V1::ImagesController < ApplicationController
  skip_before_action :verify_authenticity_token

  def create
    Image.create!(image_params)
  end

  def index
    images = Image.where(story_id: params["story_id"])
    render json: images
  end

  private

  def image_params
    params.permit(:image_url, :story_id)
  end

end
