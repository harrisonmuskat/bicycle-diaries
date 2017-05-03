import React, { Component } from 'react';
import TextField from '../components/TextField'

class RideFormContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activityName: null
    }

    this.handleFieldChange = this.handleFieldChange.bind(this);
  }

  handleFieldChange(event) {
    console.log(event.target.value);
    this.setState( {activityName: event.target.value} )
  }

  render() {
    return(
      <div className={this.props.rideFormCssClass}>
        <h2 className="form-header"> Tell your story here: </h2>
        <form>
          <TextField
            content={this.state.activityName}
            label='Ride name'
            name='name'
            handlerFunction={this.handleFieldChange}
            placeholder={this.props.activity !== null ? this.props.activity.name : ""}
          />
        </form>
      </div>
    )
  }
}

export default RideFormContainer;
