import React, { Component } from 'react';
import ActivityFormContainer from './ActivityFormContainer';
import RideFormContainer from './RideFormContainer';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      side: false,
      mainCssClass: "small-6 small-centered columns",
      childCssClass: "small-4 small-centered columns",
      rideFormCssClass: "hidden",
      currentActivity: null
    }

    this.moveToSide = this.moveToSide.bind(this);
  }

  componentDidMount() {
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
        this.setState( {currentUser: body.user} )
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  moveToSide(activity) {
    if(!this.state.side) {
      this.setState({ mainCssClass: "small-4 columns",
                      childCssClass: "small-12 small-centered columns",
                      rideFormCssClass: "small-8 columns ride-form",
                      side: true,
                      currentActivity: activity
                    })
    }
    else if(this.state.side == true && this.state.currentActivity !== activity) {
      this.setState( {currentActivity: activity} )
    } else {
      this.setState({ mainCssClass: "small-6 small-centered columns",
                      childCssClass: "small-4 small-centered columns",
                      rideFormCssClass: "hidden"
                    })
    }
  }

  render() {
    return(
      <div className="row">
        <RideFormContainer
          rideFormCssClass={this.state.rideFormCssClass}
          activity={this.state.currentActivity}
        />
        <ActivityFormContainer
          currentUser={this.state.currentUser}
          moveToSide={this.moveToSide}
          mainCssClass={this.state.mainCssClass}
          childCssClass={this.state.childCssClass}
        />
      </div>
    );
  }
}

export default App;
