import React, { Component } from 'react';
import GoogleMap from 'google-map-react';

class MapComponent extends Component {
  constructor(props) {
    super(props);

    this.renderPolyline = this.renderPolyline.bind(this);
  }

  renderPolyline(map, maps) {
    if(this.props.polyline !== "") {
      let decodedPolyline = google.maps.geometry.encoding.decodePath(this.props.polyline);
      let drawnPolyline = new google.maps.Polyline({
        strokeColor: '#843956',
        strokeOpacity: 1,
        strokeWeight: 4,
        path: decodedPolyline
      });
      debugger;
      drawnPolyline.setMap(map);
    }
  }

  render() {
    let center = {lat: 42.36, lng: -71.056};
    let zoom = 11;
    return(
      <div className="map-container">
        <GoogleMap
          bootstrapURLKeys={{key: "AIzaSyBOALyxir3GAj7JDrf6kkf_MQWnPWT8apc",
                             libraries: "geometry"}}
          center={center}
          defaultZoom={zoom}
          onGoogleApiLoaded={({map, maps}) => this.renderPolyline(map, maps)}
          yesIWantToUseGoogleMapApiInternals
        >
        </GoogleMap>
      </div>
    )
  }
}

export default MapComponent;
