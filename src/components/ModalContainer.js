import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import WhatsThisModal from './WhatsThisModal';
import ExamplePdfModal from './ExampleProposalModal';
import ExampleEmailModal from './ExampleEmailModal';
import SuccessModal from './SuccessModal';
import { showModal, closeModal, togglePopUp } from '../actions';
import { connect } from 'react-redux';

const mapStateToProps = ({ packages, whatsThisModal, proposalForm }) => ({
	packages, whatsThisModal, proposalForm
});

const mapDispatchToProps = dispatch => ({
	showModal: (str, modal) => dispatch(showModal(str, modal)),
	closeModal: () => dispatch(closeModal()),
	togglePopUp: () => dispatch(togglePopUp())
});

class ModalContainer extends React.Component {
	constructor(props){
		super(props);
	}
	render(){
		let { whatsThisModal, showModal, closeModal, proposalForm} = this.props;
		let { modal } = whatsThisModal;

		if ( modal == null) {
			return;

		} else if ( modal == 'main' ) {
			return (
				<WhatsThisModal active={whatsThisModal.package} shut={closeModal} />
				);
		} else if ( modal == 'success' ) {
			return (
				<SuccessModal email={proposalForm.contactEmail} shut={closeModal} />
			);
		} else if ( modal == 'pdf' ){
			return (
				<ExamplePdfModal active={whatsThisModal.package} shut={closeModal} />
			);
		} else {
			return (
				<ExampleEmailModal active={whatsThisModal.package} shut={closeModal} />
			);
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalContainer);
