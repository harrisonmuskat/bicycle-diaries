class StorySerializer < ActiveModel::Serializer
  attributes :id, :ride_id, :title, :body

  belongs_to :ride, serializer: RideSerializer
  belongs_to :user
end
