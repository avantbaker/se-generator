// All React Related Packages
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { Router, Route, browserHistory, IndexRedirect, IndexRoute, useBasename, hashHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer, routerMiddleware, push } from 'react-router-redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

// Reducers, LocalStorage and HelperFunctions
import * as Reducers from './reducers';
import { initParallax, readCookie, getUserData } from './helperFunctions';
import { getState, setState, reducerKeys, getLastPath, setLastPath, resetState } from './localStorage.js';

// Add Routing to the Reducers
Reducers.routing = routerReducer;

// All Packages that are used in the Base instance of the App
import App from './components/App';
import PackageBuilder from './components/PackageBuilder';
import Footer from './components/Footer';
import Packages from './components/AllPackages';
import Card from './components/Card';
import PackageDetails from './components/PackageDetails';
import ProposalFormContainer from './components/ProposalFormContainer';


// APP STATE RESET :: uncomment to reset the LocalState if state related Errors Occur

// instructions:
// 1. Uncomment resetState function
// 2. Allow the App to Reload.
// 3. Recomment After to keep make Savable changes to state, or leave uncommented to keep changes unsaved.

resetState();

// Wrap the browserHistory in Middleware so that the push method will
// work when the page is refreshed
const routerMW = routerMiddleware(browserHistory);

// Sets the store, by first checking localStorage for the State with the
// getState() method, if so then it will use that state as the base,
// otherwide it will create the app with the default state.
const store 	= getState() ?
					createStore( combineReducers(Reducers), getState(), applyMiddleware( thunk, routerMW ) ) :
					createStore( combineReducers(Reducers), applyMiddleware( thunk, routerMW ) ) ;

// Syncs the browserHistory with the store so the routes will match up with
// the information saved in the state
const history 	= syncHistoryWithStore( browserHistory , store );

// Routes: could be placed inside of the ReactDOM.render but due to a bug to launches
// an error when they are there, they have been placed here to be evalutated later.
const routes 	= (
					<Route path="/" component={App}>
				    	<IndexRedirect to="packages" />
				    	<Route path="/packages" components={ PackageBuilder }>
				    		<IndexRoute component={ Packages } />
				    		<Route path="/packages/:packageName" component={ PackageDetails }/>
				            <Route path="/packages/:packageName/:proposal" component={ ProposalFormContainer } />
				    	</Route>
				    </Route>
				);

// INITIALIZATION FUNCTION
// Initialize the app and run the function again whenever a dispatch action is fired

run();
store.subscribe(run);


// Check if this is the first time visiting. If not get set the Path
if( getLastPath(store.getState()) !== "/" ) {
    let path = getLastPath(store.getState());
    store.dispatch(push(path));
}

var marketoCookie = readCookie('_mkto_trk');
// var marketoCookie = "id:380-SBA-754&token:_mch-sportsengine.com-1482425189750-16167";

var userDataPromise = new Promise((res, rej) => {
        if (!marketoCookie) res(null);
        res(getUserData(encodeURI(marketoCookie)));
    });

var userData = userDataPromise.then((response) => {
    return response;
});

// Add Parallax effects
initParallax();

/**
 * Run function initializes the app
 * @return {none} just Starts up the App.
 */
function run() {

	// Get the state from the store to save it to localStorage with setState
    let state = store.getState();
    	setState( state, reducerKeys );

    // Get the last PathName to set an event listener to save that path to LocalStorage
    // on Refresh
    let path = state.routing.locationBeforeTransitions.pathname;
    	setLastPath(path, store);

    // Console.log the main state for Debugging purposes
    console.log("Main State: ", state);

    // ======= WHERE THE MAGIC HAPPENS ======= //
    ReactDOM.render(
        <Provider store={store}>
            <Router onUpdate={() => window.scrollTo(0, 300)} history={history}>
        		{routes}
            </Router>
        </Provider>,
      	document.getElementById("root")
    );
    // ======= WHERE THE MAGIC HAPPENS ======= //

}





