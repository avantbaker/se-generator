import React from 'react';

const Slide = ({ info }) => {
	
	return(
			<div className="container cs-slide-container">

				<div className="flex-row cs-slide-content">

					<div className="flex-col flex-one-third middle-xs cs-earns-col">
						<div className="cs-earns-wrapper">
							<div className="cs-earns-number">
								<p className="earns-text">Earns</p>
								<p className="dollar-text">{info.earning}<span className="dollar-suffix">/yr</span></p>
							</div>
							<div className="cs-org-logo">
								<img src={info.image} alt="Organization Name" />
							</div>
						</div>
					</div>

					<div className="flex-col flex-two-thirds middle-xs cs-story-col">
						<h3>{ info.heading }</h3>
						<p>{ info.paragraph }</p>
					</div>

				</div>
			</div>
	);
}

export default Slide;
