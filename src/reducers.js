import { packages as defaultPackages, gmapState, slides, proposalFormSchema, emailFormSchema } from './localStorage';

import {
	SHOW_MODAL,
	CLOSE_MODAL,
	FORM_UPDATE_VALUE,
	FORM_UPDATE_FREQUENCY,
	SELECT_INPUT,
	SELECT_PLACE,
	UPDATE_PLACES,
	TOGGLE_FIND_SPONSOR,
	TOGGLE_CHAT,
	TOGGLE_POPUP,
	ADD_SPONSOR,
	REMOVE_SPONSOR,
	MAP_LOADED,
	SET_CURRENT_POSITION,
	UPDATE_LOCATION_OPTIONS,
	HIDE_RESULTS,
	SHOW_SAVED,
	SHOW_FINDER,
	SAVE_PROPOSAL_FORM,
    SAVE_EMAIL_FORM,
    UPDATE_CURRENT_FORM

} from './constants';

var btnState = {
	isFetching: false,
	dataRecieved: false,
}

export const packages = (prevState, action) => {
	switch(action.type){
		case FORM_UPDATE_VALUE :

			var { amount, name, packageName } = action;

			var selectedPackage = prevState.filter((pack) => {
				return pack.packageName === packageName;
			})

			var newPackageOptions = selectedPackage[0].packageOptions.map((option) => {
				if( option.name !== name ) return option;
				return Object.assign({}, option, {
					amount,
					name
				});
			});

			var newState = prevState.map((pack) => {
				if(pack.packageName !== packageName) return pack;
				return Object.assign({}, pack, {
					packageOptions: newPackageOptions
				});
			})

			return newState;

		case FORM_UPDATE_FREQUENCY :

			var { packageName, frequency } = action;

			var newState = prevState.map((pack) => {
				if(pack.packageName !== packageName) return pack;
				return Object.assign({}, pack, {
					billingFrequency: frequency
				});
			})
			return newState;

		case SELECT_INPUT :

			var { name, packageName, selected } = action;

			var selectedPackage = prevState.filter((pack) => {
				return pack.packageName === packageName;
			})

			var newPackageOptions = selectedPackage[0].packageOptions.map((option) => {
					if( option.name !== name ) return option;
					return Object.assign({}, option ,{
						selected: selected
					});
				});
			var newState = prevState.map((pack) => {
					if(pack.packageName !== packageName) return pack;
					return Object.assign({}, pack, {
						packageOptions: newPackageOptions
					});
				})
			return newState;
		default:
			return prevState || defaultPackages.map( (pack, i) => pack );
	}
};

export const selectedPlace = (prevState, action) => {
	switch(action.type){
	case SELECT_PLACE:
		return action.place;
	// case UPDATE_PLACES:
	// 	return action.data[0];
	default:
		return prevState || {};
	}
}

export const finderPopUpVisibility = (prevState, action) => {
	switch( action.type ) {
	case TOGGLE_FIND_SPONSOR :
		var newState = Object.assign({}, prevState, {
			visible: true,
			activePopUp: "FIND_SPONSOR"
		});
		return newState;
	case TOGGLE_CHAT :
		var newState = Object.assign({}, prevState, {
			visible: true,
			activePopUp: "CHAT"
		});
		return newState;
	case TOGGLE_POPUP :
		var newState = Object.assign({}, prevState, {
			visible: !prevState.visible,
		});
		return newState;
	default :
	 	return prevState || { visible: false, activePopUp: "FIND_SPONSOR" };
	}
};

export const sponsors = (prevState, action) => {
	switch(action.type) {
		case ADD_SPONSOR :
			var newState = prevState.filter((sponsor, i) => {
				return sponsor.place_id !== action.data.place_id
			});

			return newState.concat([action.data]);
		case REMOVE_SPONSOR :
			var newState = prevState.filter((sponsor, i) => {
				return sponsor.place_id !== action.data.place_id
			});
			return newState;
		default:
			return prevState || [];
	}
};

export const proposalForm = (prevState, action) => {
	switch(action.type) {
	case SAVE_PROPOSAL_FORM:
		return action.data;
	default:
		return prevState || proposalFormSchema;
	}
}

export const emailForm = (prevState, action) => {
	switch(action.type) {
	case SAVE_EMAIL_FORM:
		return action.data;
	default:
		return prevState || emailFormSchema;
	}
}

export const buttonState = (prevState, action) => {
	switch(action.type) {
	case "IS_FETCHING":
		var state = Object.assign({}, prevState, {
			isFetching: true,
			dataRecieved: false
		});
		return state;
	case "DATA_RECEIVED":
		var state = Object.assign({}, prevState, {
			isFetching: false,
			dataRecieved: true
		});
		return state;
	case "RESET_BUTTON_STATE":
		var state = Object.assign({}, prevState, {
			isFetching: false,
			dataRecieved: false
		});
		return state;
	default:
		return prevState || btnState;
	}
}

export const map = (prevState, action) => {
	switch(action.type){
	case MAP_LOADED:
		return Object.assign({}, prevState, action.data);
	case SET_CURRENT_POSITION:
		return Object.assign({}, prevState, action.data);
	case UPDATE_PLACES:
		return Object.assign({}, prevState, {
			places: action.data.slice(1,-1),
			placesLoaded: true
		});
	case UPDATE_LOCATION_OPTIONS:
		return Object.assign({}, prevState, {
			locationOptions: action.data,
			showResults: true,
			fetchLocations: true
		});
	case HIDE_RESULTS :
		return Object.assign({}, prevState, {
			showResults: false
		});
	case SHOW_SAVED :
		return Object.assign({}, prevState, {
			showSaved: true
		});
	case SHOW_FINDER :
		return Object.assign({}, prevState, {
			showSaved: false
		});
	default:
		return prevState || gmapState;
	}
}

export const whatsThisModal = (prevState, action) => {

	switch( action.type ){
	case SHOW_MODAL :
		var newState = Object.assign({}, prevState, {
			visible: true,
			package: action.package,
			modal: action.modal
		});
		return newState;

	case CLOSE_MODAL :
		var newState = Object.assign({}, prevState, {
			visible: false,
			package: action.package
		});
		return newState;
	default:
		return prevState || { visible: false, modal: null };
	}
}

export const allSlides = (prevState, action) => {
	return prevState || slides;
}

export const pathBeforeUnload = (prevState, action) => {
	switch( action.type ){
	case 'SAVE_PATH_TO_STATE':
		return action.path;
	default:
		return prevState || "/";
	}
}

// handle whether email or proposal form is selected
export const currentProposalForm = ( prevState, action ) => {
	switch ( action.type ){
		case UPDATE_CURRENT_FORM :
			var newState = Object.assign({}, prevState, {
				currentForm: action.data

			});
			return newState;
		default :
			return prevState || null;
	}
}

