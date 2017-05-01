require 'rails_helper'

RSpec.describe SessionsController do

  before do
    request.env['omniauth.auth'] = OmniAuth.config.mock_auth[:strava]
  end

  describe "#create" do
    it "should successfully create a user" do
      expect{ get :create, params: { provider: :strava } }.to change{ User.count }.by(1)
    end

    it "should successfully create a session" do
      expect(session[:user_id]).to be_nil
      get :create, params: { provider: :strava }
      expect(session[:user_id]).to_not be_nil
    end

    it "should redirect the user to the root url" do
      get :create, params: { provider: :strava }
      expect(response).to redirect_to root_url
    end
  end

  describe "#destroy" do
    before do
      get :create, params: { provider: :strava }
    end

    it "should clear the session" do
      expect(session[:user_id]).to_not be_nil
      delete :destroy
      expect(session[:user_id]).to be_nil
    end

    it "should redirect to the home page" do
      delete :destroy
      expect(response).to redirect_to root_url
    end
  end
end
