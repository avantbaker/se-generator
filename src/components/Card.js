import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

function marketoSub(evt) {
	Munchkin.munchkinFunction('clickLink',{href: 'sponsorship-app/viewed-sponsorship-builder'});
	ga('send', 'event', 'Sponsorship', window.location.pathname, this.to.slice(10));
	console.log('eventTrack: ' + this.to.slice(10) + ' + Marketo Package' );
}

const Card = ({ info, openModal }) => {

		return (
			<div className="package-card-wrapper">

				<div className="package-card-image">
					<img src={`${info.packageImage}`} alt={`${info.packageImageDescription}`} />
				</div>

				<div className="package-card-text-wrapper">
					<h3>{ info.packageName } Sponsorships</h3>
					<p className="smaller">{ info.packageDescription }</p>
					<Link 
						to={ `/packages/${info.packageName}` } 
						className="button package-selector"
						onClick={ marketoSub }>Select</Link>
					<a className="package-learn-more-link" onClick={() => openModal(info.packageName, 'main') } >What&rsquo;s this?</a>
				</div>

				<div className="symbol-bubble package-card-icon">
					<span className={info.packageIcon}></span>
				</div>

			</div>

		);

};

export default Card;
