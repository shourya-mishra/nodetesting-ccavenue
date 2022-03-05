import React from "react";

import Navbar from "../components/Navbars/Navbar";

import Footer from "../components/Footer/Footer";

import "../assets/css/aboutUs.css";

class AboutUS extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <Navbar />
        <div className="abtUs_wrapper">

            <div className="abtUs_vidContainer">
              <video autoPlay playsInline muted loop className="abtUs_video">
                <source src={require('../assets/brand/AkoiBG.mp4')} type="video/mp4"/>
             </video>
              <button className="abtUs_vidBtn">Explore</button>
            </div>

            <h4 className="abtUs_heading1">About <span className="abtUs_orange">Rehamo</span></h4>
            <p className="abtUs_para">
                Rehamo is a comprehensive solution for rehabilitation & mobility products, services, & home healthcare solutions. Our organization is a first-of-its-kind experience center in India's space of rehabilitation & mobility. We are pioneers in showcasing the integration of technology into everyday life & with effortless independent living we aim to deliver through our products.
                <br/>
                <br/>
                At Rehamo, we believe that every individual has to live happily & independently, irrespective of their condition. Hence, we have combined the latest technology with a compassionate heart to care for the world & showcased our products to meet the requirements of people. Our product range caters to multiple conditions, from Diabetes, Respironics, Orthopedic needs to particular solutions crafted according to your requirements.
            </p>

            <div className="abtUs_hr"></div>

            <div className="abtUs_row">
                <img className="abtUs_img" src={require('../assets/img/aboutUs/img2.png')} />
                <p className="abtUs_text1">To be the trusted companion for the comfort and convenience for all seniors and their caregivers. With an unwavering dedication to providing highest levels of customer service, we want to be the first port-of-call for all their needs.</p>
            </div>
            <div className="abtUs_row abtUs_colRev">
                <p className="abtUs_text2">To build a thriving community with our constant push for innovation in our products. We believe in providing products of the highest quality curated especially for you. With our retail stores as well as our user friendly e-commerce website, we aim to provide for all your needs.</p>
                <img className="abtUs_img" src={require('../assets/img/aboutUs/img1.png')} />
            </div>

            <div className="abtUs_hr"></div>

            <div className="abtUs_ceoWrapper">
                <p className="abtUs_ceoText">
                    <img className="abtUs_ceoQuote1" src={require('../assets/img/aboutUs/quoteBegin.png')} />
                    loram ipsum  nonummy nibh euismod asd tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit
                    <img className="abtUs_ceoQuote2" src={require('../assets/img/aboutUs/quoteEnd.png')} />
                </p>
                <img className="abtUs_ceoDp" src={require('../assets/img/aboutUs/ceoDP.png')} />
                <h5 className="abtUs_ceoName">Deepak Bafna</h5>
                <h5 className="abtUs_ceoDesignation">CEO</h5>
            </div>
        </div>
        <Footer />
      </>
    );
  }
}

export default AboutUS;
