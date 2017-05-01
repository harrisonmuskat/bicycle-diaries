require 'rails_helper'

RSpec.describe User, type: :model do
  describe "validations" do
    subject { FactoryGirl.create(:user) }
    it { should validate_presence_of(:provider) }
    it { should validate_uniqueness_of(:provider) }
    it { should validate_presence_of(:email) }
    it { should validate_uniqueness_of(:email) }
    it { should validate_presence_of(:uid) }
    it { should validate_uniqueness_of(:uid) }
  end

  it { should have_valid(:provider).when("Strava") }
  it { should_not have_valid(:provider).when(nil, "") }

  it { should have_valid(:uid).when(123456) }
  it { should_not have_valid(:uid).when(nil, "") }

  it { should have_valid(:email).when("test@gmail.com") }
  it { should_not have_valid(:email).when(nil, "") }

  it { should have_valid(:firstname).when("Jane") }
  it { should have_valid(:firstname).when(nil, "") }

  it { should have_valid(:lastname).when("Doe") }
  it { should have_valid(:lastname).when(nil, "") }

  it { should have_valid(:profile).when("image url goes here") }
  it { should have_valid(:profile).when(nil, "") }

  it { should have_valid(:city).when("Boston") }
  it { should have_valid(:city).when(nil, "") }

  it { should have_valid(:state).when("MA") }
  it { should have_valid(:state).when(nil, "") }

  it { should have_valid(:country).when("USA") }
  it { should have_valid(:country).when(nil, "") }
end
