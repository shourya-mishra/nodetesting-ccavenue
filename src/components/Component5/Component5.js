import React from "react";

import Lottie from "lottie-react";
import rehamo1 from "../../assets/img/rehamo1.json";
import rehamo2 from "../../assets/img/rehamo2.json";
import rehamo3 from "../../assets/img/rehamo3.json";
import rehamo4 from "../../assets/img/rehamo4.json";
import rehamo41 from "../../assets/img/4-2.json";
import rehamo5 from "../../assets/img/rehamo5.json";
import rehamo6 from "../../assets/img/rehamo6.json";
import rehamo7 from "../../assets/img/rehamo7.json";
import rehamo8 from "../../assets/img/rehamo8.json";

import HorizontalScroll from 'react-scroll-horizontal'

import './Component5.css'



class Compo5 extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      anim1:false,
    };
  }


  render() {
    return (
      <>
        <div className="compo5_wrapper">
              <div className="compo5card_wrapper">
                  {/*<div className="compo5card_imgWrapper">
                    <img src={this.props.img} className="compo5card_img" />
                </div>*/}
                <Lottie className="animcontain" loop={true} autoplay={true} animationData={rehamo2} />
                  <p className="compo5card_text">Pain Management</p>   
              </div>

              <div className="compo5card_wrapper">
                  {/*<div className="compo5card_imgWrapper">
                    <img src={this.props.img} className="compo5card_img" />
                </div>*/}
                <Lottie className="animcontain" loop={true} autoplay={true} animationData={rehamo1} />
                  <p className="compo5card_text">Baby & Mother care</p>   
              </div>


              <div className="compo5card_wrapper">
                  {/*<div className="compo5card_imgWrapper">
                    <img src={this.props.img} className="compo5card_img" />
                </div>*/}
                <Lottie className="animcontain" loop={true} autoplay={true} animationData={rehamo3} />
                  <p className="compo5card_text">Walkers</p>   
              </div>


              <div className="compo5card_wrapper">
                  {/*<div className="compo5card_imgWrapper">
                    <img src={this.props.img} className="compo5card_img" />
                </div>*/}
                <Lottie className="animcontain" loop={true} autoplay={true} animationData={rehamo7} />
                  <p className="compo5card_text">Wheelchairs</p>   
              </div>


              <div className="compo5card_wrapper">
                  {/*<div className="compo5card_imgWrapper">
                    <img src={this.props.img} className="compo5card_img" />
                </div>*/}
                <Lottie className="animcontain" loop={true} autoplay={true} animationData={rehamo5} />
                  <p className="compo5card_text">Bath Assist</p>   
              </div>


              <div className="compo5card_wrapper">
                  {/*<div className="compo5card_imgWrapper">
                    <img src={this.props.img} className="compo5card_img" />
                </div>*/}
                <Lottie className="animcontain" loop={true} autoplay={true} animationData={rehamo41} />
                  <p className="compo5card_text">Bed Assist</p>   
              </div>


              <div className="compo5card_wrapper">
                  {/*<div className="compo5card_imgWrapper">
                    <img src={this.props.img} className="compo5card_img" />
                </div>*/}
                <Lottie className="animcontain" loop={true} autoplay={true} animationData={rehamo6} />
                  <p className="compo5card_text">Rehabilitation Aid</p>   
              </div>

              <div className="compo5card_wrapper">
                  {/*<div className="compo5card_imgWrapper">
                    <img src={this.props.img} className="compo5card_img" />
                </div>*/}
                <Lottie className="animcontain" loop={true} autoplay={true} animationData={rehamo8} />
                  <p className="compo5card_text">Insoles</p>   
              </div>

            
        </div>
        <div className="compo5_innerWrapper">
        </div>
      </>
    );
  }
}

class Compo5card extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <>
        <div className="compo5card_wrapper">
            {/*<div className="compo5card_imgWrapper">
              <img src={this.props.img} className="compo5card_img" />
          </div>*/}
            <p className="compo5card_text">{this.props.text}</p>   
        </div>
      </>
    )
  }
}

export default Compo5;
