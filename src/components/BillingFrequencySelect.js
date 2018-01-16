import React from 'react';
import ReactDOM from 'react-dom';
import { updateFrequency } from '../actions';
import { connect } from 'react-redux';

const mapDispatchToProps = dispatch => ({
	updateFrequency: (packageName, frequency ) => dispatch(updateFrequency(packageName, frequency ))
});

class BillingFrequencySelect extends React.Component {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(evt){
		evt.preventDefault();
		let { updateFrequency, currentPackage } = this.props;
		let frequency = ReactDOM.findDOMNode(this.refs.adOffFrequency).value;
		updateFrequency( currentPackage, frequency);

	}

	render(){
		/* component updates state based on the billing frequency option chosen in select below */

		return (
			<div className="billing-frequency-wrapper">
				<div className="billing-description">
					<h4>I want to bill...</h4>
					<p className="smaller detail-description"> Select billing frequency </p>

				</div>

				<div className="billing-input-wrapper">
					<select className="package-input ad-offering-frequency-select" onChange={this.handleChange} ref="adOffFrequency">
							<option value="Monthly">Monthly</option>
							<option value="Quarterly">Quarterly</option>
							<option value="Annually">Annually</option>
					</select>
				</div>
			</div>
		);
	}
}

export default connect( null, mapDispatchToProps )(BillingFrequencySelect);
