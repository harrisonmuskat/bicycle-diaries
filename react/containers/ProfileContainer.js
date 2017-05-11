import React, { Component } from 'react';
import moment from 'moment';
import ProfileStoryCard from '../components/ProfileStoryCard';
import ProfilePersonCard from '../components/ProfilePersonCard';

class ProfileContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profileUser: {},
      currentUser: {},
      allUsers: [],
      stories: [],
      profileUserFriends: [],
      message: ""
    }

    this.onButtonClick=this.onButtonClick.bind(this);
    this.fetchProfileUser=this.fetchProfileUser.bind(this);
    this.fetchCurrentUser=this.fetchCurrentUser.bind(this);
    this.fetchAllUsers = this.fetchAllUsers.bind(this);
    this.deleteRide=this.deleteRide.bind(this);
    this.onFriendClick=this.onFriendClick.bind(this);
    this.addFriend=this.addFriend.bind(this);
    this.destroyFriendship=this.destroyFriendship.bind(this);
  }

  componentDidMount() {
    this.fetchProfileUser();
    this.fetchCurrentUser();
    this.fetchAllUsers();
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
                        stories: body.stories,
                        profileUserFriends: body.friends} );
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

  fetchAllUsers() {
    fetch(`/api/v1/users`, {
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
        this.setState( {allUsers: body} );
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
      this.setState( {message: body.message}, this.fetchProfileUser() )
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  onButtonClick(id, event){
    event.preventDefault();
    if(event.target.name === "delete") {
      this.deleteRide(id);
    }
  }

  addFriend(jsonPayload) {
    fetch('/api/v1/friendships', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: jsonPayload
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
      this.setState( {message: body.message}, this.fetchProfileUser() )
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  destroyFriendship(jsonPayload) {
    fetch('/api/v1/friendship', {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: jsonPayload
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
      this.setState( {message: body.message}, this.fetchProfileUser() )
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  onFriendClick(id, event){
    event.preventDefault();
    let jsonBody = JSON.stringify({
      currentUserId: this.state.currentUser.id,
      friendRequestUserId: id
    })
    if(event.target.name === "friend"){
      this.destroyFriendship(jsonBody)
    } else {
      this.addFriend(jsonBody);
    }
  }

  render() {
    let actual_time = moment(this.state.profileUser.created_at).format("dddd, MMMM Do YYYY");
    let rides;
    let stories;
    let allUsers;
    let friends;
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
    if(this.state.allUsers.length > 0) {
      allUsers = this.state.allUsers.map(user => {
        if(user.id !== this.state.profileUser.id) {
          let friend;
          friend = this.state.profileUserFriends.find( function(friend) {
            return friend.id === user.id;
          })
          let friendBool = false;
          if (friend) {
            friendBool = true;
          }
          return(
            <ProfilePersonCard
              key={user.id}
              userId={user.id}
              userProfile={user.profile}
              userName={`${user.firstname} ${user.lastname}`}
              userRides={user.rides.length}
              onClick={this.onFriendClick}
              friend={friendBool}
              profileUserId={this.state.profileUser.id}
              currentUserId={this.state.currentUser.id}
            />
          )
        }
      })
    }
    if(this.state.profileUser.friends !== undefined) {
      friends = this.state.profileUser.friends.length;
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
                  <span className="stat">{friends}</span>
                  <p>Biking buddies</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="small-12 medium-6 large-6 columns">
            <h4 className="profile-header">My Stories</h4>
              <div className="scrollbar" id="style1">
                <div className="force-overflow">
                  {stories}
                </div>
              </div>
          </div>
          <div className="small-12 medium-6 large-6 columns">
            <h4 className="profile-header">Biking Buddies</h4>
              <div className="scrollbar" id="style1">
                <div className="force-overflow">
                  {allUsers}
                </div>
              </div>
          </div>
        </div>
      </div>
    )
  }
}


export default ProfileContainer;
