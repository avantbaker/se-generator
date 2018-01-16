import React, { Component, PropTypes as T } from 'react';
import ReactDOM from 'react-dom';
import {
	makeCancelable,
	camelize,
	mapStyles,
	evtNames,
	createPlacesRequest,
	createMapConfig,
	retrievePlaces,
	getCurrentPosition,
	makeGeoPromise,
	retrieveDetails
} from './lib/GoogleMapHelpers';
import { connect } from 'react-redux';
import { setCurrPos, updatePlaces } from "../actions";

const mapDispatchToProps = dispatch => ({
	setCurrPos: (obj) => dispatch(setCurrPos(obj)),
	addPlaces: (arr) => dispatch(updatePlaces(arr))
});

class Map extends Component {
	componentDidMount(){
		let { setCurrPos, map } = this.props;
		let _this = this;

		if ( this.props.centerAroundCurrentLocation &&
			 map.locationOptions.zip == null &&
			 map.locationOptions.radius == null
			) {
			if (navigator && navigator.geolocation) {
				getCurrentPosition(setCurrPos, _this.recenterMap);
			}
			this.loadMap();
		} else {
			this.reloadMap();
		}

	}

	componentWillMount() {
		const { setCurrPos, initialCenter } = this.props;
		setCurrPos({ currentPos: initialCenter });
	}

	componentDidUpdate(prevProps, prevState) {
		let { map } = this.props;

		if( prevProps.map.locationOptions !== map.locationOptions ){
			this.reloadMap();
		}
		if(prevProps.google !== this.props.google) {
			this.recenterMap();
		}
		if(prevProps.google !== this.props.google) {
			this.loadMap();
		}

	}

	loadMap() {
		if( this.props && this.props.google ) {
			// google is available
			let { google, map: { locationOptions: { zip, category, radius } }, addPlaces, privateKey } = this.props;
			let { initialCenter, zoom } = this.props;

			const maps = google.maps;
			const _this = this;
			const mapRef = this.refs.map;
			const node = ReactDOM.findDOMNode(mapRef);
			const { lat, lng } = initialCenter;

			const center = new maps.LatLng(lat,lng);

			let request = createPlacesRequest(center, ( radius || "8000" ) , category);
			const mapConfig = createMapConfig(center, zoom);

			this.map = new maps.Map(node, mapConfig);

			retrievePlaces(google, this.map, request).then((places) => {
				retrieveDetails( google, this.map, places, privateKey ).then(function(detailedPlaces){
					// console.log(detailedPlaces)
					addPlaces(detailedPlaces);
				});
			});
		}
	}

	recenterMap() {
		let { map } = this.props;
		const gMap = this.map;
		const curr = this.props.map.currentPos;
		if (gMap) {
			let center = map.currentPos;
			if (!(center instanceof google.maps.LatLng)) {
				center = new google.maps.LatLng(center.lat, center.lng);
			}
			gMap.panTo(center);
        }

	}

	reloadMap(){
		let { google, map, map: { locationOptions: { zip, category, radius } }, addPlaces, privateKey } = this.props;
		let maps = map.google.maps;
		const node = ReactDOM.findDOMNode(this.refs.map);

		if( map.locationOptions.zip !== null &&
			typeof map.locationOptions.zip === 'string' &&
			map.locationOptions.zip.length > 4 ) {

			let options;
			let address = { address: map.locationOptions.zip };
			makeGeoPromise( maps, address ).then((options) => {
				let center = new maps.LatLng( options.lat, options.lng );
				let request = createPlacesRequest(center, radius, category);
				let mapConfig = createMapConfig(center, 12);
				this.map = new maps.Map(node, mapConfig);
				
				retrievePlaces(google, this.map, request).then((places) => {
					retrieveDetails( google, this.map, places, privateKey ).then(function(detailedPlaces){
						// console.log(detailedPlaces)
						addPlaces(detailedPlaces);
					});
				});

			});
		}
	}

	renderChildren() {
		const { children, google, map } = this.props;
		if(!children || !map.fetchLocations ) return;
		let newChildren = React.Children.map(children, c => {
			return React.cloneElement(c, {
				map: this.map,
				google: google,
				mapCenter: map.currentPos
			});
		});
		return newChildren;
	}

	render() {
		return(
			<div style={mapStyles.map} ref="map">
				Loading Map ...
				{ this.renderChildren() }
			</div>
		);
	}
}

Map.propTypes = {
	google: T.object,
	zoom: T.number,
	initialCenter: T.object
};

Map.defaultProps = {
  zoom: 12,
  initialCenter: {
  	lat: 33.807197,
  	lng: -84.345238
  },
  centerAroundCurrentLocation: true
}

export default connect( null , mapDispatchToProps )(Map);



