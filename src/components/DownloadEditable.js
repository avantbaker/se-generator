import React from 'react';

function marketoSub(evt) {
	Munchkin.munchkinFunction('clickLink',{href: 'sponsorship-app/started-building-proposal'});
	ga('send', 'event', 'Sponsorship', window.location.pathname, 'Download Template: ' + this.to.slice(10));
	console.log('eventTrack: ' + 'Download Template: ' + this.to.slice(10) + ' + Marketo Email' );
}

/* Download Editable Links in Download Section of Package Builder */
const DownloadEditable = () => {
	return (
			<div className="download-item-wrapper">
				<div className="download-description-wrapper">
					<span className="download-symbol icon-edit-big"></span>
					<div className="download-description">
						<h4>Create Your Own Proposal</h4>
						<p className="smaller">Select this option to write and download your own personalized proposal.</p>
					</div>
				</div>

				<div className="download-btns-wrapper editable">
					<a 
						href="/docs/sponsorship-proposal-letter.docx" 
						download 
						className="button download-button no-max-width editable-btn"
						onClick={ marketoSub }>
						<span className="icon-download-small"></span>Download</a>
				</div>

			</div>
		);
}

export default DownloadEditable;
