require 'open-uri'
require 'data_uri/open_uri'

class Image < ApplicationRecord
  belongs_to :story

  mount_uploader :image_url, ImageUploader

  def self.parseDataURI(data_uri)
    open(data_uri) do |io|
      return io.read
    end
  end
end
