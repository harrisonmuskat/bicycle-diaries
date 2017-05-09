import React, { Component } from 'react';
import StoryCard from '../components/StoryCard';

class StoryContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    debugger;
    let stories;
    if(this.props.storyList.length > 0){
      stories = this.props.storyList.map(story => {
        return (
          <StoryCard
            key={story.id}
            title={story.title}
            body={story.body}
            userFirstName={story.user.firstname}
            userLastName={story.user.lastname}
            userId={story.user.id}
            rideId={story.ride.id}
          />
        )
      })
    }
    return (
      <div className="small-8 columns">
        <h2 className="form-header">Story Feed</h2>
        {stories}
      </div>
    )
  }
}

export default StoryContainer;
