class Image < ApplicationRecord
  belongs_to :story

  mount_uploader :image_url, ImageUploader
end
