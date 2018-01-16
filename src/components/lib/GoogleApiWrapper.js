import React, {PropTypes as T} from 'react';
import ReactDOM from 'react-dom';
import { defaultCreateCache, defaultMapConfig } from './GoogleMapHelpers';
import { connect } from 'react-redux';
import { loadMap, selectPlace } from '../../actions';

const mapStateToProps = ({ map, selectedPlace }) => ({
    map,
    selectedPlace
});

const mapDispatchToProps = dispatch => ({
    loadMap: (obj) => dispatch(loadMap(obj)),
    selectPlace: (obj) => dispatch(selectPlace(obj))
});

export const wrapper = (options) => (WrappedComponent) => {
    const apiKey = options.apiKey;
    const libraries = options.libraries || ['places'];
    const version = options.version || '3.24';
    const createCache = options.createCache || defaultCreateCache;

    class Wrapper extends React.Component {
        constructor(props, context) {
            super(props, context);

            this.scriptCache = createCache(options);
            this.scriptCache.google.onLoad(this.onLoad.bind(this));
        }

        onLoad(err, tag) {
            let { loadMap } = this.props;
            this._gapi = window.google;
            loadMap({loaded: true, google: this._gapi});
        }

        render() {
            const props = Object.assign({}, this.props, {
                loaded: this.props.map.loaded,
                google: window.google,
                api_key: apiKey
            });

            return (
                <div>
                    <WrappedComponent {...props}/>
                </div>
            )
        }
    }

    return connect( mapStateToProps, mapDispatchToProps )(Wrapper);
}

export default wrapper;

