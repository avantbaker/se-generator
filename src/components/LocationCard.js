import React from 'react';
import { connect } from 'react-redux';
import { addToSponsors } from '../actions';

const mapStateToProps = ({ sponsors }) => ({
      sponsors
});
const mapDispatchToProps = dispatch => ({
      addSponsor: (obj) => dispatch(addToSponsors(obj)),
      removeSponsor: (obj) => dispatch(removeSponsor(obj))
});

class LocationCard extends React.Component {
      componentWillMount(){
            this.checkedLocation = [];
      }

      componentWillReceiveProps(nextProps) {
            let { info, addSponsor, savedSponsor } = this.props;

            this.checkedLocation = nextProps.sponsors.filter((sponsor, i) => {
                        return sponsor.id == info.id;
                  });
      }

      componentWillUpdate(nextProps, nextState){
            //console.log('NextProps', nextProps);
            //console.log('Props', this.props);
          let { info, addSponsor, savedSponsor } = this.props;

          if (nextProps.sponsors !== this.props.sponsors ){
                this.checkedLocation = nextProps.sponsors.filter((sponsor, i) => {
                        return sponsor.id == info.id;
                  });
             //   console.log( "checkedLocation: ", checkedLocation );
            }
      }

      render(){
            let { info, addSponsor, savedSponsor } = this.props;
            let icon = this.checkedLocation.length > 0 ?
                        (<span className={'saved' }><span className="icon-checkmark-small"></span></span>) :
                        (<span className={ 'notsaved' }><span className="plus-symbol icon-plus-small"></span></span>);

      	    return (
                  <div className="location-card" onClick={ () => addSponsor(info) } >
                        <div className="add-card-wrapper">
                  	    {icon}
                        </div>
                        <div className="card-content">
                        	<h4>{ info.name }</h4>
                        	<div className="location-card-details">
                        		<span>{ info.formatted_address || info.vicinity || '' }</span><br />
                                    <span>{ info.formatted_phone_number || '' }</span><br />
                                    <span><a href={info.website} target="_blank">View Website</a></span>
                        	</div>
                        </div>
                  </div>
            );
      }
}

export default connect( mapStateToProps, mapDispatchToProps )(LocationCard);
