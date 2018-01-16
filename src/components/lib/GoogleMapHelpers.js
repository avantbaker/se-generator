import { ScriptCache } from './ScriptCache';
import GoogleApi from './GoogleApi';
import axios from 'axios';
import $ from 'jquery';
var Qs = require('qs');

export const makeCancelable = (promise) => {
  let hasCanceled_ = false;

  const wrappedPromise = new Promise((resolve, reject) => {
    promise.then((val) =>
      hasCanceled_ ? reject({isCanceled: true}) : resolve(val)
    );
    promise.catch((error) =>
      hasCanceled_ ? reject({isCanceled: true}) : reject(error)
    );
  });

  return {
    promise: wrappedPromise,
    cancel() {
      hasCanceled_ = true;
    },
  };
};

export const camelize = function(str) {
  return str.split(' ').map(function(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }).join('');
}

export const mapStyles = {
  container: {
    position: 'absolute',
    width: '100%',
    height: '100%'
  },
  map: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0
  }
}

export const evtNames = ['ready', 'click', 'dragend', 'recenter'];


export const defaultCreateCache = (options) => {
    options = options || {};
    const apiKey = options.apiKey;
    const libraries = options.libraries || ['places'];
    const version = options.version || '3.25';

    return ScriptCache({
        google: GoogleApi({apiKey: apiKey, libraries: libraries, version: version})
    });
};

export const defaultMapConfig = {};

export const createPlacesRequest = ( center, radius = "8000", category ) => ({
    location: center,
    radius: radius,
    type: category,
    scrollwheel: false
});

export const createMapConfig = ( center, zoom ) => {
  return Object.assign({}, {
      center: center,
      zoom: zoom,
      visible: true
  });
};

export const retrievePlaces = (google, map, request) => {
    var places = [];
    var newPlaces = []
    var service = new google.maps.places.PlacesService(map);

    return new Promise(function(resolve, reject) {
      service.nearbySearch(request, function(results, status){
        if( status == "OK" ){
          for (var i = 0; i < results.length; i++) {
            var place = results[i];
            places.push(place);
          }
          resolve(places);
        }
      });
    });
}

export const retrieveDetails = (google, map, places, api) => {

  var gmap = { map: map, google: google, api_key: api },
      placeDetails = [],
      placeIds = places.map(getPlaceIds),
      promiseArray = placeIds.map(getPlaceDetails);

  function getPlaceIds(place){
    return { placeId: place.place_id }
  }

  function getPlaceDetails(place){
    return getPlaceDetailsPromise( place, gmap )
      .then(  res => {
        return res.result; } )
      .catch( err => ({err}) );
  }

  return Promise.all(promiseArray);

}

export const getPlaceDetailsPromise = ( obj, gmap ) => new Promise((resolve, reject) => {
  var url = `https://maps.googleapis.com/maps/api/place/details/json?placeid=${obj.placeId}&key=******************`,
      qsObj = Qs.parse({ url: url }),
      qsString = Qs.stringify(qsObj),
      headerConfig = {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      };
  function resolveDetails(res){
    var result = res.data;
    resolve($.parseJSON(result));
  }

  axios.post('/includes/proxy.php', qsString, headerConfig ).then(resolveDetails);

});

export const getCurrentPosition = (setCallback, reloadCallback) => {
  return makeCancelable(
    new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    })
  ).promise.then(pos => {
    const coords = pos.coords;
    setCallback({currentPos: {
        lat: coords.latitude,
        lng: coords.longitude
      }});
    reloadCallback();
  }).catch(e => e);
}

export const makeGeoPromise = ( maps, address ) => {
  
  if( !maps.Geocoder ) { return; }

  let geo = new maps.Geocoder();

  return new Promise(function(resolve, reject){
      geo.geocode( address, function(results, status){
          if( status == "OK" ){
            var options = {
              lat: results[0].geometry.location.lat(),
              lng: results[0].geometry.location.lng()
            }
          }
          resolve(options);
      });
  });
}

