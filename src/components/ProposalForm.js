import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { toggleFindSponsor, showSavedLocations, togglePopUp, generateProposal, generateEmail, showModal, updateCurrentForm } from '../actions';
import FindSponsor from './FindSponsor';
import MarketoGhostForm from './MarketoGhostForm';
import { getForm } from '../helperFunctions';
import Chat from './Chat';

const mapStateToProps = ({ finderPopUpVisibility, packages, proposalForm, emailForm, buttonState, currentProposalForm }) => ({
	finderPopUpVisibility,
	packages,
	proposalForm,
	emailForm,
	buttonState,
	currentProposalForm
});

const mapDispatchToProps = dispatch => ({
	toggleFindSponsor: () => dispatch(toggleFindSponsor()),
	showSaved: () => dispatch(showSavedLocations()),
	showFinderView: () => dispatch( showFinder() ),
	togglePopUp: () => dispatch(togglePopUp()),
	submitProposalInfo: (obj) => dispatch(generateProposal(obj)),
	submitEmailInfo: (obj) => dispatch(generateEmail(obj)),
	showModal: (str, modal) => dispatch(showModal(str, modal)),
	updateCurrentForm: (formName) => dispatch(updateCurrentForm(formName))
});

/**
 * Polyfill for Includes function
 * @param  {Mixed} searchElement Item to be searched for
 * @param  {Int} fromIndex       Where To start Searching for it at
 * @return {Bool}                returns true if the value exists in that array
 */
Array.prototype.includes = Array.prototype.includes || function(searchElement , fromIndex) {
	'use strict';
	if (!this) {
	  throw new TypeError('Array.prototype.includes called on null or undefined');
	}
	if (fromIndex===undefined){
	    var i = this.length;
	    while(i--){
	        if (this[i]===searchElement){return true}
	    }
	} else {
	    var i = fromIndex, len=this.length;
	    while(i++!==len){ // Addittion on hardware will perform as fast as, if not faster than subtraction
	        if (this[i]===searchElement){return true}
	    }
	}
	return false;
};

class ProposalForm extends React.Component {

	createDefaultState(obj, form){
		// check if there is a form variable present
		var form = form ? form : '';
		// Default State Object. If the form has already been filled in before
		// it will pull in that information instead. This is strictly used for
		// validation.
		var defaultState = {
		  	city: obj.city || null,
			contactEmail: obj.contactEmail || null,
			contactFirstName: obj.contactFirstName || null,
			contactLastName: obj.contactLastName || null,
			contactPhone: obj.contactPhone || null,
			numberOfAthletes: obj.numberOfAthletes || null,
			organizationName: obj.organizationName || null,
			contactTitle: obj.contactTitle || null,
			state: obj.state || 'error',
			validate: false,
			isValidated: false,
			btnState: 'initial'
		  };
		// If this is an email proposal add the two additional properties included
		// in that form.
		if ( form == 'email-proposal' ) {
			defaultState = Object.assign({}, defaultState, {
				sponsorName: obj.sponsorName || null,
				sponsorEmail: obj.sponsorEmail || null,
			});
		}
		return defaultState;
	}

	constructor(props) {
	  super(props);

	  let { proposalForm, emailForm, form } = this.props;

	  this.validateGeneral = this.validateGeneral.bind(this);
	  this.validateEmail = this.validateEmail.bind(this);
	  this.formSubmission = this.formSubmission.bind(this);
	  this.createDefaultState = this.createDefaultState.bind(this);
	  this.showSavedSponsors = this.showSavedSponsors.bind(this);
	  this.showFindSponsors = this.showFindSponsors.bind(this);

	  // The internal State for ProposalForm has been specifically added for validation
	  // purposes and validation Purposes only. Name Attributes have been added to the inputs
	  // that correspond to properties so they can be validated.
	  this.state = form == 'email-proposal' ? this.createDefaultState( proposalForm ) : this.createDefaultState( emailForm, form );

	}

	componentWillMount() {
		const { updateCurrentForm } = this.props;
		// Set the Initial Button State
		this.submitButtonState = ( <span> Generate <span className="mobile-hidden-text">&amp; Download</span> Proposal</span> );

		updateCurrentForm(this.props.form);
	}

	componentWillUpdate(nextProps, nextState) {
		let { toggleFindSponsor, toggleChat, finderPopUpVisibility, togglePopUp, buttonState, showModal, form } = this.props;

		// Check what the next Button state is going to be and set the SubmitButtonState appropriately
		if ( nextProps.buttonState.isFetching ) {
			this.submitButtonState = ( <span> Loading...</span> );
		} else if ( nextProps.buttonState.dataRecieved ) {
			this.submitButtonState = ( <span> Success!</span> );
			showModal(nextProps.packageParam, 'success');
		} else {
			form == "generate-proposal" ? this.submitButtonState = ( <span> Generate <span className="mobile-hidden-text">&amp; Download</span> Proposal</span> ) :
			this.submitButtonState = ( <span> Generate <span className="mobile-hidden-text">&amp; Email</span> Proposal</span> );
		}
	}

