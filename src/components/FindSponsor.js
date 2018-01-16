import "babel-polyfill";
import React from 'react';
import ReactDOM from 'react-dom';
import MapContainer from './MapContainer';
import FindSponsorForm from './FindSponsorForm';
import LocationResults from './LocationResults';
import SavedLocations from './SavedLocations';
import { connect } from 'react-redux';
import { backToForm, showSavedLocations, showFinder } from '../actions';

const mapStateToProps = ({ map, sponsors }) => ({
	map,
	sponsors
});

const mapDispatchToProps = dispatch => ({
	returnToForm: () => dispatch(backToForm()),
	showSaved: () => dispatch( showSavedLocations() ),
	showFinderView: () => dispatch( showFinder() )
});

class FindSponsor extends React.Component {
	constructor(props) {
	  super(props);

	  let { map } = this.props;

	  this.locations = map.places || [];
	  this.showSaved = this.showSaved.bind(this);
	  this.showFinder = this.showFinder.bind(this);
	}

	componentWillMount() {
		//separate add class calls for IE support
		document.body.classList.add('no-scroll');
		document.body.classList.add('display-overlay');
		document.getElementById('html').classList.add('no-scroll');
		let { map, sponsors, returnToForm } = this.props;

		this.locations = map.places;

		this.sponsorDisplay = !map.showResults ?
					   ( <FindSponsorForm /> ) :
					   (<LocationResults back={ returnToForm } saved={ sponsors } locations={ this.locations } />);
		this.display = map.showSaved ?
					   (<div className="find-sponsor-map-container saved">
							<div className="saved-locations-content">
								<h3>Your saved sponsorship leads</h3>
								<SavedLocations locations={ sponsors }/>
							</div>
						</div>) :
					   (<div className="container find-sponsor-map-container">
							<div className="col find-sponsors-form-wrapper">
								{ this.sponsorDisplay }
							</div>
							<div className="col map-wrapper">
								<MapContainer />
							</div>
						</div>);
	}

	componentWillUnmount(){
		//separate add class calls for IE support
		document.body.classList.remove('no-scroll');
		document.body.classList.remove('display-overlay');
		document.getElementById('html').classList.remove('no-scroll');
		console.log('FindSponsor Unmounted');
	}

	componentWillUpdate(nextProps, nextState) {
		let { map, returnToForm, sponsors } = this.props;

		this.locations = map.places;

		if( nextProps.map.places !== map.places ) {
			this.locations = nextProps.map.places;
		}

		this.sponsorDisplay = nextProps.map.showResults ?
					   ( <LocationResults back={ returnToForm } saved={ sponsors } locations={ this.locations } /> ) :
					   ( <FindSponsorForm /> );

		this.display = nextProps.map.showSaved ?
					   (<div className="find-sponsor-map-container saved">
							<div className="saved-locations-content">
								<h3>Your saved sponsorship leads</h3>
								<SavedLocations locations={ sponsors }/>
							</div>
						</div>) :
					   (<div className="find-sponsor-map-container">
					   		<div className="map-wrapper">
								<MapContainer />
							</div>
							<div className="find-sponsors-form-wrapper">
								{ this.sponsorDisplay }
							</div>
						</div>);
	}

	showSaved(e) {
		let { showSaved } = this.props;
		showSaved();
	}

	showFinder(e) {
		let { showFinderView } = this.props;
		showFinderView();
	}

	render(){
		let { showFinderView } = this.props;

		return(
			<div className="find-sponsor-wrapper">
				<div className="options-left">
					<div className="option-wrapper" onClick={ (e) => this.showFinder() }>
						<div className={'symbol-bubble smaller ' + (this.props.map.showSaved == false ? 'active' : 'inactive')}>
							<span className="icon-search-big"></span>
						</div>
						<span className={'option-text ' + (this.props.map.showSaved == false ? 'active' : 'inactive-text')}>Find</span>
					</div>
					<div className="option-wrapper" onClick={ (e) => this.showSaved() }>
						<div className={'symbol-bubble smaller ' + (this.props.map.showSaved !== false ? 'active' : 'inactive')}>
							<span className="icon-saved-items-big"></span>
							<span className={'saved-indicator ' + (this.props.sponsors.length > 0 ? 'display' : 'hide')}> {this.props.sponsors.length}</span>
						</div>
						<span className={'option-text ' + (this.props.map.showSaved !== false ? 'active' : 'inactive-text')}>Saved</span>
					</div>
				</div>

					{ this.display }

			</div>
		);
	}
}

export default connect( mapStateToProps, mapDispatchToProps )(FindSponsor);


