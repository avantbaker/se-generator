import React, { Component } from 'react';
import { connect } from 'react-redux';
import LocationCard from './LocationCard';
import MarketoGhostForm from './MarketoGhostForm';
import { getForm } from '../helperFunctions';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const LocationResults = ({ locations, back, saved }) => {
	return (
		<div className="location-results-container">
		  <span className="locations-link" onClick={ (e) => back() }>Search Again</span>
	      <div className="location-results">
	      	{ locations.map((location, i ) => {
	  		return (
          	<LocationCard key={i} savedSponsor={saved} info={location} />);
	  		  }) }
	      </div>
	      <MarketoGhostForm ID={ getForm('Find') }/>
        </div>
    );
}

export default LocationResults;
