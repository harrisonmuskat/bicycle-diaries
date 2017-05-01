require 'rails_helper'

RSpec.describe "unauthenticated user logs in" do
  it "can see link to log in from root path" do
    visit root_path

    expect(page).to have_link("Sign In with Strava")
  end

  it "can log in after clicking link" do
    visit root_path

    auth = OmniAuth.config.mock_auth[:strava]
    click_link "Sign In with Strava"

    expect(page).to have_content "Logged in!"
    expect(page).to have_content auth["info"]["email"]
  end

  it "authenticated user can log out" do
    visit root_path

    OmniAuth.config.mock_auth[:strava]
    click_link "Sign In with Strava"

    click_link "Sign Out"
    expect(page).to have_content "Logged out!"
  end
end
