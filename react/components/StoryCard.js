import React, { Component } from 'react';
import { Link } from 'react-router';
import MapComponent from './MapComponent';

class StoryCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      polyline: ""
    }

    this.fetchPolyline = this.fetchPolyline.bind(this);
  }

  fetchPolyline() {
    fetch(`/api/v1/rides/${this.props.rideId}`)
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
      this.setState( {polyline: body.map.summary_polyline} )
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  componentDidMount() {
    this.fetchPolyline();
  }

  render() {
    return(
      <div className="card story-card">
        <div className="card-divider story-title">
          <div className="row">
            <div className="small-4 columns">
              <Link to={`/stories/${this.props.id}/show`}>{this.props.title}</Link>
            </div>
            <div className="small-5 columns">
              Ride date: {this.props.rideDate}
            </div>
            <div className="small-3 columns">
              <Link to={`/users/${this.props.userId}`} >{this.props.userFirstName} {this.props.userLastName}</Link>
            </div>
          </div>
        </div>
        <div className="card-section">
          <div className="row">
            <div className="small-12 columns">
              {this.props.body.substring(0,140)}
              <Link to={`/stories/${this.props.id}/show`}>...more</Link>
            </div>
          </div>
        </div>
        <div className="card-section">
          <div className="row">
            <div className="small-12 columns">
              <MapComponent
                polyline={this.state.polyline}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}


export default StoryCard;
