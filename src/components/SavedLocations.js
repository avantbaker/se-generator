import React from 'react';
import { connect } from 'react-redux';
import LocationCardSaved from './LocationCardSaved';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const mapStateToProps = ({sponsors}) => ({
	sponsors
});

class SavedLocations extends React.Component {

	componentWillMount() {

		let { sponsors } = this.props;

		this.sponsors = sponsors.length > 0 ?
						sponsors.map((location, i) => {
							return (<LocationCardSaved key={i} info={location} />);
						}) :
						(<div className="saved-results-message">
							<h4>No saved results</h4>
							<p>Add potential sponsors by selecting them from the search results.</p>
						</div>);
	}

	componentWillUpdate(nextProps, nextState){
		let { sponsors } = this.props;

		if( (nextProps.sponsors !== sponsors) && (nextProps.sponsors.length !== 0) ) {
			this.sponsors = nextProps.sponsors.map((location, i) => {
				return (<LocationCardSaved key={i} info={location} />);
			})
		} else {
			this.sponsors = (<div className="saved-results-message">
				<h4>No saved results</h4>
				<p>Add potential sponsors by selecting them from the search results.</p>
			</div>);
		}
	}

	render() {
		let { sponsors } = this.props;
		return (
			<div>
				{ this.sponsors }
			</div>
		);
	}

}

export default connect(mapStateToProps)(SavedLocations);
