class StorySerializer < ActiveModel::Serializer
  attributes :id, :ride_id, :title, :body

  belongs_to :ride
  belongs_to :user
end
