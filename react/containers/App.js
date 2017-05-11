import React, { Component } from 'react';
import ActivityFormContainer from './ActivityFormContainer';
import RideFormContainer from './RideFormContainer';
import StoryContainer from './StoryContainer'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      rideFormCssClass: "hidden",
      currentActivity: null,
      showStoryContainer: true,
      stories: {}
    }

    this.showRideForm = this.showRideForm.bind(this);
    this.handleFormShift = this.handleFormShift.bind(this);
    this.sleep = this.sleep.bind(this);
    this.fetchStories = this.fetchStories.bind(this);
  }

  componentWillMount() {
    fetch('/api/v1/user', {
          credentials: 'same-origin',
          method: 'GET'
      })
      .then(response => {
        if(response.ok) {
          return response;
        } else {
          let errorMessage = `${response.status} (${response.statusText})`,
              error = new Error(errorMessage);
          throw(error);
        }
      })
      .then(response => response.json())
      .then(body => {
        this.setState( {currentUser: body} )
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
    this.fetchStories();
  }

  showRideForm(activity) {
    if(this.state.currentActivity !== activity) {
      this.setState( {rideFormCssClass: "small-8 columns ride-form",
                      currentActivity: activity} )
    } else {
      this.setState({rideFormCssClass: "hidden"})
    }
  }

  handleFormShift() {
    this.sleep(500).then(() => {
        this.setState( {rideFormCssClass: "hidden",
                        showStoryContainer: true},
                        this.fetchStories()
                      )
    });
  }

  fetchStories() {
    fetch('/api/v1/stories')
    .then(response => {
      if(response.ok) {
        return response;
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
        error = new Error(errorMessage);
        throw(error);
      }
    })
    .then(response => response.json())
    .then(body => {
      this.setState( {stories: body} )
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }


  render() {
    let stories;
    if(this.state.showStoryContainer && this.state.stories.length > 0) {
      stories = <StoryContainer
                  storyList={this.state.stories}
                />;
    }
    return(
      <div className="row">
        <RideFormContainer
          rideFormCssClass={this.state.rideFormCssClass}
          activity={this.state.currentActivity}
          handleFormShift={this.handleFormShift}
        />
        {stories}
        <ActivityFormContainer
          currentUser={this.state.currentUser}
          showRideForm={this.showRideForm}
          mainCssClass={this.state.mainCssClass}
          childCssClass={this.state.childCssClass}
        />
      </div>
    );
  }
}

export default App;