	validateEmail(e) {
		var val = e.target.value;
		var target = "" + e.target.name + "";

		var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		var validEmail = re.test(val);
		var updatedState = Object.assign({}, this.state, {
			[target]: validEmail
		});

		this.setState(updatedState);
	}

	validateGeneral(e) {
		var val = e.target.value;
		var target = "" + e.target.name + "";

		var updatedState = Object.assign({}, this.state, {
			[target]: val ? true : false
		});

		this.setState(updatedState);
	}

	showSavedSponsors(e) {
		const { showSaved, toggleFindSponsor } = this.props;

		toggleFindSponsor();
		showSaved();
	}

	showFindSponsors(e) {
		const { showFinderView, toggleFindSponsor } = this.props;

		toggleFindSponsor();
		showFinderView();
	}

	formSubmission(evt) {
		evt.preventDefault();
		this.setState({ btnState: 'loading' });

		let { submitProposalInfo, form, packageParam, submitEmailInfo, packages } = this.props;
		let formState = this.state,
			validationArr = [];

		// Getting the Package Details to find out what options were selected in Step 1 and the
		// configuration that they were set in.
		var packDetails = packages.filter(( p ) => p.packageName == packageParam )[0]
						  .packageOptions.filter((detail, i) => { if( detail.selected ) return detail; });

		// Values Pulled by Reference to be added in the formResults. Not Taken from the state.
		var email 						= form == 'email-proposal' ? 'email-proposal' : 'proposal',
			organizationName 			= ReactDOM.findDOMNode(this.refs.organizationName).value,
			numberOfAthletes 			= ReactDOM.findDOMNode(this.refs.athleteNumber).value,
			city						= ReactDOM.findDOMNode(this.refs.cityInput).value,
			state						= ReactDOM.findDOMNode(this.refs.stateSelect).value,
			contactFirstName			= ReactDOM.findDOMNode(this.refs.firstName).value,
			contactLastName				= ReactDOM.findDOMNode(this.refs.lastName).value,
			contactEmail				= ReactDOM.findDOMNode(this.refs.emailInput).value,
			contactPhone				= ReactDOM.findDOMNode(this.refs.phoneInput).value,
			contactTitle				= ReactDOM.findDOMNode(this.refs.titleInput).value,
			formResults					= {};

		// Form Results Object contains all the Values to be submitted to the PDF creation or Email Scripts.
		formResults = Object.assign({}, formResults, {
			city,
			contactEmail,
			contactFirstName,
			contactLastName,
			contactPhone,
			numberOfAthletes,
			organizationName,
			contactTitle,
			state,
			selectedPackage: email,
			package: packageParam,
			packDetails
		});

		// If this is an Email form then give the formResults the additional 2 Properties it needs for submission
		if ( email == 'email-proposal' ) {
			var sponsorEmail			= ReactDOM.findDOMNode(this.refs.sponsorEmail).value,
				sponsorName				= ReactDOM.findDOMNode(this.refs.sponsorName).value;
			formResults = Object.assign({}, formResults, {
				sponsorEmail,
				sponsorName
			});
		}

		// Iderates over the State OBJECT properties and puts all the values
		// in an array to be checked later. isValidated and validate are set to
		// true to remove undefined values from the Array. They Aren't being validated against
		// so it doesn't matter if they are true
		validationArr = Object.keys(formState).map(function(key, index) {
			if ( key == "isValidated" || key == "validate" ) return true;
		   	return formState[key];
		});

		if ( validationArr.includes(false) || validationArr.includes(null) ) {
			// FORM IS INVALID
			// If the Validation Array contains any values other than false, then set Validate
			// prop to true in the state and so that when it re-renders, error class will be checked and
			// added.
			let updatedState = Object.assign({}, this.state, {
				validate: true
			});
			this.setState(updatedState);
		} else {
			//FORM IS VALID
			//If the validation Array contains only true values, then bypass setting anything in
			//state and follow through with the form submission
			switch(email){
				case "email-proposal":
					return submitEmailInfo( formResults );
				default:
					return submitProposalInfo( formResults );
			}
		}
	}

