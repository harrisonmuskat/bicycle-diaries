FactoryGirl.define do
  factory :user do
    access_token "549fdiuhf4988334837987dfewd343"
    provider "Strava"
    uid 123456
    email "janedoe@gmail.com"
    firstname "Jane"
    lastname "Doe"
    profile "http://lorempixel.com/200/200/animals"
    city "Boston"
    state "MA"
    country "United States"
  end
end
