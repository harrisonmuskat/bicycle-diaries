import React, { Component } from 'react';
import moment from 'moment';

class ProfileContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {},
      currentUserRides: []
    }

    this.getCurrentUserRides = this.getCurrentUserRides.bind(this)
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
        this.setState( {currentUser: body.user},
          function() {
            this.getCurrentUserRides(this.state.currentUser);
          });
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  getCurrentUserRides(user) {
    fetch(`/api/v1/${this.state.currentUser.id}/rides`)
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
      this.setState( {currentUserRides: body} )
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render() {
    let actual_time = moment(this.state.currentUser.created_at).format("dddd, MMMM Do YYYY")
    let rides = this.state.currentUserRides.length
    return(
      <div className="card-profile-stats">
        <div className="card-profile-stats-intro">
          <img className="card-profile-stats-intro-pic" src={this.state.currentUser.profile} alt="profile-image" />
          <div className="card-profile-stats-intro-content">
            <h3>{this.state.currentUser.firstname} {this.state.currentUser.lastname}</h3>
            <p>Member since: {actual_time}</p>
          </div>
        </div>

        <hr />

        <div className="card-profile-stats-container">
          <div className="card-profile-stats-statistic">
            <span className="stat">{rides}</span>
            <p>Rides</p>
          </div>
          <div className="card-profile-stats-statistic">
            <span className="stat">125</span>
            <p>followers</p>
          </div>
          <div className="card-profile-stats-statistic">
            <span className="stat">88</span>
            <p>likes</p>
          </div>
        </div>
      </div>
    )
  }
}


export default ProfileContainer;
