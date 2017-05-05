import React, { Component } from 'react';

class StoryCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className="card story-card">
        <div className="card-divider story-title">
          <div className="row">
            <div className="small-12 columns">
              {this.props.title}
            </div>
          </div>
        </div>
        <div className="card-section">
          <div className="row">
            <div className="small-12 columns">
              {this.props.body}
            </div>
          </div>
        </div>
      </div>
    )
  }
}


export default StoryCard;
