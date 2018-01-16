import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { showModal, closeModal } from '../actions';

import PackageDetailItem from './PackageDetailItem';
import BillingFrequencySelect from './BillingFrequencySelect';
import PackageAdVisualization from './PackageAdVisualization';

import DownloadEditable from './DownloadEditable';
import DownloadPdf from './DownloadPdf';
import DownloadEmail from './DownloadEmail';

import MarketoGhostForm from './MarketoGhostForm';

import { getForm } from '../helperFunctions';

const mapStateToProps = ({ packages }, { params: { packageName } }) => ({
	pack: packages.filter(( p ) => p.packageName == packageName )[0]
});

const mapDispatchToProps = dispatch => ({
	showModal: (str, modal) => dispatch(showModal(str, modal)),
	closeModal: () => dispatch(closeModal())
});

class PackageDetails extends React.Component {
	constructor(props) {
		super(props);
	}

	componentWillUpdate(){
		let { pack } = this.props;
		const selectedItems = this.selectedItems;
		const packageDetailsItems = this.packageDetailsItems;
		let totalRevenue = this.totalRevenue;

		this.selectedItems = pack.packageOptions.map(function(detail, i) {
			return detail.selected
		});

		this.packageDetailsItems = pack.packageOptions.map(function(detail, i) {
			return <PackageDetailItem key={i} detail={detail} currentPackage={pack.packageName} />;
		});

		this.totalRevenue = pack.packageOptions.map(function(detail, i){
			/* if the package is selected, return the amount string as a number */
			if(detail.selected == true) {
				return parseInt(detail.amount);
			} else {
				return null;
			}
		});
	}

	render(){
		let { pack, showModal, closeModal } = this.props;
		let packageDetailsItems = this.packageDetailsItems;
		let selectedArray = [];
		let selectedItems = this.selectedItems;

		/*  maps through application state and returns the package options for the current package */
		 packageDetailsItems = pack.packageOptions.map(function(detail, i) {
		 	return <PackageDetailItem key={i} detail={detail} currentPackage={pack.packageName} />;
		 });

		/* returns the packages options that have been checked on each render */
		 selectedItems = pack.packageOptions.map(function(detail, i) {
			return detail.selected;
		 });

		/* functions to find the total annual revenue of the current package */
		let totalRevenue = pack.packageOptions.map(function(detail, i){
			/* if the package is selected, return the amount string as a number */
			if(detail.selected == true) {
				selectedArray.push(detail.selected);
				return parseInt(detail.amount);
			} else {
				return null;
			}
		});

		/* add each package option */
		var sumUpdate = totalRevenue.reduce(function(a, b) {
			  return a + b;
			}, 0);

		/* multiply the revenue by the billing frequency */
		var billingFrequency = pack.billingFrequency;

		if ( billingFrequency == "Monthly") {
			 sumUpdate = sumUpdate * 12
		} else if (billingFrequency == "Quarterly") {
			 sumUpdate = sumUpdate * 4
		} else if (billingFrequency == "Annually") {
			sumUpdate
		}
		//change heading for email sponsorship package
		const packageDetailHeading = pack.packageName == "Email" ? 'An' : 'A';

		return(
			<div className="package-details-view">
				<div className="detail-header">
					<div className="all-packages-link">
						<Link to={"/packages"}>Sponsorship Options</Link>
					</div>
					<div className="all-packages-heading-wrapper">
						<span className={pack.packageIcon}></span>
						<h2 className="alternate-uppercase"> Build  {packageDetailHeading} { pack.packageName } Sponsorship</h2>
					</div>
				</div>
				<div className="container step-container step-1">

					<div className="container downloads-section-heading">
						<h5 className="step-number"><span>Step 1</span></h5>
						<h3>Select and Customize Ad Offerings</h3>
					</div>

					<div className="container">

						<div className="ad-listing-wrapper">
							<form className="secondary-pacakage-select-wrapper">
								<BillingFrequencySelect currentPackage={pack.packageName} />
							</form>
							<form className="main-package-select-wrapper">
								{packageDetailsItems}
							</form>
						</div>

						<div className="ad-visualization-wrapper">

							<PackageAdVisualization selectedItems={selectedItems} currentPackage={pack.packageName}/>

							<div className="ad-revenue-display">

								<div className="revenue-display">
									<h6><span className="mobile-hidden-text">Possible </span>Revenue</h6>
									<div className="total-revenue">
										<span className="dollar-sign">$</span>
										<span className="revenue">{sumUpdate || 0}</span>
										<span className="year-sign">/yr</span>
									</div>
								</div>
							</div>
						</div>

					</div>
				</div>
				<div className="step-container step-2">

					<div className="container downloads-section-heading">
						<h5 className="step-number"><span>Step 2</span></h5>
						<h3>Proposal Generator</h3>
						<div className="download-heading-description">
							<p>Create a proposal letter that you can print or email directly to potential sponsors.</p>
						</div>
					</div>
					<DownloadEditable packageName={ pack.packageName } />
					<DownloadPdf disable={selectedArray} proposal='pdf' packageName={ pack.packageName } openModal={showModal} />
					<DownloadEmail disable={selectedArray} proposal='email' packageName={ pack.packageName } openModal={showModal} />
				</div>
				<MarketoGhostForm ID={ getForm(pack.packageName) }/>
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps )(PackageDetails);



