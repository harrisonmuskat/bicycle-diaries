import React, { Component } from 'react';
import moment from 'moment';
import ProfileStoryCard from '../components/ProfileStoryCard';

class ProfileContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profileUser: {},
      currentUser: {},
      stories: [],
      message: ""
    }

    this.onButtonClick=this.onButtonClick.bind(this);
    this.fetchProfileUser=this.fetchProfileUser.bind(this);
    this.fetchCurrentUser=this.fetchCurrentUser.bind(this);
    this.deleteRide=this.deleteRide.bind(this);
  }

  componentDidMount() {
    this.fetchProfileUser();
    this.fetchCurrentUser();
  }

  fetchProfileUser() {
    fetch(`/api/v1/users/${this.props.params.userId}`, {
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
        this.setState( {profileUser: body,
                        stories: body.stories} );
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  fetchCurrentUser() {
    fetch(`/api/v1/user`, {
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
        this.setState( {currentUser: body} );
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  deleteRide(id) {
    fetch(`/api/v1/rides/${id}`, {
      method: 'DELETE'
    })
    .then(response => {
      if(response.ok) {
        return response;
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
            error = new Error(errorMessage)
        throw(error);
      }
    })
    .then(response => response.json())
    .then(body => {
      this.setState( {message: body.message} )
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  onButtonClick(id, event){
    event.preventDefault();
    if(event.target.name === "delete") {
      this.deleteRide(id);
    } else if(event.target.name === "edit") {
      alert("Implement this!")
    }
  }

  render() {
    let actual_time = moment(this.state.profileUser.created_at).format("dddd, MMMM Do YYYY");
    let rides;
    let stories;
    if(this.state.profileUser.rides !== undefined) {
      rides = this.state.profileUser.rides.length;
    }
    if(this.state.stories !== undefined) {
      stories = this.state.stories.map(story => {
        return (
          <ProfileStoryCard
          key={story.id}
          storyId={story.id}
          title={story.title}
          body={story.body}
          rideId={story.ride_id}
          onClick={this.onButtonClick}
          storyUserId={this.state.profileUser.id}
          currentUserId={this.state.currentUser.id}
          />
        )
      });
    }
    let callout;
    if(this.state.message !== "") {
      callout = <div className="callout success">{this.state.message}</div>
    }
    return(
      <div>
        <div className="row">
          <div className="small-12 columns">
            <div className="card-profile-stats">
              <div className="card-profile-stats-intro">
                <img className="card-profile-stats-intro-pic" src={this.state.profileUser.profile} alt="profile-image" />
                <div className="card-profile-stats-intro-content">
                  <h3 className="profile-header">{this.state.profileUser.firstname} {this.state.profileUser.lastname}</h3>
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
                  <span className="stat">0</span>
                  <p>Biking buddies</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="small-6 columns">
            <h4 className="profile-header">My Stories</h4>
              {callout}
              <div className="scrollbar" id="style1">
                <div className="force-overflow">
                  {stories}
                </div>
              </div>
          </div>
          <div className="small-6 columns">
            <h4 className="profile-header">Biking Buddies</h4>
          </div>
        </div>
      </div>
    )
  }
}


export default ProfileContainer;
