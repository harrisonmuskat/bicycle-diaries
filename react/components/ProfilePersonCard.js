import React, { Component } from 'react';

class ProfilePersonCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let buttons;
    if(this.props.profileUserId === this.props.currentUserId) {
      if(this.props.friend) {
        buttons =
        <div className="small-5 offset-1 columns">
          <div className="small expanded button-group">
            <button className="button success" name="friend" onClick={(event) => this.props.onClick(this.props.userId, event)}>
              <i className="icon-heart"></i>     Friend
            </button>
          </div>
        </div>
      } else {
        buttons =
        <div className="small-5 offset-1 columns">
          <div className="small expanded button-group">
            <button className="button success" name="friendRequest" onClick={(event) => this.props.onClick(this.props.userId, event)}>
              <i className="icon-heart-empty"></i>    Friend Request
            </button>
          </div>
        </div>
      }
    }
    return(
      <div className="card story-card">
        <div className="card-divider story-title">
          <div className="row">
            <div className="small-6 columns">
              <img className="user-profile-card-pic" src={this.props.userProfile} alt="profile" />
              <div className= "user-profile-card-intro-text">
                <a href={`/users/${this.props.userId}`}>{this.props.userName}</a>
              </div>
            </div>
            {buttons}
          </div>
        </div>
        <div className="card-section">
          <div className="row">
            <div className="small-12 columns">
              Stories: {this.props.userRides}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ProfilePersonCard;
