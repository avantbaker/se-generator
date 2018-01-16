import React from 'react';


/* component that renders an ad visualization dynamically based on which
	package is currently selected */

const PackageAdVisualization = ({ currentPackage, selectedItems }) => {


	if (currentPackage == 'Website') {
		return (
			<div className="ad-display">
					<div className={'box banner-ad ' + (selectedItems[0] == true ? 'active' : 'inactive')}></div>
					<div className={'box cta-ad one ' + (selectedItems[1] == true ? 'active' : 'inactive')}></div>
					<div className="box cta-ad two"></div>
					<div className="box cta-ad three"></div>
					<div className={'box sidebar-ad ' + (selectedItems[2] == true ? 'active' : 'inactive')}></div>
			</div>
			)
	} else if (currentPackage == 'Email') {
		return (
			<div className="email-display">
				<img src="images/display-graphic_email.png" alt="Email sponsor package" />
			</div>
		)

	} else {
		return (
			<div className="registration-display">
				<img src="images/display-graphic_registration.png" alt="Registration sponsor package" />
			</div>
		)
	}

}

export default PackageAdVisualization;
