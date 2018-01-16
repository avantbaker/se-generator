import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { showModal, closeModal } from '../actions';


import ModalContent from './ModalContent';

const mapDispatchToProps = dispatch => ({
	showModal: (str, modal) => dispatch(showModal(str, modal)),
	closeModal: () => dispatch(closeModal()),
	togglePopUp: () => dispatch(togglePopUp())
});

class WhatsThisModal extends React.Component {
	constructor(props){
		super();

		this.state = {
			active: props.active
		}

		this.handleUpdateEmail = this.handleUpdateEmail.bind(this);
		this.handleUpdateWeb = this.handleUpdateWeb.bind(this);
		this.handleUpdateReg = this.handleUpdateReg.bind(this);
	}

	handleUpdateWeb(evt){
		evt.stopPropagation();
		this.setState({active: 'Website'});

	}

	handleUpdateEmail(evt){
		evt.stopPropagation();
		this.setState({active: 'Email'});
	}

	handleUpdateReg(evt){
		evt.stopPropagation();
		let reg = "Registration";
		this.setState({active: reg });
	}

	componentDidMount() {
		document.body.classList.add('no-scroll');
		document.getElementById('html').classList.add('no-scroll');
		//var offsetY = window.pageYOffset;
		var offsetY = 400;
		document.body.setAttribute('style', `top: ${-offsetY}px;`);
	}

	componentWillUnmount(){
		document.body.classList.remove('no-scroll');
		document.getElementById('html').classList.remove('no-scroll');

		//var y = x.replace(/-/gi, '');
		//var pagePos = y.replace(/px/gi, '');

		window.scrollTo(0, 400);
	}

 	render(){
 		let shut = this.props.shut;
 		let activePackage = this.state.active;

		return (
			<div className="whats-this-modal-wrapper" onClick={() => shut()}>
				<div className="modal-outer-centered">
					<div className="modal-inner-centered">
						<div className="modal-container">
							<div className="modal-header">

									<a onClick={this.handleUpdateWeb} className={'symbol-bubble ' + ( activePackage == 'Website' ? 'active' : 'inactive')}>
										<span className="icon-website-big"></span>
									</a>
									<a onClick={this.handleUpdateEmail} className={'symbol-bubble ' + ( activePackage == 'Email' ? 'active' : 'inactive')}>
										<span className="icon-email-big"></span>
									</a>
									<a onClick={this.handleUpdateReg} className={'symbol-bubble ' + ( activePackage == 'Registration' ? 'active' : 'inactive')}>
										<span className="icon-registration"></span>
									</a>

							</div>

							<div className="modal-content-wrapper">

								<ModalContent active={this.state.active} />
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

export default connect(mapDispatchToProps)(WhatsThisModal);
