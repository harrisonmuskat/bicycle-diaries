import React, { Component } from 'react';

class ProfilePersonCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let buttons =
      <div className="small-5 offset-1 columns">
        <div className="small expanded button-group">
          <button className="button success" name="friend" onClick={(event) => this.props.onClick(this.props.userId, event)}>Friend Request</button>
        </div>
      </div>
    return(
      <div className="card story-card">
        <div className="card-divider story-title">
          <div className="row">
            <div className="small-6 columns">
              {this.props.userProfile}
              {this.props.userName}
            </div>
            {buttons}
          </div>
        </div>
        <div className="card-section">
          <div className="row">
            <div className="small-12 columns">
              {this.props.userRides}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ProfilePersonCard;
