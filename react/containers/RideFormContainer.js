import React, { Component } from 'react';

class RideFormContainer extends Component {
  constructor(props) {
    super(props);

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit(event) {
    event.preventDefault();
  }

  render() {
    return(
      <div className={this.props.rideFormCssClass}>
        Hello!
      </div>
    )
  }
}

export default RideFormContainer;
