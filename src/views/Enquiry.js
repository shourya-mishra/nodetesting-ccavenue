import React from "react";

import Navbar from "../components/Navbars/Navbar";

import Footer from "../components/Footer/Footer";

import "../assets/css/enquiry.css";

class Enquiry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <Navbar />
        <div className="enquiry_wrapper">
          <h4 className="enquiry_heading1">Enquire Now</h4>
          <h4 className="enquiry_heading2">we will get back to you</h4>
          <div className="enquiry_formWrapper">
            <p className="enquiry_label">Name</p>
            <input type="text" className="enqyiry_input" name="name"/>
            <p className="enquiry_label">Email</p>
            <input type="text" className="enqyiry_input" name="email"/>
            <p className="enquiry_label">Phone</p>
            <input type="text" className="enqyiry_input" name="phone"/>
            <div className="enquiry_row">
              <div class="enquiry_col">
                <p className="enquiry_label">Pin</p>
                <input type="text" className="enqyiry_input enquiry_widthSmall" name="pin"/>
              </div>
              <div class="enquiry_col">
                <p className="enquiry_label">City</p>
                <input type="text" className="enqyiry_input enquiry_widthMedium" name="city"/>
              </div>
            </div>
            <p className="enquiry_label">Message</p>
            <textarea name="message" rows="10" cols="50" className="enqyiry_input">
            </textarea>

            <button className="enquiry_button">Submit</button>
          </div>
        </div>
        <Footer />
      </>
    );
  }
}


export default Enquiry;
