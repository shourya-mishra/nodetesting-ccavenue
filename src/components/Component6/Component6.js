import React from "react";

import { Container, Row, Col } from "reactstrap";
import './Component6.css'

class Compo6 extends React.Component {
  render() {
    return (
      <>
        <div className="compo6_wrapper">
          <h2 className="compo6_heading">Cutting Edge Aspects</h2>
          <Row className="compo6_row">
          <Col lg="6" className="compo6card_wrapper">
              <img className="compo6card_img" src={require('../../assets/img/compo6/img1.png')} />
              <div className="compo6card_contentWrapper">
                <h3 className="compo6card_heading">Rehamo Experience Store</h3>
                <p className="compo6card_text">DISABILITY IS NOT INABILITY. Visit India's first Rehab Experience Store.</p>
              </div>
            </Col>

            <Col lg="6" className="compo6card_wrapper2">
              <img className="compo6card_img2" src={require('../../assets/img/compo6/img2.png')} />
              <div className="compo6card_contentWrapper">
                <h3 className="compo6card_heading2">Rehamo Specialist</h3>
                <p className="compo6card_text">Our in-field experts advise the best assistive aids for your speedy recovery.</p>
              </div>
            </Col>
            
          </Row>
          <Row className="compo6_row">

          <Col lg="6" className="compo6card_wrapper">
              <img className="compo6card_img" src={require('../../assets/img/compo6/img3.png')} />
              <div className="compo6card_contentWrapper">
                <h3 className="compo6card_heading">Customized Assistive Aid</h3>
                <p className="compo6card_text">We assess your unique requirements and tailor-make the products to suit your conditions.</p>
              </div>
            </Col>

            <Col lg="6" className="compo6card_wrapper2">
              <img className="compo6card_img2" src={require('../../assets/img/compo6/img4.png')} />
              <div className="compo6card_contentWrapper">
                <h3 className="compo6card_heading2">Rent Assistive Aid</h3>
                <p className="compo6card_text">Short-term needs? Explore our range of rental products.</p>
              </div>
            </Col>

          </Row>
        </div>
      </>
    );
  }
}

class Compo6Card extends React.Component{
  constructor(props){
    super(props)
  }

  render(){
    return(
      <>
        <Col lg="6" className="compo6card_wrapper">
          <img className="compo6card_img" src={this.props.img} />
          <div className="compo6card_contentWrapper">
            <h3 className="compo6card_heading">{this.props.heading}</h3>
            <p className="compo6card_text">{this.props.text}</p>
          </div>
        </Col>
      </>
    )
  }
}

export default Compo6;
