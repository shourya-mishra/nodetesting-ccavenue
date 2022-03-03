import React from "react";

import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from 'react-accessible-accordion';

import $ from 'jquery'

import './Footer.css'

class Footer extends React.Component {
  render() {
    return (
      <>
        <div className="footer_wrapper footer_col">
          <div className="footer_row footer_justifySpaceBw">
            <div className="footer_row footer_justifySpaceAr">
              <FooterList
                heading={'ABOUT'}
                links={['About Us','Careers','Rentals','Custom Products']}
              />
              <FooterList
                heading={'CATEGORY'}
                links={['Wheelchair','Assisted Living','Pediatric','Mobility','Beds & Transfer']}
              />
              <FooterList
                heading={'HELP'}
                links={['Payments','Shipping','Warranty',"FAQ's"]}
              />
              <FooterList
                heading={'POLICY'}
                links={['Return Policy','Terms of Use','Privacy & Security','Shipping policy']}
              />
            </div>
            <div className="footerHr" ></div>
            <div className="footer_col footer_rightWrapper">
              <img className="footer_logo" src={require('../../assets/img/logo.png')} />
              <div className="footer_address">

                <div className="footerDetailsWrapper">
                  <img className="footerIcon footerMobile" src={require('../../assets/icons/website.png')} />info@rehamo.shop<br/>
                  vickymalik@rehamo.com<br/>
                </div>
                  
                <div className="footerDetailsWrapper">
                  <img className="footerIcon footerMobile" src={require('../../assets/icons/mail.png')} />+91 9742702222 / 080 4545 1511<br/>
                </div>
                
                <div className="footerDetailsWrapper">
                  <img className="footerIcon footerMobile" src={require('../../assets/icons/address.png')} />374, Ground floor, 19th Main
                  Road 1st Block, Rajaji Nagar,
                  Bengaluru, Karnataka - 560010
                </div>
              </div>
            </div>
          </div>
          <p className="footer_socialIconText">FIND US ON</p> <br/>
          <div className="footer_row">
            <div className="footer_socialIconWrapper">
              <a target="_blank" href="https://www.google.com/maps/place/Rehamo/@13.0017259,77.5501001,15z/data=!4m5!3m4!1s0x0:0xf075e3a80d3d9ad!8m2!3d13.0017259!4d77.5501001"><img className="footer_socialIcon" src={require('../../assets/img/footer/maps.png')} /></a>
              <a target="_blank" href="https://www.facebook.com/rehamoexperiencestore/"><img className="footer_socialIcon" src={require('../../assets/img/footer/fb.png')} /></a>
              <a target="_blank" href="https://www.instagram.com/rehamo.shop/?hl=en"><img className="footer_socialIcon" src={require('../../assets/img/footer/insta.png')} /></a>
              <a target="_blank" href="https://www.facebook.com/rehamoexperiencestore/"><img className="footer_socialIcon" src={require('../../assets/img/footer/twitter.png')} /></a>
              <a target="_blank" href="https://www.youtube.com/channel/UC3QpAjsBT6SGFbUb0Dr6cUg"><img className="footer_socialIcon" src={require('../../assets/img/footer/youtube.png')} /></a>
              <a target="_blank" href="https://in.pinterest.com/Rehamo_Shop/"><img className="footer_socialIcon" src={require('../../assets/img/footer/pinterest.png')} /></a>
            </div>
            <p className="footer_copywrites">© 2022 All Rights Reserved</p>
            <p className="footer_socialIconText">PAYMENT METHODS</p>
            <div className="footer_paymentWrapper">
              <div className="footer_paymentCard">
                <img className="footer_paymentIcon" src={require('../../assets/icons/upi.png')} />
              </div>
              <div className="footer_paymentCard">
                <img className="footer_paymentIcon" src={require('../../assets/icons/masterCard.png')} />
              </div>
              <div className="footer_paymentCard">
                <img className="footer_paymentIcon" src={require('../../assets/icons/visa.png')} />
              </div>
              <div className="footer_paymentCard">
                <img className="footer_paymentIcon" src={require('../../assets/icons/discover.png')} />
              </div>
              <div className="footer_paymentCard">
                <img className="footer_paymentIcon" src={require('../../assets/icons/rupay.png')} />
              </div>
              <div className="footer_paymentCard">
                <img className="footer_paymentIcon" src={require('../../assets/icons/cash.png')} />
              </div>
              <div className="footer_paymentCard">
                <img className="footer_paymentIcon" src={require('../../assets/icons/netBanking.png')} />
              </div>
            </div>
            <img className="footer_logo2" src={require('../../assets/img/logo.png')} />
            <p className="footer_copywrites2">© 202 All Rights Reserved</p>
          </div>
        </div>
      </>
    );
  }
}

class FooterList extends React.Component{
  constructor(props){
    super(props)

    // this.state={
    //   open : false
    // }

    // this.handleClick = this.handleClick.bind(this)
  }

  // handleClick(){
  //   this.state.open ? $('#footer_links').attr('className','footer_LinksOpen') : $('#footer_linksWrapper').attr('className','footer_LinksClose');
  //   this.setState({
  //     open : !this.state.open
  //   })
  // }

  render(){
    return(
      <>
        <div className="footerList_wrapper">
          <h3 className="footerList_heading">{this.props.heading}</h3>
          
          {
            this.props.links.map((link,i)=> {
              return (<a  key={i} className="footerList_link" id="footer_links">{link}</a>)
            })
          }
          
        </div>

        {/* <AccordionItem className="footerAccordian">
          <AccordionItemHeading className="footerAccordIanhead">
          <AccordionItemButton className="footerAccordIanbtn">
          {this.props.heading}
          </AccordionItemButton>
          </AccordionItemHeading>
          <AccordionItemPanel className="footerAccordIanpanel">
            {
              this.props.links.map((link)=> {
                return (<a className="footerList_link">{link}</a>)
              })
            }
          </AccordionItemPanel>
        </AccordionItem> */}
      </>
    )
  }
}

export default Footer;
