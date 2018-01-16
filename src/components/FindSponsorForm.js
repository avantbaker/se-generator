import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { updateLocationOptions } from '../actions';

const mapStateToProps = ({ map: { locationOptions } }) => ({
	locationOptions
});

const mapDispatchToProps = dispatch => ({
	updateOptions: ( obj ) => dispatch( updateLocationOptions(obj) )
});

class FindSponsorForm extends Component {

	constructor(props) {
	  super(props);
	  let { locationOptions } = this.props;
	  this.state = {
	  	zip: locationOptions.zip || '',
	  	radius: locationOptions.radius || '8000',
	  	category: locationOptions.category || 'store',
	  	validatedZip: true
	  };

	}

	findSponsors(e){
		e.preventDefault();

		let { updateOptions } = this.props;

		var zip = ReactDOM.findDOMNode(this.refs.sponsorZip).value,
			radius = ReactDOM.findDOMNode(this.refs.sponsorRadius).value,
			category = ReactDOM.findDOMNode(this.refs.sponsorCategory).value;

		let options = { zip, radius, category };
		
		if(!this.validateZip(zip)){
			this.setState({ validatedZip: false });
			return;
		}

		Munchkin.munchkinFunction( 'clickLink', {href: 'sponsorship-app/searched-for-sponsors'} );
		ga('send', 'event', 'Sponsorship', window.location.pathname, 'Find Sponsor Search');
		console.log('eventTrack: Find Sponsor' + ' + Marketo Find Sponsor' );
		updateOptions(options);
	}

	setValueInState(refName, e){
		var newValue = Object.assign({}, this.state, { [refName]: e.target.value });
		this.setState(newValue);
	}

	validateZip(code){
		var zip = code.toString(),
		regEx = /(^\d{5}(-\d{4})?$)|(^[ABCEGHJKLMNPRSTVXY]{1}\d{1}[A-Z]{1} *\d{1}[A-Z]{1}\d{1}$)/g;
		return regEx.test(zip) || false;
	}

	render() {

		return (
			<div className="find-sponsor-form">
				<p>Get a scouting report for potential sponsors in your area.</p>
				<div className={ "field-wrapper full-width-field find-sponsor-field-wrapper " + ( this.state.validatedZip == false  ? 'error' : ''  ) }>
					<label>Zip/Postal Code</label>
					<input ref="sponsorZip" onChange={ this.setValueInState.bind(this, 'zip') } value={ this.state.zip } type="text"/>
					<span className="error-message">Error: add valid zip code</span>
				</div>
				<div className="field-wrapper full-width-field find-sponsor-field-wrapper">
					<label>Category</label>
					<select ref="sponsorCategory" onChange={ this.setValueInState.bind(this, 'category') } value={ this.state.category }>
						<option value="bank">Bank</option>
						<option value="dentist">Dentist</option>
						<option value="doctor">Doctor</option>
						<option value="hair_care">Hair Care</option>
						<option value="insurance_agency">Insurance</option>
						<option value="restaurant">Restaurant</option>
						<option value="shoe_store">Shoe / Footwear</option>
					</select>
				</div>
				<div className="field-wrapper full-width-field find-sponsor-field-wrapper">
					<label>Mile Radius</label>
					<select ref="sponsorRadius" onChange={ this.setValueInState.bind(this, 'radius') } value={ this.state.radius }>
						<option value="8000">5 Miles</option>
						<option value="24000">15 Miles</option>
						<option value="40000">25 Miles</option>
						<option value="80000">50 Miles</option>
					</select>
				</div>
				<button className="button-black full-width" onClick={ (e) => this.findSponsors(e) }>Find Sponsors</button>
			</div>
	    );
	}
}

export default connect( mapStateToProps, mapDispatchToProps )(FindSponsorForm);
