class UserSerializer < ActiveModel::Serializer
  attributes :id, :access_token, :email, :firstname, :lastname, :profile, :city,
    :state, :country, :created_at

  has_many :rides
  has_many :stories
end
