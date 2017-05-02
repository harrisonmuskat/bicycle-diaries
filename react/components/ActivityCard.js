import React, { Component } from 'react';

class ActivityCard extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    event.preventDefault();
    fetch("api/v1/ride", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.props.fullActivity)
    })
  }

  render() {
    return(
      <div className="card activity-card" onClick={this.handleClick}>
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
