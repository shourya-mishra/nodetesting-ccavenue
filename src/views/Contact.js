import React from "react";

import Navbar from "../components/Navbars/Navbar";

import Footer from "../components/Footer/Footer";

import "../assets/css/contact.css";

class Contact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <Navbar />
        <div className="contact_container">
          <div className="contact_wrapper">
            <h4 className="contact_heading1">Get in touch</h4>
            <div className="contact_formWrapper">
              <div className="detcontaindiv">
              <a className="detcontact" href="mailto:info@rehamo.shop"><span><i className="material-icons contactdeticon">email</i></span></a>
               <a className="detcontact" href="tel:+919742702222"><span><i className="material-icons contactdeticon">phone</i></span></a>
              </div>
            
              <p className="contact_label margtop">Name</p>
              <input type="text" className="contact_input" name="name"/>
              <p className="contact_label">Contact number</p>
              <input type="text" className="contact_input" name="email"/>
              <p className="contact_label">Email</p>
              <input type="text" className="contact_input" name="phone"/>
              <p className="contact_label">Message</p>
              <textarea name="message" rows="10" cols="50" className="contact_message">
              </textarea>
              <div className="contact_row">
                <input type="checkbox" className="contact_checkBox"/>
                <p className="contact_checkboxText">I Agree to the Terms and Conditions</p>
              </div>
              <button className="contact_button">SUBMIT</button>
            </div>
          </div>

          <div className="flexible-container">
          <iframe className="contactmapinside" width="100%" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15550.129992105205!2d77.5501001!3d13.0017259!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xf075e3a80d3d9ad!2sRehamo!5e0!3m2!1sen!2sin!4v1641644599990!5m2!1sen!2sin"></iframe>
        </div>

        </div>
        <Footer />
      </>
    );
  }
}


export default Contact;
