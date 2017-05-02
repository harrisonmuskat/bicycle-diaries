class Ride < ApplicationRecord

  belongs_to :user
  has_one :coordinate
  has_one :map
end
