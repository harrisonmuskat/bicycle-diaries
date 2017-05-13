import React, { Component } from 'react';
import { Link } from 'react-router';
import MapComponent from './MapComponent';

class StoryShowComponent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let images = this.props.images.map(image => {
      return(
        <div className="column column-block"><img src={`${image.image_url.url}`} alt="image" /></div>
      )
    })
    return(
      <div className="card story-card">
        <div className="card-divider story-title">
          <div className="row">
            <div className="small-6 columns">
              <h1 className="story-header">{this.props.title}</h1>
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
        <div className="card-section">
          <div className="row">
            <div className="small-12 columns">
              <h1 className="story-header">Pictures from the Ride</h1>
                <div className="row small-up-2 medium-up-3 large-up-4">
                  {images}
                </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}


export default StoryShowComponent;
