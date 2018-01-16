import React from 'react';
import { connect } from 'react-redux';
import { showModal, closeModal } from '../actions';
import { getUUID } from '../localStorage';

const mapStateToProps = ({ emailForm, currentProposalForm }) => ({
	emailForm,
	currentProposalForm
});

class ModalContentSuccess extends React.Component {

 	render(){
 		const currentProposalForm = this.props.currentProposalForm;
 		var url = "http://inspire.sportsengine.com/mpdf/tmp/" + getUUID() + "-proposalEmail.pdf";

 		if (currentProposalForm.currentForm == 'generate-proposal'){
 			return (
 				<div className="whats-this-modal-content">
 					<div className="modal-text-wrapper">
						<h4>Your download has started</h4>
						<p>Don't see it? <a href={url}>Click Here</a></p>
						<a className="button" href="#">Build another Proposal</a>
					</div>
				</div>

 				)
 		} else if (currentProposalForm.currentForm == 'email-proposal') {
 			let { emailForm: { sponsorEmail } } = this.props;

 			return (
 				<div className="whats-this-modal-content">
 					<div className="modal-text-wrapper">
						<h4>Your proposal is off!</h4>
						<p>An email has been sent to <a href={url}>{ sponsorEmail }</a></p>
						<a className="button" href="#">Build another Proposal</a>
					</div>
				</div>
 				)

		} else {
			return (
				<div>
					<p>there has been an error</p>
				</div>
			)
		}
	}
}

export default connect(mapStateToProps)(ModalContentSuccess);
