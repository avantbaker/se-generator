import React from 'react';



const Header = (props) => {
	return(
		<header className="header-wrapper">
			<section className="masthead-section">
				<div className="container masthead-container">
					<img className="se-sponsor-logo" src="images/se-logo_horz-full-white.svg" alt="SportsEngine" />
				</div>
			</section>
			<section className="hero-section">
				<div className="hero-image"></div>
				<div className="hero-content">
					<div className="container hero-content-outer">
						<div className="hero-content-inner">
							<h1>Engage Sponsors. Earn Revenue.</h1>
							<p className="intro"><span className="mobile-hero-text">Win together. In addition to generating revenue to cover costs, adding sponsorships to your organization&rsquo;s digital properties builds relationships between your members and local businesses.</span><span className="desktop-hero-text">Everybody wins when we work together. By adding sponsorship opportunities to your organization&rsquo;s digital properties, you can give your members and local businesses the opportunity to engage and support one another. In turn, your organization can earn valuable revenue to help cover the season&rsquo;s costs.</span></p>
						</div>
					</div>
				</div>
			</section>
		</header>
	);
}

export default Header;
