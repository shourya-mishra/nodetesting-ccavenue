import React from "react";
import { Container, Row, Col } from "reactstrap";

import Navbar from "../components/Navbars/Navbar";

import Footer from "../components/Footer/Footer";
import { Carousel } from "react-responsive-carousel";

//  import Checkout from '../components/checkout/checkout.js';
import CheckoutSuccess from '../components/checkout/checkoutSuccess';

class CheckoutSuccessPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }


  componentDidMount(){

    
    
  }
  
  
  render() {

    

    return (
      <>
      <div className="App">
                <Navbar/>               
                <CheckoutSuccess/>
                <Footer/>
                </div>
      </>
    );
  }
}

export default CheckoutSuccessPage;