	render(){
		var email = 'email-proposal';
		let { toggleFindSponsor, showSaved, finderPopUpVisibility, togglePopUp } = this.props;

		let emailFormSection = this.props.form == email ?
								( <div>
									<div className="form-heading-wrapper">
										<h3>Send proposal to potential sponsors </h3>
										<div className="form-heading-link-wrapper">
											<a onClick={ this.showFindSponsors } className="link">Find Sponsors  </a>
											<span>|</span>
											<a onClick={ this.showSavedSponsors } className="link"> My Sponsors </a>
										</div>
									</div>
									<div className="form-section email">
										<div className="form-row input-section">
											<div className={"field-wrapper left-field sponsor-name " +
													( this.state.validate &&
															( !this.state.sponsorName ||
															  this.state.sponsorName == null
															) ? 'error' : '' ) }>
												<label htmlFor="sponsor-name">Sponsor Name</label>
												<input
													id="sponsor-name"
													ref="sponsorName"
													type="text"
													className="package-input"
													name="sponsorName" />
											</div>
											<div className={"field-wrapper right-field sponsor-email " +
													( this.state.validate &&
														( !this.state.sponsorEmail ||
														  this.state.sponsorEmail == null
														) ? 'error' : '' ) }>
												<label htmlFor="sponsor-email">Sponsor Email Address</label>
												<input
													id="sponsor-email"
													ref="sponsorEmail"
													type="text"
													className="package-input"
													name="sponsorEmail" />
											</div>
										</div>
									</div>
								</div> ) : null;

		return (
			<div className="container step-container proposal-form">
				<div className="form-heading-wrapper">
					<h3>Customize your proposal</h3>
					<p className="intro">Tell us a little more about your organization and we&rsquo;ll use it to create a customized proposal letter that you can send to potential sponsors in your area.</p>
				</div>
				<form>
					<div className="form-section">
						<div className="form-row input-section">
							<div className={ 'field-wrapper left-field organization-input ' +
									( this.state.validate &&
										( !this.state.organizationName ||
										  this.state.organizationName == null
										) ? 'error' : '' ) } >
								<label htmlFor="organization-name">Organization Name</label>
								<input
									id="organization-name"
									ref="organizationName"
									onBlur={this.validateGeneral}
									type="text"
									className="package-input"
									name="organizationName" />
								<span className="error-message">Error: add organization name</span>
							</div>
							<div className={"field-wrapper right-field athlete-input " +
									( this.state.validate &&
										( !this.state.numberOfAthletes ||
										  this.state.numberOfAthletes == null
										) ? 'error' : '' ) } >
								<label htmlFor="athlete-number">Number of Athletes</label>
								<input
									id="athlete-number"
									ref="athleteNumber"
									onBlur={this.validateGeneral}
									type="number"
									className="package-input"
									name="numberOfAthletes" />
								<span className="error-message">Error: add number of athletes</span>
							</div>
						</div>
						<div className="form-row input-section">
							<div className={"field-wrapper left-field city-input " +
									( this.state.validate &&
										( !this.state.city ||
										  this.state.city == null
										) ? 'error' : '' ) }>
								<label htmlFor="city-input">City</label>
								<input
									id="city-input"
									ref="cityInput"
									onBlur={this.validateGeneral}
									type="text"
									className="package-input"
									name="city" />
								<span className="error-message">Error: add city</span>
							</div>
							<div className={"field-wrapper right-field state-select " + ( this.state.validate &&
										( !this.state.state ||
										  this.state.state == 'error'
										) ? 'error' : '' )}>
								<label htmlFor="state-select">State / Province</label>
								<select
									id="state-select"
									ref="stateSelect"
									onBlur={this.validateGeneral}
									className="package-input"
									name="state" >
									<option value="error">Select</option>
									<option value="AL">Alabama</option>
									<option value="AK">Alaska</option>
									<option value="AZ">Arizona</option>
									<option value="AR">Arkansas</option>
									<option value="CA">California</option>
									<option value="CO">Colorado</option>
									<option value="CT">Connecticut</option>
									<option value="DE">Delaware</option>
									<option value="DC">District Of Columbia</option>
									<option value="FL">Florida</option>
									<option value="GA">Georgia</option>
									<option value="HI">Hawaii</option>
									<option value="ID">Idaho</option>
									<option value="IL">Illinois</option>
									<option value="IN">Indiana</option>
									<option value="IA">Iowa</option>
									<option value="KS">Kansas</option>
									<option value="KY">Kentucky</option>
									<option value="LA">Louisiana</option>
									<option value="ME">Maine</option>
									<option value="MD">Maryland</option>
									<option value="MA">Massachusetts</option>
									<option value="MI">Michigan</option>
									<option value="MN">Minnesota</option>
									<option value="MS">Mississippi</option>
									<option value="MO">Missouri</option>
									<option value="MT">Montana</option>
									<option value="NE">Nebraska</option>
									<option value="NV">Nevada</option>
									<option value="NH">New Hampshire</option>
									<option value="NJ">New Jersey</option>
									<option value="NM">New Mexico</option>
									<option value="NY">New York</option>
									<option value="NC">North Carolina</option>
									<option value="ND">North Dakota</option>
									<option value="OH">Ohio</option>
									<option value="OK">Oklahoma</option>
									<option value="OR">Oregon</option>
									<option value="PA">Pennsylvania</option>
									<option value="RI">Rhode Island</option>
									<option value="SC">South Carolina</option>
									<option value="SD">South Dakota</option>
									<option value="TN">Tennessee</option>
									<option value="TX">Texas</option>
									<option value="UT">Utah</option>
									<option value="VT">Vermont</option>
									<option value="VA">Virginia</option>
									<option value="WA">Washington</option>
									<option value="WV">West Virginia</option>
									<option value="WI">Wisconsin</option>
									<option value="WY">Wyoming</option>
									<option value="error" disabled>Provinces ---</option>
									<option value="AB">Alberta</option>
									<option value="AB">Alberta</option>
									<option value="BC">British Columbia</option>
									<option value="MB">Manitoba</option>
									<option value="NB">New Brunswick</option>
									<option value="NL">Newfoundland and Labrador</option>
									<option value="NS">Nova Scotia</option>
									<option value="ON">Ontario</option>
									<option value="PE">Prince Edward Island</option>
									<option value="QC">Quebec</option>
									<option value="SK">Saskatchewan</option>
									<option value="NT">Northwest Territories</option>
									<option value="NU">Nunavut</option>
									<option value="YT">Yukon</option>
								</select>
								<span className="error-message">Error: add state</span>
							</div>
						</div>
					</div>
					<div className="form-section">
						<div className="form-row input-section">
							<div className={"field-wrapper left-field first-name-input " +
									( this.state.validate &&
										( !this.state.contactFirstName ||
										  this.state.contactFirstName == null
										) ? 'error' : '' ) } >
								<label htmlFor="first-name">Contact First Name</label>
								<input
									id="first-name"
									ref="firstName"
									onBlur={this.validateGeneral}
									type="text"
									className="package-input"
									name="contactFirstName" />
								<span className="error-message">Error: add first name</span>
							</div>
							<div className={"field-wrapper right-field last-name-input " +
									( this.state.validate &&
										( !this.state.contactLastName ||
										  this.state.contactLastName == null
										) ? 'error' : '' ) } >
								<label htmlFor="last-name">Contact Last Name</label>
								<input
									id="last-name"
									ref="lastName"
									onBlur={this.validateGeneral}
									type="text"
									className="package-input"
									name="contactLastName" />
								<span className="error-message">Error: add last name</span>
							</div>
						</div>
						<div className="container input-section">
							<div className={"field-wrapper left-field email-input " +
								 	( this.state.validate &&
										( !this.state.contactEmail ||
										  this.state.contactEmail == null
										) ? 'error' : '' ) } >
								<label htmlFor="email-input">Contact Email Address</label>
								<input
									id="email-input"
									ref="emailInput"
									onBlur={this.validateEmail}
									type="text"
									className="package-input"
									name="contactEmail" />
								<span className="error-message">Error: add valid email address</span>
							</div>
							<div className={"field-wrapper right-field phone-input " +
									( this.state.validate &&
										( !this.state.contactPhone ||
										  this.state.contactPhone == null
										) ? 'error' : '' ) } >
								<label htmlFor="phone-input">Contact Phone</label>
								<input
									id="phone-input"
									ref="phoneInput"
									onBlur={this.validateGeneral}
									type="text"
									className="package-input"
									name="contactPhone" />
								<span className="error-message">Error: add phone number</span>
							</div>
						</div>
						<div className="container input-section">
							<div className={"field-wrapper left-field email-input " +
									( this.state.validate &&
										( !this.state.contactTitle ||
										  this.state.contactTitle == null
										) ? 'error' : '' ) } >
								<label htmlFor="title-input">Contact Title</label>
								<input
									id="title-input"
									ref="titleInput"
									onBlur={this.validateGeneral}
									type="text"
									className="package-input"
									name="contactTitle" />
								<span className="error-message">Error: add contact title</span>
							</div>
						</div>
					</div>
					{ emailFormSection }
					<div className="field-wrapper button-wrapper">
						<button className="full-width" onClick={ (e) => this.formSubmission(e) } >
							<span className="icon-file-small"></span>
							{this.submitButtonState}
						</button>
					</div>
				</form>
				<MarketoGhostForm ID={ getForm('Proposal') }/>
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ProposalForm);
