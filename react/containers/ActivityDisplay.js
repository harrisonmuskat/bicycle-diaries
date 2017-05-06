import React, { Component } from 'react';
import ActivityCard from '../components/ActivityCard';
import moment from 'moment';

class ActivityDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      saveMessage: ""
    }

    this.convertToMiles = this.convertToMiles.bind(this);
    this.convertToMph = this.convertToMph.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  convertToMiles(distance) {
    let convertedDistance = distance * 0.000621371192;
    return Math.round(convertedDistance * 10)/10;
  }

  convertToMph(speed) {
    let convertedSpeed = speed * 2.2369;
    return Math.round(convertedSpeed * 10)/10;
  }

  handleClick(fullActivity) {
    fetch("api/v1/rides", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(fullActivity)
    })
    .then(response => response.json())
    .then(body => {
      if(body.message == "Save successful!") {
        this.props.handleClearForm();
        this.props.moveToSide(fullActivity);
        this.setState( {saveMessage: body.message} )
      }
      else {
        this.setState( {saveMessage: body.message} )
      }
    })
  }

  render() {
    let activities = this.props.activities.map(activity => {
      return(
        <ActivityCard
          key={activity.id}
          fullActivity={activity}
          name={activity.name}
          start_date={moment(activity.start_date).format('LL')}
          distance={this.convertToMiles(activity.distance)}
          averageSpeed={this.convertToMph(activity.average_speed)}
          handleClick={this.handleClick}
        />
      )
    })
    let helpText;
    if(activities.length > 0) {
      helpText = "Select a ride to begin!";
    }
    return (
      <div>
        <p>{helpText}</p>
        <p>{this.state.saveMessage}</p>
        {activities}
      </div>
    )
  }
}

export default ActivityDisplay;
