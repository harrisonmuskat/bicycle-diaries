import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import TextField from '../components/TextField';
import TextArea from '../components/TextArea'

class EditStoryFormContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activityName: "",
      activityBody: "",
      errors: [],
      success: ""
    }

    this.fetchStoryToEdit = this.fetchStoryToEdit.bind(this);
    this.handleFormSubmit=this.handleFormSubmit.bind(this);
    this.validatePayload=this.validatePayload.bind(this);
    this.handleTitleFieldChange=this.handleTitleFieldChange.bind(this);
    this.handleBodyFieldChange=this.handleBodyFieldChange.bind(this);
    this.handleClearForm=this.handleClearForm.bind(this);
  }

  fetchStoryToEdit() {
    fetch(`/api/v1/stories/${this.props.params.id}/edit`)
    .then(response => {
      if(response.ok) {
        return response;
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
            error = new Error(errorMessage)
        throw(error);
      }
    })
    .then(response => response.json())
    .then(body => {
      this.setState( {activityName: body.title,
                      activityBody: body.body} );
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  handleFormSubmit(event) {
    debugger;
    event.preventDefault();
    this.setState( {success: ""} )
    let storyPayload = JSON.stringify({title: this.state.activityName, body: this.state.activityBody})
    if(this.validatePayload()) {
      fetch(`/api/v1/stories/${this.props.params.id}`, {
        method: 'PATCH',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: storyPayload
      })
      .then(response => response.json())
      .then(body => {
        if(body.message !== "Story updated successfully!") {
          let newErrors = body
          this.setState( {errors: newErrors} )
        } else {
          this.setState( {success: "Story updated!"} )
        }
      })
    }
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
    } else {
      return true;
    }
  }

  handleTitleFieldChange(event) {
    this.setState( {activityName: event.target.value} )
  }

  handleBodyFieldChange(event) {
    this.setState( {activityBody: event.target.value} )
  }

  handleClearForm() {
    this.setState({
      activityName: "",
      activityBody: "",
      errors: []
    })
  }

  componentDidMount() {
    this.fetchStoryToEdit();
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
    let successDiv = null;
    if(this.state.success !== "") {
      successDiv = <div className="callout success">{this.state.success}</div>
    }
    return(
      <div className={this.props.rideFormCssClass}>
        <h2 className="form-header"> Tell your story here: </h2>
        <form onSubmit={this.handleFormSubmit}>
          {errorDiv}
          {successDiv}
          <TextField
            content={this.state.activityName}
            label='Ride title'
            name='activityName'
            handlerFunction={this.handleTitleFieldChange}
          />
          <TextArea
            content={this.state.activityBody}
            label='Ride story'
            name='activityBody'
            handlerFunction={this.handleBodyFieldChange}
          />
          <input className="button" type="submit" value="Post!" />
          <p className="button" onClick={this.handleClearForm}>Clear Form</p>
        </form>
      </div>
    )
  }
}

export default EditStoryFormContainer;
