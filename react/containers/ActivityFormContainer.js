import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';

class ActivityFormContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDate: moment()
    }

    this.handleCalendarChange = this.handleCalendarChange.bind(this);
  }

  handleCalendarChange(date) {
    this.setState( {selectedDate: date} )
  }

  render() {
    return(
      <div>
        <div className="small-6 small-centered columns">
          <h2 className="form-header"> Find an activity by date: </h2>
          <div className="row">
            <div className="small-4 small-centered columns">
              <form onSubmit={this.props.handleFormSubmit}>
                <DatePicker
                  selected={this.state.selectedDate}
                  onChange={this.handleCalendarChange}
                  />
                <input type="submit" value="Find activities" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ActivityFormContainer;
