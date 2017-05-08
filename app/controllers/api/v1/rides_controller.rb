class Api::V1::RidesController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }

  def index
    rides = Ride.all
    render :json => rides
  end

  def create
    user = User.find_by(uid: params["athlete"]["id"])
    message = {message: "Ride already saved."}
    new_ride = Ride.find_or_create_by!(ride_id: params["id"]) do |ride|
      ride.user = user
      ride.name = params["name"]
      ride.description = params["description"]
      ride.distance = params["distance"]
      ride.moving_time_in_seconds = params["moving_time"]
      ride.elapsed_time_in_seconds = params["elapsed_time"]
      ride.total_elevation_gain = params["total_elevation_gain"]
      ride.ride_type = params["type"]
      ride.start_date = params["start_date"]
      ride.average_speed = params["average_speed"]
      message = {message: "Save successful!"}
    end
    new_map = Map.find_or_create_by!(ride: new_ride) do |map|
      map.map_id = params["map"]["id"]
      map.summary_polyline = params["map"]["summary_polyline"]
    end
    new_coordinates = Coordinate.find_or_create_by!(ride: new_ride) do |coordinates|
      coordinates.start_latitude = params["start_latlng"][0]
      coordinates.start_longitude = params["start_latlng"][1]
      coordinates.end_latitude = params["end_latlng"][0]
      coordinates.end_longitude = params["end_latlng"][1]
    end
    render :json => message
  end

  def userrides
    user = User.find(params[:user_id])
    rides = Ride.where(user: user)
    render :json => rides
  end
end
