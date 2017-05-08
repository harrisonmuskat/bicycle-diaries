import React, { Component } from 'react';
import { Link } from 'react-router';

class StoryCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className="card story-card">
        <div className="card-divider story-title">
          <div className="row">
            <div className="small-6 columns">
              {this.props.title}
            </div>
            <div className="small-6 columns">
              <Link to={`/users/${this.props.userId}`} >{this.props.userFirstName} {this.props.userLastName}</Link>
            </div>
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


export default StoryCard;
