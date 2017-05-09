class Ride < ApplicationRecord

  belongs_to :user
  has_one :coordinate, dependent: :destroy
  has_one :map, dependent: :destroy
  has_one :story, dependent: :destroy
end
