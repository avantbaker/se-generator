import React from 'react';
import { connect } from 'react-redux';
import { showModal, closeModal } from '../actions';



class ModalContent extends React.Component {

 	render(){
 		let activePackage = this.props.active;

 		if (activePackage == 'Website'){
 			return (
 				<div className="whats-this-modal-content">
 					<div className="modal-text-wrapper">
 						<div className="modal-hero"><img src="images/display-graphic_modal-website.png" alt="Monetize your site" /></div>
						<h3>Monetize your site</h3>
						<p>Select the type(s) of ad you’d like to offer potential sponsors on your website, then create a customized proposal letter to send them.</p>
					</div>
				</div>

 				)
 		} else if (activePackage =='Email') {
 			return (
 				<div className="whats-this-modal-content">
 					<div className="modal-text-wrapper">
 					<div className="modal-hero"><img src="images/display-graphic_modal-email.png" alt="Monetize your inbox" /></div>
						<h3>Monetize your inbox</h3>
						<p>Select the type(s) of ad you’d like to offer potential sponsors in your emails, then create a customized proposal letter to send them.</p>
					</div>
				</div>

 				)
 		} else {
			return (
				<div className="whats-this-modal-content">
					<div className="modal-text-wrapper">
					<div className="modal-hero"><img src="images/display-graphic_modal-registration.png" alt="Monetize your sign-ups" /></div>
						<h3>Monetize your sign-ups</h3>
						<p>Select the type(s) of ad you’d like to offer potential sponsors on your website, then create a customized proposal letter to send them.</p>
					</div>
				</div>
			);
		}
	}

}

export default ModalContent;
