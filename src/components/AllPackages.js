import React from 'react';
import { connect } from 'react-redux';
import { showModal, closeModal } from '../actions';
import Card from './Card';

const mapStateToProps = ({ packages, whatsThisModal }) => ({
	packages, whatsThisModal
});

const mapDispatchToProps = dispatch => ({
	showModal: (str, modal) => dispatch(showModal(str, modal)),
	closeModal: () => dispatch(closeModal())
});

const Packages = React.createClass ({

	render(){
		/* render maps through application state and returns a card component for each package in found in state */

		let packages = this.props.packages;
		let { showModal, closeModal, whatsThisModal } = this.props;


		return (
			<div className="package-builder">

				<div className="package-builder-heading">
					<h2 className="alternate-uppercase">Sponsorship Builder</h2>
					<p className="intro">Create a sponsorship game plan that benefits your organization, your members, and your community.</p>
				</div>

				<div className="packages">
					{ packages.map(( pack, i ) => {
						return <Card key={ i } openModal={showModal} info={ pack } />
					})}
				</div>

			</div>
		);
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(Packages);
