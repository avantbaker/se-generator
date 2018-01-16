import React from 'react';
import { wrapper as GoogleApiWrapper } from './lib/GoogleApiWrapper';
import { mapStyles } from './lib/GoogleMapHelpers';
import Map from './Map';
import Marker from './Marker';
import InfoWindow from './InfoWindow';

export class Container extends React.Component {

	constructor(props){
		super(props);

		this.state = {
	      showingInfoWindow: false,
	      activeMarker: {},
	      details: {},
	      selectedPlace: {}
	    };

		this.onMarkerClick = this.onMarkerClick.bind(this);
	}

	componentWillUpdate(nextProps, nextState) {
		let { map } = this.props;

		if ( (map.placesLoaded !== nextProps.map.placesLoaded) || (map.places !== nextProps.map.places)) {
			this.markers = nextProps.map.places.map((marker, i) => {
				let pos = {
					lat: marker.geometry.location.lat,
					lng: marker.geometry.location.lng
				};
				return <Marker
						key={i}
						position={pos}
						details={marker}
						onClick={this.onMarkerClick}
					   />;
			});
		}
	}

	onMarkerClick(props, marker, details, e){
		this.setState({
			selectedPlace: props,
			activeMarker: marker,
			details: details,
			showingInfoWindow: true
		});
		//console.log(this.state.details);
	}

	render() {
		console.log('markerstate', this.state);
		// let infoWindow = this.infoWindow ? this.infoWindow : null;
		let markers = this.markers ? this.markers : [];
		return (
		  <div className="map">
		  	<Map privateKey={this.props.api_key} google={this.props.google} map={this.props.map}>
		  		{ markers }
		  		<InfoWindow
		  		  marker={this.state.activeMarker}
		  		  visible={this.state.showingInfoWindow}>
		  			<div id="content">
			            <div id="siteNotice"></div>
				        <h4 id="firstHeading" className="firstHeading">{ this.state.details.name || '' }</h4>
				        <div className="info-window-content" id="bodyContent">
				            <span>{ this.state.details.formatted_address || '' }</span>
				            <span>{ this.state.details.formatted_phone_number || ''}</span>
			            </div>
		            </div>
		  		</InfoWindow>
		  	</Map>
		  </div>
		);
	}
}

export default GoogleApiWrapper({
	apiKey: "AIzaSyDrpFJ31Z0EgrXnuicOlHEISqMHuiPwJbk"
})(Container);


//AIzaSyBRiujk65NqSpEfC5Q8fiLPoxkNHM84ynY
