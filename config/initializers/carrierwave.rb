require 'carrierwave/orm/activerecord'
require 'carrierwave/storage/file'
require 'carrierwave/storage/fog'

CarrierWave.configure do |config|
  if !Rails.env.test?
    config.fog_provider = 'fog/aws'
    config.fog_credentials = {
      provider: "AWS",
      aws_access_key_id: ENV["AWS_KEY"],
      aws_secret_access_key: ENV["AWS_SECRET"]
    }
    config.fog_directory  = ENV["S3_BUCKET"]
  end
end
