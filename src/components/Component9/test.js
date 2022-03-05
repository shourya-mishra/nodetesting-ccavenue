import React from "react";
import FilledStar from "../../assets/img/compo9/filledStar.png";
import EmptyStar from "../../assets/img/compo9/emptyStar.png";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
//import { Carousel } from 'react-responsive-carousel';
import './Component9.css'
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//import '../../node_modules/font-awesome/css/font-awesome.min.css'; 
import ReactStars from "react-rating-stars-component";
import NetSlider from 'netslider';
import 'netslider/dist/styles.min.css';
import "slick-carousel/slick/slick.css";  
import "slick-carousel/slick/slick-theme.css";  
import Slider from "react-slick";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

class Test extends React.Component {
  render() {
    // var settings = {  
    //   dots: true,  
    //   infinite: true,  
    //   speed: 500,  
    //   centerMode: true,  
    //   slidesToShow: 3,  
    //   slidesToScroll: 1,  
    //   focusOnSelect:true,
    //   };  
    return (
      <>
        <div className="compo9_wrapper">
          <h2 className="compo9_heading">Customer Feedback</h2>
          <div>         
          {/* <Slider {...settings} >
            <div className="one">
                <img src={require("../../assets/img/compo9/profile1.png")} width="80px" height="80px"/>
            </div>
            <div className="one">
                <img src={require("../../assets/img/compo9/profile1.png")} width="80px" height="80px"/>
            </div>
            <div className="one">
                <img src={require("../../assets/img/compo9/profile1.png")} width="80px" height="80px"/>
            </div>
            <div className="one">
                <img src={require("../../assets/img/compo9/profile1.png")} width="80px" height="80px"/>
            </div>
            <div className="one">
                <img src={require("../../assets/img/compo9/profile1.png")} width="80px" height="80px"/>
            </div>
            <div className="one">
                <img src={require("../../assets/img/compo9/profile1.png")} width="80px" height="80px"/>
            </div>
            <div className="one">
                <img src={require("../../assets/img/compo9/profile1.png")} width="80px" height="80px"/>
            </div>
            <div className="one">
                <img src={require("../../assets/img/compo9/profile1.png")} width="80px" height="80px"/>
            </div>
            <div className="one">
                <img src={require("../../assets/img/compo9/profile1.png")} width="80px" height="80px"/>
            </div>
             </Slider> */}
        <Carousel
            autoPlay={true} 
            infiniteLoop={true} 
            interval={3000} 
            responsive={responsive}
            showArrows={false}
  swipeable={false}
  draggable={false}
  showDots={true}  
  ssr={true} // means to render carousel on server-side.
  infinite={true}
  //autoPlay={this.props.deviceType !== "mobile" ? true : false}
  autoPlaySpeed={1000}
  keyBoardControl={true}
  customTransition="all .5"
  transitionDuration={3000}
  containerClass="carousel-container"
 // removeArrowOnDeviceType={["desktop","tablet", "mobile"]}
 arrows={false}
  deviceType={this.props.deviceType}
  dotListClass="custom-dot-list-style"
  itemClass="carousel-item-padding-10-px"
  focusOnSelect={true}
  renderButtonGroupOutside={true}
>
<div className="one">
                <img src={require("../../assets/img/compo9/profile1.png")} width="80px" height="80px"/>
            </div>
            <div className="one">
                <img src={require("../../assets/img/compo3/banner1new.png")} width="80px" height="80px"/>
            </div>
            <div className="one">
                <img src={require("../../assets/img/compo9/emptyStar.png")} width="80px" height="80px"/>
            </div>
            <div className="one">
                <img src={require("../../assets/img/compo9/profile1.png")} width="80px" height="80px"/>
            </div>
            <div className="one">
                <img src={require("../../assets/img/compo9/filledStar.png")} width="80px" height="80px"/>
            </div>
            <div className="one">
                <img src={require("../../assets/img/compo9/profile1.png")} width="80px" height="80px"/>
            </div>
            <div className="one">
                <img src={require("../../assets/img/compo9/emptyStar.png")} width="80px" height="80px"/>
            </div>
            <div className="one">
                <img src={require("../../assets/img/compo3/banner1new.png")} width="80px" height="80px"/>
            </div>
</Carousel> 
{/* <Carousel 
            autoPlay={true} 
            infiniteLoop={true} 
            interval={3000} 
            showArrows={false}
            width={300}
            items={3}
            >
            <div className="compo3_imgWrapper" >
              <img className="compo3_img" width="50%" src={require('../../assets/img/compo3/banner1new.png')} />
            </div>
            <div className="compo3_imgWrapper" >
              <img className="compo3_img" width="50%" src={require('../../assets/img/compo3/banner1new.png')} />
            </div>
            <div className="compo3_imgWrapper" >
              <img className="compo3_img" width="50%" src={require('../../assets/img/compo3/banner1new.png')} />
            </div>
            <div className="compo3_imgWrapper" >
              <img className="compo3_img" width="50%" src={require('../../assets/img/compo3/banner1new.png')} />
            </div>
          </Carousel> */}
          </div>
        </div>
      </>
    );
  }
}



export default Test;
