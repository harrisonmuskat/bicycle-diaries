class Story < ApplicationRecord
  belongs_to :ride
  belongs_to :user
  has_many :images

  validates :title, presence: true
  validates :body, presence: true
  validates :ride, uniqueness: { message: "has an existing story!" }
end
