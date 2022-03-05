import React from "react";
import './Component10.css'


import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 6
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 6
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 4
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 4
  }
};

class compo10 extends React.Component {
  render() {
    return (
      <>
        <div className="compo10_wrapper">
          <h2 className="compo10_heading">Official Distributors</h2>
          <Carousel
            autoPlay={true} 
            infiniteLoop={true} 
            interval={3000} 
            responsive={responsive}
            showArrows={false}
              swipeable={false}
              draggable={false}
              showDots={false}  
              ssr={true} // means to render carousel on server-side.
              infinite={true}
              className="slider"
              //autoPlay={this.props.deviceType !== "mobile" ? true : false}
              autoPlaySpeed={1000}
              keyBoardControl={true}
              transitionDuration={3000}
              containerClass="distlist"
              arrows={false}
              deviceType={this.props.deviceType}
              dotListClass="custom-dot-list-style"
              itemClass="carousel-item-padding-10-px"
              focusOnSelect={true}
            >                              
            <Compo10Card
              image={require('../../assets/img/compo10/logo1.png')}                 
            /> 
             <Compo10Card
              image={require('../../assets/img/compo10/logo2.png')}                 
            /> 
             <Compo10Card
              image={require('../../assets/img/compo10/logo3.png')}                 
            /> 
             <Compo10Card
              image={require('../../assets/img/compo10/logo4.png')}                 
            /> 
             <Compo10Card
              image={require('../../assets/img/compo10/logo5.png')}                 
            />     
             <Compo10Card
              image={require('../../assets/img/compo10/logo6.png')}                 
            /> 
             <Compo10Card
              image={require('../../assets/img/compo10/logo7.png')}                 
            /> 
             <Compo10Card
              image={require('../../assets/img/compo10/logo8.png')}                 
            /> 
             <Compo10Card
              image={require('../../assets/img/compo10/logo9.png')}                 
            /> 
             <Compo10Card
              image={require('../../assets/img/compo10/logo10.png')}                 
            /> 
            
          </Carousel>
        </div>
      </>
    );
  }
}

class Compo10Card extends React.Component{
  constructor(props){
    super(props);
    
  }

  render(){
    return(
      <>
        <div className="compo10card_wrapper">
          <img className="compo10card_img" src={this.props.image} alt="Image"/>
        </div>
      </>
    );
  }
}

export default compo10;
