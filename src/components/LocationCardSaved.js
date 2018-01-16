import React from 'react';
import { connect } from 'react-redux';
import { removeSponsor } from '../actions';

const mapStateToProps = ({ sponsors }) => ({
      sponsors
});
const mapDispatchToProps = dispatch => ({
      removeSponsor: (obj) => dispatch(removeSponsor(obj))
});

class LocationCardSaved extends React.Component {
      componentWillMount(){
            this.checkedLocation = [];
      }

      render(){
            let { info, addSponsor, savedSponsor, removeSponsor } = this.props;

      	return (
                  <div className="location-card saved-card">
                        <div className="add-card-wrapper">
							<span className="alreadysaved" onClick={ () => removeSponsor(info)}><span className="icon-close-small"></span></span>
                        </div>
                        <div className="card-content">
                        	<h4>{ info.name }</h4>
                        	<div className="location-card-details">
                                    <span>{info.vicinity}</span><br />
                                    <span>{ info.formatted_phone_number || '' }</span><br />
                                    <span class="view-website-link"><a href={info.website} target="_blank">View Website</a></span>
                              </div>
                        </div>
                  </div>
            );
      }
}

export default connect( mapStateToProps, mapDispatchToProps )(LocationCardSaved);
