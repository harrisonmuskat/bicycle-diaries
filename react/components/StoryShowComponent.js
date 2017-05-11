import React, { Component } from 'react';
import { Link } from 'react-router';
import MapComponent from './MapComponent';

class StoryShowComponent extends Component {
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
        <div className="card-section">
          <div className="row">
            <div className="small-12 columns">
              <MapComponent
                polyline={this.props.polyline}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}


export default StoryShowComponent;
