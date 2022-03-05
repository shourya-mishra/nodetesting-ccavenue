import React from "react";

import HorizontalScroll from 'react-scroll-horizontal'

import './Component4.css'

class Compo4 extends React.Component {
  
  
  render() {
    return (
      <>
        <div className="compo4_wrapper">
            <Compo4card
              to={"/shopnow"}
              background={'#FEEECD'}
              img={require('../../assets/img/compo4/cart.png')}
              heading={'Product Purchase'}
              text={'save up to 10% off'}
              color={'#FFAC00'}
            />
            
            <Compo4card
              to={"/customised"}
              background={'#F4C2B3'}
              img={require('../../assets/img/compo4/custom.png')}
              heading={'Customized Product'}
              text={'save up to 10% off'}
              color={'#E95428'}
            />
            
            <Compo4card
              to={"/rental"}
              background={'#C4F5FF'}
              img={require('../../assets/img/compo4/rentalProd.png')}
              heading={'Rental Products'}
              text={'save up to 10% off'}
              color={'#17B2D4'}
            />
            
            <Compo4card
              to={"/contact"}
              background={'#D9EBB3'}
              img={require('../../assets/img/compo4/expert.png')}
              heading={'Experts'}
              text={'save up to 10% off'}
              color={'#719A1A'}
            />
        </div>
      </>
    );
  }
}

class Compo4card extends React.Component {
  constructor(props){
    super(props);
  }

  componentDidMount(){

    var globalthis = this

    this.redirect = async (item) => {
      console.log(item)
      window.location.href = item
    };

    this.custom = async (item) => {
      console.log(item)
      globalthis.props.history.push('/customised')
    };

    this.rental = async (item) => {
      console.log(item)
      globalthis.props.history.push('/rental')
    };



  }


  render() {
    return (
      <>
        <div className="compo4card_wrapper" onClick={()=>this.redirect(this.props.to)}  style={{background:`${this.props.background}`}}>
          <div className="compo4card_left">
            <img src={this.props.img} className="compo4card_img" />
          </div>
          <div className="compo4card_right">
            <h5 className="compo4card_heading" >{this.props.heading}</h5>
            <p className="compo4card_text" style={{color:`${this.props.color}`}} >{this.props.text}</p>
          </div>
        </div>
      </>
    )
  }
}

export default Compo4;
