import React, { Component } from 'react';
import TextField from '../components/TextField';
import TextArea from '../components/TextArea';

class RideFormContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activityName: "",
      activityBody: "",
      errors: []
    }

    this.handleTitleFieldChange = this.handleTitleFieldChange.bind(this);
    this.handleBodyFieldChange = this.handleBodyFieldChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleClearForm = this.handleClearForm.bind(this);
    this.validatePayload = this.validatePayload.bind(this);
  }

  handleTitleFieldChange(event) {
    this.setState( {activityName: event.target.value} )
  }

  handleBodyFieldChange(event) {
    this.setState( {activityBody: event.target.value} )
  }

  validatePayload() {
    let newErrors = [];
    if(this.state.activityName == "" && this.state.activityBody == "") {
      newErrors.push("Please add a title!")
      newErrors.push("Please submit a story!")
      this.setState( {errors: newErrors} )
    }
    else if (this.state.activityBody == "") {
      newErrors.push("Please submit a story!")
      this.setState( {errors: newErrors} )
    } else if (this.state.activityName == "") {
      newErrors.push("Please add a title!")
      this.setState( {errors: newErrors} )
    }
  }

  handleFormSubmit(event) {
    event.preventDefault();
    this.validatePayload();
    let storyPayload = JSON.stringify({title: this.state.activityName, body: this.state.activityBody, ride_id: this.props.activity.id})
    if(this.state.errors.length == 0) {
      fetch("/api/v1/stories", {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: storyPayload
      })
      .then(response => response.json())
      .then(body => {
        if(body.message !== "Story saved successfully!") {
          let newErrors = body
          this.setState( {errors: newErrors} )
        } else {
          this.setState( {activityName: "",
                          activityBody: ""} )
          this.props.handleFormShift();
        }
      })
    }
  }

  handleClearForm() {
    this.setState({
      activityName: "",
      activityBody: "",
      errors: []
    })
  }

  render() {
    let errors = this.state.errors.map(error => {
      return (
        <li>{error}</li>
      )
    })
    let errorDiv = null;
    if(errors.length > 0) {
      errorDiv = <div className="callout alert"><ul>{errors}</ul></div>
    }
    return(
      <div className={this.props.rideFormCssClass}>
        <h2 className="form-header"> Tell your story here: </h2>
        <form onSubmit={this.handleFormSubmit}>
          {errorDiv}
          <TextField
            content={this.state.activityName}
            label='Ride title'
            name='activityName'
            handlerFunction={this.handleTitleFieldChange}
            placeholder={this.props.activity !== null ? this.props.activity.name : ""}
          />
          <TextArea
            content={this.state.activityBody}
            label='Ride story'
            name='activityBody'
            handlerFunction={this.handleBodyFieldChange}
            placeholder='Tell your story here!'
          />
          <input className="button" type="submit" value="Post!"/>
          <p className="button" onClick={this.handleClearForm}>Clear Form</p>
        </form>
      </div>
    )
  }
}

export default RideFormContainer;
