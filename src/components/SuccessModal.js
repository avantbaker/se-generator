import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { showModal, closeModal } from '../actions';

import ModalContentSuccess from './ModalContentSuccess';



const mapDispatchToProps = dispatch => ({
	showModal: (str, modal) => dispatch(showModal(str, modal)),
	closeModal: () => dispatch(closeModal()),
	togglePopUp: () => dispatch(togglePopUp())
});

class SuccessModal extends React.Component {

	componentDidMount() {
		document.body.classList.add('no-scroll');
		document.getElementById('html').classList.add('no-scroll');
		//var offsetY = window.pageYOffset;
		var offsetY = 800;
		document.body.setAttribute('style', `top: ${-offsetY}px;`);
	}

	componentWillUnmount(){
		document.body.classList.remove('no-scroll');
		document.getElementById('html').classList.remove('no-scroll');
		window.scrollTo(0, 800);

	}

 	render(){
 		let shut = this.props.shut;

		return (
			<div className="whats-this-modal-wrapper" onClick={() => shut()}>
				<div className="modal-outer-centered">
					<div className="modal-inner-centered">
						<div className="modal-container dialog-modal">

							<div className="modal-content-wrapper">
								<ModalContentSuccess sponsorEmail={this.props.email} />
							</div>

							<div className="modal-close">
								<span className="icon-close-big" onClick={() => shut()}></span>
							</div>
						</div>
					</div>

				</div>

			</div>
		);
	}
}

export default connect(null, mapDispatchToProps)(SuccessModal);
