import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { showModal, closeModal } from '../actions';

const mapDispatchToProps = dispatch => ({
	showModal: (str, modal) => dispatch(showModal(str, modal)),
	closeModal: () => dispatch(closeModal()),
	togglePopUp: () => dispatch(togglePopUp())
});

class ExamplePdfModal extends React.Component {
	constructor(props){
		super();

		this.state = {
			active: props.active
		}
	}

	componentDidMount() {
		console.log("active state:", this.state.active);
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
 		let activePackage = this.state.active;

 		const active = activePackage.toLowerCase();

		return (
			<div className="whats-this-modal-wrapper" onClick={() => shut()}>
				<div className="modal-outer-centered">
					<div className="modal-inner-centered">
						<div className="modal-container example-modal">
							<div className="modal-content-wrapper">
								<div className="example-modal-content">
									<h3>Example PDF Proposal</h3>
									<p>"Generating" a proposal will create a ready-to-send professional 3 page PDF.</p>
									<a href={`/docs/se-${active}-pdf-proposal-example.pdf`} download className="button">Download Example</a>
								</div>
								<div className="example-modal-image">
									<img src="images/example-hero-pdf.png" alt="Sponsor Proposal Example" />
								</div>
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

export default connect(mapDispatchToProps)(ExamplePdfModal);
