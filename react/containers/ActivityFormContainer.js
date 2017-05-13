import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import ActivityDisplay from './ActivityDisplay';

class ActivityFormContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDate: moment(),
      activities: []
    }

    this.handleCalendarChange = this.handleCalendarChange.bind(this);
    this.getActivities = this.getActivities.bind(this);
    this.handleClearForm = this.handleClearForm.bind(this);
  }

  handleCalendarChange(date) {
    this.getActivities(date);
    this.setState( {selectedDate: date} )
  }

  handleClearForm() {
    this.setState( {selectedDate: moment(),
                    activities: []})
  }

  getActivities(date) {
    let token = this.props.currentUser.access_token
    fetch(`https://www.strava.com/api/v3/athlete/activities?after=${date.startOf('day').unix()}&access_token=${token}`)
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
      this.setState( {activities: body} )
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render() {

    return(
      <div className="small-4 large-uncentered columns">
        <h2 className="form-header"> Pick a date to retrieve all activities beginning from that day: </h2>
        <div className="row">
          <div className="small-6 small-centered columns date-form">
            <form>
              <DatePicker className="datepicker"
                selected={this.state.selectedDate}
                onChange={this.handleCalendarChange}
                maxDate={moment()}
                popoverAttachment="bottom center"
                popoverTargetAttachment="top center"
                popoverTargetOffset="0px 0px"
                />
            </form>
          </div>
        </div>
        <ActivityDisplay
          activities={this.state.activities}
          showRideForm={this.props.showRideForm}
          handleClearForm={this.handleClearForm}
        />
      </div>
    );
  }
}

export default ActivityFormContainer;
