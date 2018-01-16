import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

function marketoSub(evt) {
	Munchkin.munchkinFunction('clickLink',{href: 'sponsorship-app/started-building-proposal'});
	ga('send', 'event', 'Sponsorship', window.location.pathname, 'Download PDF: ' + this.to.slice(10));
	console.log('eventTrack: ' + 'Download PDF: ' + this.to.slice(10) + ' + Marketo Email' );
}

/* Download Email Links in Download Section of Package Builder */
const DownloadPdf = ({ packageName, openModal, disable }) => {

	if ( packageName == 'Email' || packageName == 'Registration') {
			disable.length = 2;
		}

	return (
			<div className="download-item-wrapper">
				<div className="download-description-wrapper">
					<span className="download-symbol icon-file-pdf-big"></span>
					<div className="download-description">
						<h4>Use Our Proposal Template</h4>
						<p className="smaller">Select this option to generate a pre-written proposal that will be tailored to your organization.</p>
					</div>
				</div>

				<div className="download-btns-wrapper">
					<button className="green-outline no-max-width" onClick={() => openModal(packageName, 'pdf')}>See Example</button>
					<Link 
						to={ (disable.length < 1 ? `/packages/${packageName}` : `/packages/${packageName}/generate-proposal`) } 
						className={'button download-button no-max-width ' + (disable.length < 1 ? 'disabled' : 'enabled')} 
						disabled={disable.length < 1}
						onClick={ marketoSub }><span className="icon-file-small"></span>Generate</Link>
				</div>

			</div>
		);
}

export default DownloadPdf;
