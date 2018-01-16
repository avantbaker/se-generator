import React from 'react';
import Header from './Header';
import SimpleSlider from './Slider';
import Footer from './Footer';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import ModalContainer from './ModalContainer';

import { showModal, closeModal, togglePopUp } from '../actions';
import { connect } from 'react-redux';


const mapStateToProps = ({ packages, whatsThisModal }) => ({
	packages, whatsThisModal
});

const mapDispatchToProps = dispatch => ({
	togglePopUp: () => dispatch(togglePopUp())
});

class App extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			animated: false
		}

		this.animateShare = this.animateShare.bind(this);
		this.closeFooter = this.closeFooter.bind(this);
		this.shareFacebook = this.shareFacebook.bind(this);
	}

	animateShare() {
		this.setState({animated: !this.state.animated});
	}

	closeFooter() {
		let { togglePopUp } = this.props;
		document.body.classList.remove('display-overlay');

		togglePopUp();
	}

	shareFacebook(evt) {
		evt.preventDefault();
		window.open("https://www.facebook.com/dialog/share?app_id=1723712627941552&display=iframe&href=http%3A%2F%2Finspire.sportsengine.com&redirect_uri=http%3A%2F%2Finspire.sportsengine.com&picture=http%3A%2F%2Finspire.sportsengine.com%2Fimages%2Fse-sponsor-og-image.jpg&name=%20Engage%20Sponsors.%20Earn%20Revenue.&amp;description=Everybody%20wins%20when%20we%20work%20together.%20By%20adding%20sponsorship%20opportunities%20to%20your%20organization's%20digital%20properties,%20you%20can%20give%20your%20sports.&amp;caption=SportsEngine%20", 'Share', 'height=450, width=650');

	}

	render(){
		let props = this.props;
		let { showModal, closeModal, whatsThisModal, togglePopUp } = this.props;
		let { visible } = whatsThisModal;
		let displayModal = visible ? ( <ModalContainer /> ) : null;
		const page = props.location.pathname.substr(1);

		return (
			<div className="app">
				<Header />
				<ReactCSSTransitionGroup
			        transitionName="fade"
			        transitionEnterTimeout={400}
			        transitionLeaveTimeout={300}
			     >
	          		{React.cloneElement( props.children, {key: page})}
	        	</ReactCSSTransitionGroup>
				<SimpleSlider />
				<Footer />
				{ displayModal }

				<div onClick={ this.closeFooter } className="content-overlay"></div>

				<div className="sponsor-share-wrapper">
					<div className="sponsor-share-inner">
						<div className={'sponsor-share-link twitter ' + (this.state.animated == true ? 'share-active' : 'share-inactive')}>
							<a className="symbol-bubble smaller twitter" target="_blank" href="https://twitter.com/intent/tweet?text=Engage%20Sponsors.%20Earn%20Revenue.%20Everybody%20wins%20when%20we%20work%20together.%3A%20http%3A%2F%2Finspire.sportsengine.com">
								<span className="icon-twitter"></span>
							</a>
						</div>

						<div className={'sponsor-share-link facebook ' + (this.state.animated == true ? 'share-active' : 'share-inactive')}>
							<a onClick={ this.shareFacebook } href="#" className="symbol-bubble smaller facebook">
								<span className="icon-facebook"></span>
							</a>
						</div>

						<div className="sponsor-share-link share" onClick={this.animateShare}>
							<div className="symbol-bubble smaller share">
								<span className={(this.state.animated == true ? 'icon-close-big close-symbol' : 'icon-share2 share-symbol') }></span>
							</div>
							<span className="share-text">Share</span>
						</div>
					</div>

				</div>
			</div>
		)
	}

}

export default connect(mapStateToProps, mapDispatchToProps)(App);
