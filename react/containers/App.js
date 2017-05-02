import React, { Component } from 'react';
import ActivityFormContainer from './ActivityFormContainer';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      activities: []
    }
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }

  componentDidMount() {
    fetch('/api/v1/user', {
          credentials: 'same-origin',
          method: 'GET'
      })
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
        this.setState( {currentUser: body.user} )
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  handleFormSubmit(event) {
    event.preventDefault();
    
  }

  render() {
    return(
      <div>
        <ActivityFormContainer handleFormSubmit={this.handleFormSubmit}/>
      </div>
    );
  }
}

export default App;
