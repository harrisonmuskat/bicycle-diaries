require 'fog/aws'

class ImageUploader < CarrierWave::Uploader::Base
  include CarrierWave::MiniMagick

  if Rails.env.test?
    storage :file
  else
    storage :fog
  end

  def store_dir
    "uploads/#{model.class.to_s.underscore}/#{mounted_as}/#{model.id}"
  end

  # Create different versions of your uploaded files:
  version :thumb do
    process resize_to_fit: [50, 50]
  end

  def extension_whitelist
    %w(jpg jpeg gif png)
  end

  def content_type_whitelist
    /image\//
  end

end
