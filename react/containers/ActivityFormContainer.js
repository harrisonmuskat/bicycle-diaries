import React, { Component } from 'react';
import DateField from '../components/DateField';

class ActivityFormContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div>
        <div className="small-6 small-centered columns">
          <h2 className="form-header"> Find an activity by date: </h2>
          <div className="row">
            <div className="small-4 small-centered columns">
              <DateField />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ActivityFormContainer;
