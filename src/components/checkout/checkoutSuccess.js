import React from 'react';
import "./checkoutSuccess.css";

import { Container, Row, Col } from 'reactstrap';
import $ from 'jquery'
import DataVar from '../../variables/data.js'

import {DataContext} from '../../components/Context'

const axios = require('axios').default

class CheckoutSuccess extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      orderid:'',
      firstname:'',
      lastname:'',
      number:'',
      email:'',
      street1:'',
      street2:'',
      locality:'',
      city:'',
      state:'',
      pincode:'',
    };
  }

  componentDidMount(){

    var globalthis = this

    try {
      var mainurl = document.location.href,
        params = mainurl.split('?')[1].split('&'),
        data = {},
        tmp
      for (var i = 0, l = params.length; i < l; i++) {
        tmp = params[i].split('=')
        data[tmp[0]] = tmp[1]
      }
      var id = data.id
      globalthis.setState ({ orderid: id });

            axios
              .post('https://www.mievida.com/api/getpurchasedata', {
                OrderID:id,
              })
              .then(function (response) {
                ////console.log(response)
                if (response.data.Status === 'purchase found') {
                  var Purchase = response.data.Purchase

                  globalthis.setState ({ firstname: Purchase.FirstName });
                  globalthis.setState ({ lastname: Purchase.LastName });
                  globalthis.setState ({ email: Purchase.Email });
                  globalthis.setState ({ number: Purchase.Number });
                  globalthis.setState ({ street1: Purchase.Street1 });
                  globalthis.setState ({ street2: Purchase.Street2 });
                  globalthis.setState ({ locality: Purchase.Locality });
                  globalthis.setState ({ city: Purchase.City });
                  globalthis.setState ({ state: Purchase.State });
                  globalthis.setState ({ pincode: Purchase.Pincode });
                }
              
              
            })
            .catch(function (error) {
              ////console.log(error)
            })
      } catch (error) {
        
      }

  }
 
  render() {
    return (
      <>
        <Container className="checkoutSuccess_container">
          <Row>
              <Col>
                <div className="checkoutSuccess_cartWrapper">
                  <img src={require('../../assets/img/Success.svg')} className="checkoutSuccess_img1"/>
                  <p className="checkoutSuccess_content1">We have received your order</p>
                  <p className="checkoutSuccess_content2">Order Number: {this.state.orderid}</p>
                  <p className="checkoutSuccess_content3">A copy of your receipt has been sent to your email</p>
                  <div className="checkoutSuccess_cotainer1">
                    <div className="checkoutSuccess_cotainer1_1">
                      <p className="checkoutSuccess_content4">Delivery Details</p>
                    </div>
                    <Row className="checkoutSuccess_cotainer1_2">
                      <Col lg="6" className="checkoutSuccess_cotainer1_2_1">
                        <p className="checkoutSuccess_content5">{this.state.firstname} {this.state.lastname}</p>
                        <p className="checkoutSuccess_content5">{this.state.email}</p>
                        <p className="checkoutSuccess_content5">{this.state.number}</p>
                      </Col>
                      <Col lg="6" className="checkoutSuccess_cotainer1_2_2">
                        <p className="checkoutSuccess_content6">{this.state.street1}, {this.state.street2}</p>
                        <p className="checkoutSuccess_content6">{this.state.locality}, {this.state.city}</p>
                        <p className="checkoutSuccess_content6">{this.state.state}, {this.state.pincode}</p>
                      </Col>
                    </Row>
                  </div>
                  {/*}
                  <p className="checkoutSuccess_content4">Order Summery</p>
                  <img src={require('../../assets/img/teddy.svg')} className="checkoutSuccess_img1"/>
                  <p className="checkoutSuccess_content1">Nebulizer Mi-Hale 59</p>
                  <div className="checkoutSuccess_container3">
                    <p className="checkoutSuccess_content6">Quantity:2</p>
                  </div>
                  <div className="checkoutSuccess_container4">
                    <p className="checkoutSuccess_content6">Subtotal</p>
                    <p className="checkoutSuccess_content6">₹1500</p>
                  </div>
                  <div className="checkoutSuccess_container4">
                    <p className="checkoutSuccess_content6">Shipping</p>
                    <p className="checkoutSuccess_content6">0</p>
                  </div>
                  <h2 className="checkoutSuccess_content7">Order Total</h2>
                  <h1 className="checkoutSuccess_content8">₹1500</h1>
                */}
                </div>
                {/*}
                <div className="checkoutSuccess_container5">
                  <button className="checkoutSuccess_button1">Print</button>
                </div>
              */}
              </Col>
           </Row>
        </Container>
      </>
      );
  }
}

export default CheckoutSuccess;