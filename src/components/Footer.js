import React from 'react';
import { connect } from 'react-redux';
import { toggleFindSponsor, toggleChat, togglePopUp } from '../actions';
import FindSponsor from './FindSponsor';
import Chat from './Chat';

const mapStateToProps = ({ finderPopUpVisibility }) => ({
	finderPopUpVisibility
});

const mapDispatchToProps = dispatch => ({
	toggleFindSponsor: () => dispatch(toggleFindSponsor()),
	toggleChat: () => dispatch(toggleChat()),
	togglePopUp: () => dispatch(togglePopUp())
});

class Footer extends React.Component {

	componentWillUpdate(nextProps, nextState) {
		let { toggleFindSponsor, toggleChat, finderPopUpVisibility, togglePopUp } = this.props;
	}

	render() {
		let { toggleFindSponsor, toggleChat, finderPopUpVisibility, togglePopUp } = this.props;
		let { activePopUp, visible } = finderPopUpVisibility;
		let showActive = ( activePopUp === "FIND_SPONSOR" ) ?
			( <FindSponsor /> ) :
			( <Chat /> );
		let displayPopUp = visible ? showActive : null;
		return (
			<footer className="footer">
				<div className="footer-main-container">
					<div className="footer-button" onClick={ togglePopUp }>
						<div className="footer-button-wrapper">
							<span className={'icon-dropdown-small ' + (displayPopUp ? 'animate' : 'initial')}></span>
						</div>
					</div>
					<div className="footer-section-wrapper">
						<div className="footer-section-content">
							<div className={'footer-section left ' + ( activePopUp === "FIND_SPONSOR" && displayPopUp ? 'active-section' : 'inactive-section')} onClick={ toggleFindSponsor }>
								<span className="footer-heading left"><span className="footer-symbol icon-location-big"></span> Find<span className="mobile-view"> Sponsors Near You</span></span>
							</div>
						</div>
						<div className="footer-section-content">
							<div className={'footer-section right ' + ( activePopUp === "CHAT" && displayPopUp ? 'active-section' : 'inactive-section')} onClick={ toggleChat }>
								<span className="footer-heading right"><span className="footer-symbol icon-chat-big"></span> Chat <span className="mobile-view">with a Sponsor Expert</span></span>
							</div>
						</div>
					</div>
				</div>
				<div className="footer-content-container">
					{ displayPopUp }
				</div>
			</footer>
		)
	}
};

export default connect( mapStateToProps, mapDispatchToProps )(Footer);
