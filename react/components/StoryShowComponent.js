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
        <li><img src={`${image.image_url.url}`} alt="image" /></li>
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
                <ul className="small-block-grid-1 medium-block-grid-3 large-block-grid-4">
                  {images}
                </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}


export default StoryShowComponent;
