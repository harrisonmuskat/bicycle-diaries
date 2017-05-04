class Story < ApplicationRecord
  belongs_to :ride

  validates :title, presence: true
  validates :body, presence: true
  validates :ride, uniqueness: true
end
