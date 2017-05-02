import React from 'react';

const ActivityCard = (props) => {
  return(
    <div className="card activity-card">
      <div className="card-divider ride-title">
        {props.name}
      </div>
      <div className="card-section">
        Ride date: {props.start_date}
      </div>
    </div>
  )
}

export default ActivityCard;
