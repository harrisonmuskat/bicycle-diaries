import React, { Component } from 'react';

class ActivityCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className="card activity-card hvr-grow" onClick={() => {this.props.handleClick(this.props.fullActivity)}}>
        <div className="card-divider ride-title">
          <div className="row">
            <div className="small-6 columns">
              {this.props.name}
            </div>
            <div className="small-6 columns">
              Distance: {this.props.distance} miles
            </div>
          </div>
        </div>
          <div className="card-section">
            <div className="row">
              <div className="small-6 columns">
                Date: {this.props.start_date}
              </div>
              <div className="small-6 columns">
                Average speed: {this.props.averageSpeed} mph
              </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ActivityCard;
