class User < ApplicationRecord
  validates :email, :provider, :uid, presence: true
  validates :email, :uid, uniqueness: true

  has_many :rides
  has_many :stories
  has_many :friendships, foreign_key: :user_id, class_name: "Friendship"
  has_many :friends, through: :friendships

  def self.find_or_create_from_auth_hash(auth)
    User.find_or_create_by(provider: auth["provider"], uid: auth["extra"]["raw_info"]["id"]) do |user|
      user.access_token = auth["credentials"]["token"]
      user.email = auth["info"]["email"]
      user.firstname = auth["info"]["first_name"]
      user.lastname = auth["info"]["last_name"]
      user.profile = auth["extra"]["raw_info"]["profile"]
      user.city = auth["extra"]["raw_info"]["city"]
      user.state = auth["extra"]["raw_info"]["state"]
      user.country = auth["extra"]["raw_info"]["country"]
      user.save!
    end
  end
end
