import React from 'react';
import { expect } from 'chai';

import { shallow, mount } from 'enzyme';
import { shallowWithStore } from 'enzyme-redux';

import { combineReducers } from 'redux';
import { connect } from 'react-redux';
import { createMockStore } from 'redux-test-utils';

import * as Reducers from '../src/reducers';
import Footer from '../src/components/Footer';
import FindSponsor from '../src/components/FindSponsor';


describe('<Footer />',() => {
	const ReactComponent = () => (<Footer/>);
	it( 'should connect', () => {
		  const expectedState = combineReducers(Reducers);
	      const mapStateToProps = (state) => ({
	        state,
	      });
	      const ConnectedComponent = connect(mapStateToProps)(ReactComponent);
	      const component = shallowWithStore(<ConnectedComponent />, createMockStore(expectedState));
	      expect(component.props().state).to.equal(expectedState);
	});
});
