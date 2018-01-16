import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import ProposalForm from './ProposalForm';

const mapStateToProps = ( props, {params: {packageName, proposal } }) => ({
	packageName,
	proposal
});

const ProposalFormContainer = ({ packageName, proposal }) => {
	var email = 'email-proposal';
	let proposalHeading = proposal == email ?
		(<span><span className="heading-symbol icon-email-big-alternate"></span> Email Sponsorship Proposal</span>) :
		(<span><span className="heading-symbol icon-file-pdf-big"></span> Generate {packageName} Sponsorship Proposal</span>);

	return (
		<div className="package-details-view proposal-form">
			<div className="detail-header">
				<div className="all-packages-link">
					<Link to={`/packages/${packageName}`}>Back</Link>
				</div>
				<h6 className="proposal-form-main-heading"> {proposalHeading} </h6>
			</div>
			<ProposalForm form={proposal} packageParam={packageName} />
		</div>
	);
}

export default connect(mapStateToProps)(ProposalFormContainer);
