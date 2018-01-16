import React from 'react';
import { connect } from 'react-redux';
//import Slider from 'react-slick';
import Slide from './Slide';


const mapStateToProps = ({ allSlides }) => ({
	allSlides
});

class SimpleSlider extends React.Component {

	constructor(props) {
		super(props);
		this.next = this.next.bind(this);
		this.previous = this.previous.bind(this);
	}

	next() {
		this.slider.slickNext();
	}

	previous() {
		this.slider.slickPrev();
	}

	render(){
		let slides = this.props.allSlides.slides;

		const settings = {
			   //dots: true, --> remove when we add slider again
			   arrows: false,
			   slidesToShow: 1,
			   slidesToScroll: 1,
			   //swipe: true, --> remove when we add slider again
		};

		const slideItems = slides.map( (slide, i ) => {
			return <div key={i}><Slide key={i} info={ slide } /></div>
		});

		return (
			<section className="cs-slider-section padded-section">

			<div className="cs-slider-wrapper">

				<div className="cs-slider-container">
					<h2 className="alternate-uppercase section-heading">Sponsor Success Stories</h2>


						{/* <Slider ref={c => this.slider = c } {...settings}> */}

						<div >
							{slideItems}
						</div>

						{/*</Slider> */}

				</div>
			</div>

			{/* controls when we add slider
				 <div className="cs-slider-control previous" onClick={ this.previous }>
					<span className="icon-arrow-left-big"></span>
				</div>

				<div className="cs-slider-control next" onClick={ this.next }>
					<span className="icon-arrow-right-big"></span>
				</div> */}
			</section>
		)
	}

}

export default connect(mapStateToProps)(SimpleSlider);

