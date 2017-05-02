import React, { Component } from 'react';
import ActivityCard from '../components/ActivityCard';
import moment from 'moment';

class ActivityDisplay extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let activities = this.props.activities.map(activity => {
      return(
        <ActivityCard
          key={activity.id}
          name={activity.name}
          start_date={moment(activity.start_date).format('LL')}
        />
      )
    })
    return (
      <div>
        {activities}
      </div>
    )
  }
}

export default ActivityDisplay;
