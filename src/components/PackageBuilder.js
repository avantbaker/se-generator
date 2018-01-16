import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const PackageBuilder = (props) => {
	const page = props.location.pathname.substr(1);
	return(
		<section className="package-builder-section">
			<div className="container package-builder-container">
				<ReactCSSTransitionGroup
			        transitionName="fade"
			        transitionEnterTimeout={500}
			        transitionLeaveTimeout={1}
			     >
	          		{React.cloneElement( props.children, {key: page})}
	        	</ReactCSSTransitionGroup>
			</div>
		</section>
	);
}

export default PackageBuilder;
