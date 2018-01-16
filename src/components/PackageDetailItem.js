import React from 'react';
import ReactDOM from 'react-dom';
import { updateForm, toggleInput } from '../actions';
import { connect } from 'react-redux';

const mapDispatchToProps = dispatch => ({
	updateForm: (packageName, optionName, amount) => dispatch(updateForm(packageName, optionName, amount)),
	toggleInput: ( packageName, optionName, selected ) => dispatch( toggleInput( packageName, optionName, selected ) )
});


class PackageDetailItem extends React.Component {

	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
		this.enableInput = this.enableInput.bind(this);
	}

	componentWillMount(){
		let { detail, currentPackage } = this.props;

		if ( currentPackage == 'Email' || currentPackage == 'Registration') {
			detail.selected = true;
		}
	}

	handleChange(event){
		let { updateForm, detail, currentPackage } = this.props;
		let option = detail.name;
		var amount = ReactDOM.findDOMNode(this.refs.amount).value;
		updateForm( currentPackage, option, amount);
	}

	enableInput(evt) {
		let { toggleInput, detail, currentPackage } = this.props;
		let option = detail.name;
		var selected = ReactDOM.findDOMNode(this.refs.selected).value == "false" ? true : false;
		toggleInput( currentPackage, option, selected );
	}

	render(){
		let { detail } = this.props;
		return (
			<div className="package-detail-item">
				<div className="detail-name">
					<div className="detail-name-wrapper">
						<div className="field-wrapper checkbox detail-name-container">
							<input ref="selected" type="radio" onChange={ this.enableInput } value={detail.selected} checked={detail.selected} />
							<div className="detail-name-text">
								<h4 className={(!detail.selected ? 'disabled' : 'enabled')}> {detail.name} </h4>
								{ detail.details.map((desc, i) => {
									return ( <p key={i} className={'smaller detail-description ' + (!detail.selected ? 'disabled' : 'enabled')}> { desc } </p> );
								  }) }
							  </div>
						</div>
					</div>
				</div>
				<div className="detail-options">
					<div className="detail-options-wrapper">
						<div className="detail-options-content">
							<span className={(!detail.selected ? 'disabled' : 'enabled')}>$</span>
							<input className="package-input amount-input" disabled={ !detail.selected } onChange={ this.handleChange } value={ detail.amount} ref="amount" type="number"/>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default connect( null, mapDispatchToProps )(PackageDetailItem);

