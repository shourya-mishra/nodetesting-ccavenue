import React from "react";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import FavoriteIcon from '@mui/icons-material/Favorite';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';


import './Component12.css'


const CustomDot = ({ onMove, index, onClick, active }) => {
  // onMove means if dragging or swiping in progress.
  // active is provided by this lib for checking if the item is active or not.
  return (
    <li
      className={active ? "active" : "inactive"}
      onClick={() => onClick()}
    >
      <div className="productlistdot"></div>
    </li>
  );
};

const ButtonGroup = ({ next, previous, goToSlide, ...rest }) => {
  const { carouselState: { currentSlide } } = rest;
  return (
    <div className="carousel-button-group">
      <button className={currentSlide === 0 ? 'disable' : 'productlistright'} onClick={() => next()}>
        <i className="material-icons productlistrightarrow">chevron_right</i>
      </button>
      <button className="productlistleft" onClick={() => previous()}>
        <i className="material-icons productlistleftarrow">chevron_left</i>
      </button>
    </div>
  );
};

const CustomRight = ({ onClick }) => (
  <button className="productlistright" onClick={onClick}>
    <i className="material-icons productlistrightarrow">chevron_right</i>
  </button>
);
const CustomLeft = ({ onClick }) => (
  <button className="productlistleft" onClick={onClick}>
    <i className="material-icons productlistleftarrow">chevron_left</i>
  </button>
);

const responsive3 = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 4
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};




class compo12 extends React.Component {
  constructor(props){
    super(props);
    }
  render() {
// console.log(this.props.name);
    return (
      <>
        <div className="compo12_wrapper">
          <h2 className="compo12_heading">{this.props.title}</h2>
          <div className="compo12card_colorWrapper" style={{backgroundColor:this.props.color}}></div>
          
          <Carousel
              swipeable={true}
              draggable={true}
              responsive={responsive3}
              infinite={true}
              autoPlay={true}
              autoPlaySpeed={3000}
              keyBoardControl={true}
              transitionDuration={1000}
              arrows={false}
              customButtonGroup={<ButtonGroup />}
              renderButtonGroupOutside={true}
              customDot={<CustomDot />}
              customLeftArrow={<CustomLeft/>}
              customRightArrow={<CustomRight/>}
              className="productlist"
              showDots={true}
              deviceType={this.props.deviceType}
              dotListClass="custom-dot-list-style"
              itemClass="productlistitem"
              >
            <Compo12Card
              image={this.props.image[0]}           
              name={this.props.name[0]}
              oldPrice={this.props.oldPrice[0]}
              discount={this.props.discount[0]}
              price={this.props.price[0]}
              like={this.props.like[0]}
            />        
            
           <Compo12Card
               image={this.props.image[1]}           
               name={this.props.name[1]}
               oldPrice={this.props.oldPrice[1]}
               discount={this.props.discount[1]}
               price={this.props.price[1]}
               like={this.props.like[1]}
            />
             <Compo12Card
               image={this.props.image[2]}           
               name={this.props.name[2]}
               oldPrice={this.props.oldPrice[2]}
               discount={this.props.discount[2]}
               price={this.props.price[2]}
               like={this.props.like[2]}
            />
             <Compo12Card
               image={this.props.image[3]}           
               name={this.props.name[3]}
               oldPrice={this.props.oldPrice[3]}
               discount={this.props.discount[3]}
               price={this.props.price[3]}
               like={this.props.like[3]}
            />
            </Carousel>
          
        </div>
      </>
    );
  }
}

class Compo12Card extends React.Component{
  constructor(props){
    super(props);
    }

  render(){
    let likeIcon;
    if(this.props.like)   
    likeIcon=<img className="compo12card_like" src={require("../../assets/img/compo12/likeSelected.png")} alt="Image"/>
   else
   likeIcon=<img className="compo12card_like" src={require("../../assets/img/compo12/like.png")} alt="Image"/>
  
    return(
      <>
        <div className="compo12card_wrapper">
        {/* <FontAwesomeIcon icon="fa fa-heart" /> */}
        {/* <FavoriteIcon/>
        <i class="fa fa-heart" aria-hidden="true"></i> */}
        <div className="compo12card_row">
        <img className="compo12card_img" src={this.props.image} alt="Image"/>
        {likeIcon}
        </div>
            <div className="compo12card_contentContainer">             
              <p className="compo12card_text">{this.props.name}</p>
              <div className="compo12card_row">
                <p className="compo12card_oldPrice">{this.props.oldPrice}</p>
                <p className="compo12card_discount">{this.props.discount}</p>
              </div>
              <p className="compo12card_price">{this.props.price}</p>
              <button className="homecatspbtn">Shop Now</button>
            </div>
        </div>
      </>
    );
  }
}

export default compo12;
