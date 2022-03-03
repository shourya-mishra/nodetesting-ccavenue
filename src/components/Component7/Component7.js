import React from "react";
import $ from 'jquery'
import './Component7.css'

class compo7 extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      changingtext:'We are one stop solution offering a range of products needed within the environment of elderly care. Our comprehensive portfolio supports elderly individuals suffering from critical illness or having Palliative Care requirements. Prominent illness include: ALS, Alzheimer’s Dementia, Cancer, COPD, CVD, MS, Parkinson’s Disease, Arthritis, Osteoporosis, Diabetes and Hip injuries.'
    };
  }

  componentDidMount(){

    var globalthis = this

    var isMobile = {
      Android: function() {
          return navigator.userAgent.match(/Android/i);
      },
      BlackBerry: function() {
          return navigator.userAgent.match(/BlackBerry/i);
      },
      iOS: function() {
          return navigator.userAgent.match(/iPhone|iPad|iPod/i);
      },
      Opera: function() {
          return navigator.userAgent.match(/Opera Mini/i);
      },
      Windows: function() {
          return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
      },
      any: function() {
          return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
      }
  };

    $(".compo7card_wrapper").on("mouseover", function () {
      //stuff to do on mouseover
      $(".fcdrop").css("visibility", "visible");
      $(".fcdrop").css("opacity", "1");
      if( isMobile.any() ){
        $('.compo7_wrapper').css('padding-bottom','60vw')
      } 
      
      var image_index = $(".compo7card_wrapper").index(this)
      if(image_index === 0){
        $(".fcdrop").css("background-color", "#FFE2A7");
        globalthis.setState({changingtext:'We have variety of tools and aids to enable learning, development and play, for children with Special Needs including those diagnosed with Down Syndrome, Autism and Dyslexia.'})
      }else if(image_index === 1){
        $(".fcdrop").css("background-color", "#FFCBBC");
        globalthis.setState({changingtext:'We have solutions that support rehabilitation and recovery from injuries and surgeries that ease discomfort and pain, and that improve health.'})
      }else if(image_index === 2){
      $(".fcdrop").css("background-color", "#C9F6FF");
      globalthis.setState({changingtext:'We have solutions that cater to individuals suffering from prolonged conditions that demand long term care. Prominent conditions include: Neurological Disorders, Cardiovascular Disorders, Cancer, and Transplants, Spinal Cord Injuries.'})
      }else if(image_index === 3){
      $(".fcdrop").css("background-color", "#ECFEC1");
      globalthis.setState({changingtext:'We are one stop solution offering a range of products needed within the environment of elderly care. Our comprehensive portfolio supports elderly individuals suffering from critical illness or having Palliative Care requirements. Prominent illness include: ALS, Alzheimer’s Dementia, Cancer, COPD, CVD, MS, Parkinson’s Disease, Arthritis, Osteoporosis, Diabetes and Hip injuries.'})
      }
    });

    $(".compo7card_wrapper").on("mouseout", function () {
      //stuff to do on mouseover
      $(".fcdrop").css("visibility", "hidden");
      $(".fcdrop").css("opacity", "0");
      $('.compo7_wrapper').css('padding-bottom','0vw')
    });

  }

  render() {
    return (
      <>
        <div className="compo7_wrapper">
          <div className="compo7_greyWrapper">
          <h3 className="compo7_subHeading">See our list of</h3>
          <h2 className="compo7_heading">Featured Categories</h2>
          <div className="compo7_row">
            <div className="compo7cardRow">
            {/* <div className="compo7_greyWrapperHidden"></div> */}
              <Compo7Card
                image={require('../../assets/img/fc1.png')}
                text={"Special Needs Care"}
                subtext={`Solutions to cater to individuals for long term care such as Transfer Aids, Incontinence,
                Active Wheelchair, Bath & Commode where conditions include Neurological Disorders, Cardiovascular Disorders,
                Spinal Cord Injuries etc.`}
                color={"#FFE2A7"}
              />
              <Compo7Card
                image={require('../../assets/img/fc2.png')}
                text={"Active Care"}
                subtext={`Solutions to cater to individuals for long term care such as Transfer Aids, Incontinence,
                Active Wheelchair, Bath & Commode where conditions include Neurological Disorders, Cardiovascular Disorders,
                Spinal Cord Injuries etc.`}
                color={"#FFCBBD"}
              />    
            </div>
            <div className="compo7cardRow">
            {/* <div className="compo7_greyWrapperHidden"> </div> */}
              <Compo7Card
                image={require('../../assets/img/fc3.png')}
                text={"Longterm Care"}
                subtext={`Solutions to cater to individuals for long term care such as Transfer Aids, Incontinence,
                Active Wheelchair, Bath & Commode where conditions include Neurological Disorders, Cardiovascular Disorders,
                Spinal Cord Injuries etc.`}
                color={"#C9F6FF"}
              />
              <Compo7Card
                image={require('../../assets/img/fc4.png')}
                text={"Elderly Care"}
                subtext={`Solutions to cater to individuals for long term care such as Transfer Aids, Incontinence,
                Active Wheelchair, Bath & Commode where conditions include Neurological Disorders, Cardiovascular Disorders,
                Spinal Cord Injuries etc.`}
                color={"#ECFFC1"}
              />
           
            </div>
          </div>
          <p className="fcdrop">{this.state.changingtext}</p>
        </div>
        </div>
      </>
    );
  }
}

class Compo7Card extends React.Component{
  constructor(props){
    super(props);
    this.state={
      Bgcolor:this.props.color
    };
  }

  render(){
    return(
      <>
        <div className="compo7card_wrapper" style={{backgroundColor:this.state.Bgcolor}}>
          <div className="compo7card_imgContainer">
          <img className="compo7card_img" src={this.props.image} alt="Image"/>
          </div>
            <p className="compo7card_text">{this.props.text}</p>
        </div>

        
      </>
    );
  }
}

export default compo7;
