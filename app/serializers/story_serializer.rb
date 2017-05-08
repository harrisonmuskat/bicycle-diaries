class StorySerializer < ActiveModel::Serializer
  attributes :id, :title, :body

  belongs_to :ride
  belongs_to :user
end
