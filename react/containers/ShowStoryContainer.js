import React, { Component } from 'react';
import StoryShowComponent from '../components/StoryShowComponent';

class ShowStoryContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rideId: null,
      title: null,
      body: null,
      userId: null,
      userFirstName: null,
      userLastName: null,
      polyline: "",
      storyImages: []
    }

    this.fetchStoryToShow=this.fetchStoryToShow.bind(this);
    this.fetchStoryImages=this.fetchStoryImages.bind(this);
  }

  fetchStoryToShow() {
    fetch(`/api/v1/stories/${this.props.params.id}`)
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
      this.setState( {rideId: body.story.ride_id,
                      title: body.story.title,
                      body: body.story.body,
                      userId: body.user.id,
                      userFirstName: body.user.firstname,
                      userLastName: body.user.lastname,
                      polyline: body.map.summary_polyline} );
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  fetchStoryImages() {
    fetch(`/api/v1/stories/${this.props.params.id}/images`)
    .then(response => {
      if(response.ok) {
        return response;
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
        error = newError(errorMessage);
      }
    })
    .then(response => response.json())
    .then(body => {
      let imageArray = body;
      this.setState( {storyImages: imageArray} )
    })
  }

  componentDidMount() {
    this.fetchStoryToShow();
    this.fetchStoryImages();
  }


  render() {
    return(
      <StoryShowComponent
        storyId={this.props.params.id}
        rideId={this.state.rideId}
        title={this.state.title}
        body={this.state.body}
        userId={this.state.userId}
        userFirstName={this.state.userFirstName}
        userLastName={this.state.userLastName}
        polyline={this.state.polyline}
        images={this.state.storyImages}
      />
    )
  }
}

export default ShowStoryContainer;
