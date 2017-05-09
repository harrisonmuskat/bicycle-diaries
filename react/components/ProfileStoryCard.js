import React, { Component } from 'react';

class ProfileStoryCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let buttons;
    if(this.props.currentUserId === this.props.storyUserId) {
      buttons =
      <div className="small-5 offset-1 columns">
        <div className="small expanded button-group">
          <button className="button success" name="edit" onClick={(event) => this.props.onClick(this.props.storyId, event)}>Edit Story</button>
          <button className="button alert" name="delete" onClick={(event) => this.props.onClick(this.props.rideId, event)}>Delete Ride</button>
        </div>
      </div>
    }
    return(
      <div className="card story-card">
        <div className="card-divider story-title">
          <div className="row">
            <div className="small-6 columns">
              {this.props.title}
            </div>
            {buttons}
          </div>
        </div>
        <div className="card-section">
          <div className="row">
            <div className="small-12 columns">
              {this.props.body}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ProfileStoryCard;
