Rails.application.config.middleware.use OmniAuth::Builder do
  provider :strava, ENV['STRAVA_KEY'], ENV['STRAVA_SECRET'], scope: 'public'
end
