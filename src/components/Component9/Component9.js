import React from "react";
import FilledStar from "../../assets/img/compo9/filledStar.png";
import EmptyStar from "../../assets/img/compo9/emptyStar.png";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
//import { Carousel } from 'react-responsive-carousel';
import './Component9.css'
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//import '../../node_modules/font-awesome/css/font-awesome.min.css'; 
import ReactStars from "react-rating-stars-component";
// import NetSlider from 'netslider';
// import 'netslider/dist/styles.min.css';
// import "slick-carousel/slick/slick.css";  
// import "slick-carousel/slick/slick-theme.css";  
// import Slider from "react-slick";

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const axios = require('axios').default


const CustomDot = ({ onMove, index, onClick, active }) => {
  // onMove means if dragging or swiping in progress.
  // active is provided by this lib for checking if the item is active or not.
  return (
    <li
      className={active ? "active" : "inactive"}
      onClick={() => onClick()}
    >
      <div className="testlistdot"></div>
    </li>
  );
};


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


class compo9 extends React.Component {

  constructor(props) {
    super(props);
    
    this.state = {
      testimonials:[],
    };

  }


  componentDidMount(){

    var globalthis = this

    axios
    .post('https://admin.rehamo.com/api/gettestimoniallist', {
    })
    .then(function (response) {
      console.log(response)

        var Testimonials = response.data
        Testimonials.sort(function(a, b) {
          var keyA = new Date(a.Timestamp),
            keyB = new Date(b.Timestamp);
          // Compare the 2 dates
          if (keyA < keyB) return -1;
          if (keyA > keyB) return 1;
          return 0;
        });

        Testimonials = Testimonials.reverse()
        globalthis.setState({ testimonials: Testimonials });

       
              
        
      })
      .catch(function (error) {
        console.log(error)
        //modal[0].style.display = 'none'
        //$('#loading-circle').hide();
      })

  }



  render() {

    let count = 0;

    let Testimonials = this.state.testimonials.map((item, i) => {

          var rating = parseInt(item.TestimonialRating)

            let Image_Http_URL = `https://rehamobucket.s3.ap-south-1.amazonaws.com/Testimonials/`+item.TestimonialID+`_Image.jpg`
            count += 1;
              return (
                <>
                <div key={i} className="compo9card_wrapper">
                        <div className="compo9card_row">
                          <img className="compo9card_img" src={Image_Http_URL} alt="Image"/>
                          <div className="compo9card_col">
                          <h3 className="compo9card_name">{item.TestimonialName}</h3>
                          <p className="compo9card_role">{item.TestimonialDesignation}</p>
                          </div>
                <ReactStars
                    count={5}
                    // onChange={ratingChanged}
                    size={18}
                    isHalf={true}
                    //color={"red"}
                  activeColor="#FFA033"
                    // emptyIcon={<EmptyStar/>}
                    // filledIcon={<FilledStar/>}
                    value={rating}
                    edit={false}
                    classNames="compo9_ratingStar"
                  />
                          </div>
                          <div className="compo9card_contentWrapper">
                            <p className="compo9card_text">{item.TestimonialContent}</p>
                            
                          </div>
                      
                        </div>
                  </>
              );
      
         
    });

   
    return (
      <>
        <div className="compo9_wrapper">
          <h2 className="compo9_heading">Customer Feedback</h2>
          {/* <div className="compo9_row"> */}
          <Carousel
            autoPlay={true} 
            infiniteLoop={true} 
            interval={3000} 
            responsive={responsive}
            showArrows={false}
              swipeable={true}
              draggable={false}
              showDots={true}  
              ssr={true} // means to render carousel on server-side.
              infinite={true}
              className="slider"
              customDot={<CustomDot/>}
              //autoPlay={this.props.deviceType !== "mobile" ? true : false}
              autoPlaySpeed={1000}
              keyBoardControl={true}
              transitionDuration={3000}
              containerClass="testlist"
              arrows={false}
              deviceType={this.props.deviceType}
              dotListClass="custom-dot-list-style"
              itemClass="carousel-item-padding-10-px"
              focusOnSelect={true}
            >
          {/* <Carousel 
            autoPlay={true} 
            infiniteLoop={true} 
            interval={3000} 
            showArrows={false}
            > */}
            {/* <Slider  
    dots={true}  
        slidesToShow={2}  
        slidesToScroll={2}  
        autoplay={false}  
        arrows={true}  
        autoplaySpeed={3000}> */}
          {/* {imgSlides()} */}
          {/* <Slider {...settings} > */}
            {Testimonials}
             
             {/* </Slider> */}
            
            </Carousel>           
          {/* </div> */}
        </div>
      </>
    );
  }
}


export default compo9;
