import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';

class DateField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activityDate: moment()
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(date) {
    this.setState({
      activityDate: date
    });
  }

  render() {
    return <DatePicker
      selected={this.state.activityDate}
      onChange={this.handleChange}
    />;
  }
}

export default DateField;
