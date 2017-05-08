class RideSerializer < ActiveModel::Serializer
  attributes :id, :ride_id, :name, :distance, :moving_time_in_seconds,
    :elapsed_time_in_seconds, :total_elevation_gain, :ride_type, :start_date,
    :average_speed

    belongs_to :user
    has_one :coordinate
    has_one :map
    has_one :story
end
