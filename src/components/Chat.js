import React from 'react';

class Chat extends React.Component {

	componentDidMount() {
		//separate add class calls for IE support
		document.body.classList.add('no-scroll');
		document.body.classList.add('display-overlay');
		document.getElementById('html').classList.add('no-scroll');
	}

	shouldComponentUpdate() {
 		return false;
	}

	componentWillUnmount(){
		//separate add class calls for IE support
		document.body.classList.remove('no-scroll');
		document.body.classList.remove('display-overlay');
		document.getElementById('html').classList.remove('no-scroll');
	}

	render(){

		return (
			<div className="chat-wrapper">
				<div className="chat-content">
					<div className="container no-max-width chat-form-wrapper">
						<div className="col two-thirds form-column">
							<h3>Schedule time with our experts</h3>
							<p>Tell us a little about you and we&rsquo;ll be in touch to help answer your sponsorship questions.</p>
							<iframe src="https://at.sportsengine.com/Sponsorship-App_Sponsorship-App-Chat-Form-Page.html" width="100%" type="text/html" frameborder="0" scrolling="no" allowtransparency="true"></iframe>
						</div>

						<div className="col one-third phone-wrapper">
							<h3>Want help right away?</h3>
							<p className="intro">Call us 1-866-111-2334.</p>
						</div>

					</div>
				</div>
			</div>
		);
	}
}

export default Chat;
