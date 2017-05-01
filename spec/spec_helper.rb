require 'coveralls'
require 'database_cleaner'
require 'omniauth'

Coveralls.wear!('rails')

OmniAuth.config.test_mode = true
  omniauth_hash = { 'provider' => 'strava',
                    'uid' => '123456',
                    'credentials' => {
                      'token' => '58475987r98fdfhdf93873see'
                    },
                    'info' => {
                        'first_name' => 'john',
                        'last_name' => 'doe',
                        'email' => 'johndoe@gmail.com'
                    },
                    'extra' => {'raw_info' =>
                                    { 'id' => 123456,
                                      'profile' => "http://lorempixel.com/200/200/animals",
                                      'city' => 'San Francisco',
                                      'state' => 'CA',
                                      'country' => 'USA'
                                    }
                    }
  }

OmniAuth.config.add_mock(:strava, omniauth_hash)

RSpec.configure do |config|
  config.expect_with :rspec do |expectations|
    expectations.include_chain_clauses_in_custom_matcher_descriptions = true
  end

  config.mock_with :rspec do |mocks|
    mocks.verify_partial_doubles = true
  end

  config.shared_context_metadata_behavior = :apply_to_host_groups

  config.before(:suite) do
    DatabaseCleaner.strategy = :transaction
    DatabaseCleaner.clean_with(:truncation)
  end

  config.before(:each) do
    DatabaseCleaner.start
  end

  config.after(:each) do
    DatabaseCleaner.clean
  end
end
