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

import axios from 'axios';
import { generateUUID, saveFile } from './helperFunctions';
import { setUUID, getUUID, resetUUID } from './localStorage';
var Qs = require('qs');

// Modal Actions
export const showModal = (str, modal) => ({ type: SHOW_MODAL, package: str, modal: modal });
export const closeModal = () => ({ type: CLOSE_MODAL });

// Footer Actions
export const addToSponsors = (obj) => ({ type: ADD_SPONSOR, data: obj });
export const removeSponsor = (obj) => ({ type: REMOVE_SPONSOR, data: obj });
export const backToForm = () => ({ type: HIDE_RESULTS });
export const loadMap = (obj) => ({ type: MAP_LOADED, data: obj });
export const selectPlace = (obj) => ({type: SELECT_PLACE, place: obj });
export const setCurrPos = (obj) => ({ type: SET_CURRENT_POSITION, data: obj });
export const showFinder = () => ({ type: SHOW_FINDER  });
export const showSavedLocations = () => ({ type: SHOW_SAVED });
export const toggleChat = () => ({ type: TOGGLE_CHAT });
export const toggleFindSponsor = () => ({ type: TOGGLE_FIND_SPONSOR });
export const togglePopUp = () => ({type: TOGGLE_POPUP });
export const updateLocationOptions = (obj) => ({type: UPDATE_LOCATION_OPTIONS, data: obj });
export const updatePlaces = (arr) => ({type: UPDATE_PLACES, data: arr });

// Package Actions
export const updateForm = ( packageName, optionName, amount ) => ({type: FORM_UPDATE_VALUE, amount, packageName, name: optionName });
export const updateFrequency = ( packageName, frequency ) => ({type: FORM_UPDATE_FREQUENCY, packageName, frequency });
export const toggleInput = ( packageName, optionName, selected ) => ({ type: SELECT_INPUT, selected, packageName, name: optionName });
export const resetForm = () => { return dispatch => dispatch({ type: FORM_RESET }) }


export const savePropsalForm = (obj) => ({ type: SAVE_PROPOSAL_FORM, data: obj });
export const saveEmailForm = (obj) => ({ type: SAVE_EMAIL_FORM, data: obj });
export const updateCurrentForm = (formName) => ({ type: UPDATE_CURRENT_FORM, data: formName });
export const saveTestState = (state) => ({ type: SAVE_TEST_STATE, data: state });
export const savePathBeforeUnload = () => ({ type: "SAVE_PATH_TO_STATE", path: path });

// Button State Actions
export const fetchData = () => ({ type: "IS_FETCHING" });
export const dataReceived = () => ({ type: "DATA_RECEIVED" });
export const resetButtonState = () => ({ type: "RESET_BUTTON_STATE" });


// Generation Actions
export const generateEmail = (obj) => {
    return function(dispatch, getState) {
      // Saves The Email Form Data to the State so that the whole state can be prepared
      // to be saved in LocalStorage and sent to the Email Process.php File
      dispatch( saveEmailForm(obj) );
      // Parses the GetState() string into data that can be transmitted across an HTTP
      // request. Add the selected Package and package independently to this object to
      // make it easier to access when dynamically added to the generated Email.
      var parsedState = Qs.parse(getState());
          parsedState.selectedPackage = obj.selectedPackage;
          parsedState.package = obj.package;
          // Developer Note: resetUUID not used in production. Only to clear the UUID from
          // local Storage. Can be commented out in Production.
          // resetUUID();
          // Checks if there is already a UUID set in Local Storage. If there is then use
          // that one. If not then create a new one.
          if(getUUID()){
            parsedState.uuid = getUUID();
          } else {
            parsedState.uuid = generateUUID();
          }
          // Set the UUID in local Storage.
          setUUID(parsedState.uuid);
          // Dispatches the fetchData action to change buttonState object in State, to change
          // loading state on the download button.
          dispatch(fetchData());
      // HTTP Request to Email Process script that, dynamically adds the data from the state
      // into the approriate areas.
      return axios.post('/PHPMailer/sn-email-process.php',
          Qs.stringify(parsedState),
          { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        ).then(function(res){
          // Dispatches the dataRecieved action to change buttonState object in State, to alter
          // the success state on the download button.
          dispatch(dataReceived());

          var emailTransferObj = Object.assign({}, obj, {
            emailTransfer: true
          });

          dispatch(generateProposal(emailTransferObj));
          // Dispatches the resetButtonState action to reset buttonState object in State to its
          // initial state after 5 seconds.
          setTimeout(() => {
            dispatch(resetButtonState());
          }, 5000);
        });
    }
}

export const generateProposal = (obj) => {
    return function(dispatch, getState) {
      // Saves The Proposal Form Data to the State so that the whole state can be prepared
      // to be saved in LocalStorage and sent to the Proposal Process.php File
      var isEmailTransfer = ( obj.hasOwnProperty('emailTransfer') && obj.emailTransfer ) ? true : false;

      dispatch( savePropsalForm(obj) );
      // Parses the GetState() string into data that can be transmitted across an HTTP
      // request. Add the selected Package and package independently to this object to
      // make it easier to access when dynamically added to the generated Proposal.
      var parsedState = Qs.parse(getState());
          parsedState.selectedPackage = obj.selectedPackage;
          parsedState.package = obj.package;
          // Developer Note: resetUUID not used in production. Only to clear the UUID from
          // local Storage. Can be commented out in Production.
          // resetUUID();
          // Checks if there is already a UUID set in Local Storage. If there is then use
          // that one. If not then create a new one.
          if(getUUID()){
            parsedState.uuid = getUUID();
          } else {
            parsedState.uuid = generateUUID();
          }
          // Set the UUID in local Storage.
          setUUID(parsedState.uuid);
          // Dispatches the fetchData action to change buttonState object in State, to change
          // loading state on the download button.
          dispatch(fetchData());
      // HTTP Request to Email Process script that, dynamically adds the data from the state
      // into the approriate areas.
      return axios.post('/mpdf/generateProposal.php',
          Qs.stringify(parsedState),
          { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        ).then(function(res){
          var result = res.data;
          var url = "http://inspire.sportsengine.com/mpdf/tmp/" + parsedState.uuid + "-proposalEmail.pdf";
          // ^^^^^^^^^^^^ Use some XHR trickery to download the File from the URL. ^^^^^^^^^^^^
          if( !isEmailTransfer ) {
            saveFile(url);
          }
          // Dispatches the dataRecieved action to change buttonState object in State, to alter
          // the success state on the download button.
          dispatch(dataReceived());
          // Dispatches the resetButtonState action to reset buttonState object in State to its
          // initial state after 5 seconds.
          setTimeout(() => {
            dispatch(resetButtonState());
          }, 5000);
        });
    }
}





