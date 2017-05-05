import React, { Component } from 'react';
import StoryCard from '../components/StoryCard';

class StoryContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stories: []
    }
  }

  componentDidMount() {
    fetch('/api/v1/stories')
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
      this.setState( {stories: body} )
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render() {
    let stories;
    if(this.state.stories.length > 0){
      stories = this.state.stories.map(story => {
        return (
          <StoryCard
          title={story.title}
          body={story.body}
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
