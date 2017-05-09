![Build Status](https://codeship.com/projects/a2074f00-078c-0135-ac81-5eca1b05dde3/status?branch=master)
![Code Climate](https://codeclimate.com/github/harrisonmuskat/bicycle-diaries.png)
[![Coverage Status](https://coveralls.io/repos/github/harrisonmuskat/bicycle-diaries/badge.svg)](https://coveralls.io/github/harrisonmuskat/bicycle-diaries)

# Bicycle Diaries

This React-Rails app allows users to sign in with Strava to upload stories, share rides, and match with similar riders in their area.

Check it out on Heroku!
[Bicycle Diaries](https://bicycle-diaries.herokuapp.com/)

## Contributing

If you'd like to contribute, follow these steps in the terminal:
```
git clone https://github.com/harrisonmuskat/bicycle-diaries.git
bundle install
yarn install
rake db:create
rails s
yarn start
```

## Testing

If you've cloned the app, you can run the Rails tests with a `rake` command and the React tests with `yarn test`. Tests are written with RSpec, Capybara, Enzyme, and Jasmine.
