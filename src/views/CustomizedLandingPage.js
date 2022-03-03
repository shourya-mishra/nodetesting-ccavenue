import React from "react";
import { Container, Row, Col } from "reactstrap";


import $ from 'jquery'
import Navbar from "../components/Navbars/Navbar";

import Footer from "../components/Footer/Footer";

import "../assets/css/customizedLandingPage.css";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from 'react-accessible-accordion';


const axios = require('axios').default

class CustomizedLandingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount(){

    var modal = document.querySelectorAll('.modal')

    var globalthis = this

    this.openenquiry = async () => {
      modal[2].style.display = 'block'
    };

    this.closemodal2 = async () => {
      modal[2].style.display = 'none'
    };

    var randomString = function (len, bits) {
      bits = bits || 36
      var outStr = '',
        newStr
      while (outStr.length < len) {
        newStr = Math.random().toString(bits).slice(2)
        outStr += newStr.slice(0, Math.min(newStr.length, len - outStr.length))
      }
      return outStr.toUpperCase()
    }

    function validateEmail(email){
      return email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
    };

    this.enquirysubmit = async (item) => {
      ////console.log(item)
      var enquriyem = document.getElementById("enquiryemail").value;
      var enquriyn = document.getElementById("enquiryname").value;
      var enquriyms = document.getElementById("enquirymessage").value;
      var enquriycn = document.getElementById("enquiryphone").value;
      var enquriycity = document.getElementById("enquirycity").value;
      var enquriypin = document.getElementById("enquirypin").value;

      var productn = globalthis.state.productname
      var productid = globalthis.state.productid

      if(validateEmail(enquriyem)){

      if (enquriyem !== "" && enquriyn !== "" && enquriyms !== "" &&  enquriycn !== "" ) {
        $('.meter').show()
          var maillist = [
            'info@rehamo.com',
          ];
    
          var emaildata =''
        
          emaildata += '<div>'
          emaildata +='<p>Customise Enquiry</p>'
          emaildata +='<p>Details</p>'
          emaildata +='<p>Name: '+enquriyn+'</p>'
          emaildata +='<p>Email: '+enquriyem+'</p>'
          emaildata +='<p>Product: '+productn+'</p>'
          emaildata +='<p>Product ID: '+productid+'</p>'
          emaildata +='<p>Contact Number: '+enquriycn+'</p>'
          emaildata +='<p>City: '+enquriycity+'</p>'
          emaildata +='<p>Pin: '+enquriypin+'</p>'
          emaildata +='<p>Message: '+enquriyms+'</p>'
          emaildata += '</div>'

        axios
          .post("https://admin.rehamo.com/api/addenquiry", {
            EnquiryID: randomString(20),
            EnquiryEmail: enquriyem,
            EnquiryName: enquriyn,
            EnquiryMessage: enquriyms,
            EnquiryPhone: enquriycn,
            EnquiryCity: enquriycity,
            EnquiryPin: enquriypin,
            EnquiryType: 'Customise',
            ProductName: productn,
            ProductID: productid,
          })
          .then(function (response) {
            //console.log(response)
            if (response.data === "done") {
              ////console.log('registered');

              axios
                .post('https://admin.rehamo.com/api/sendmail', {
                to: maillist,
                body:
                    `<!doctype html><html> <head> <meta name="viewport" content="width=device-width"> <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"> <title>Rehamo Enquiry Received</title> <style> @media only screen and (max-width: 620px) { table[class=body] h1 { font-size: 28px !important; margin-bottom: 10px !important; } table[class=body] p, table[class=body] ul, table[class=body] ol, table[class=body] td, table[class=body] span, table[class=body] a { font-size: 16px !important; } table[class=body] .wrapper, table[class=body] .article { padding: 10px !important; } table[class=body] .content { padding: 0 !important; } table[class=body] .container { padding: 0 !important; width: 100% !important; } table[class=body] .main { border-left-width: 0 !important; border-radius: 0 !important; border-right-width: 0 !important; } table[class=body] .btn table { width: 100% !important; } table[class=body] .btn a { width: 100% !important; } table[class=body] .img-responsive { height: auto !important; max-width: 100% !important; width: auto !important; } } /* ------------------------------------- PRESERVE THESE STYLES IN THE HEAD ------------------------------------- */ @media all { .ExternalClass { width: 100%; } .ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div { line-height: 100%; } .apple-link a { color: inherit !important; font-family: inherit !important; font-size: inherit !important; font-weight: inherit !important; line-height: inherit !important; text-decoration: none !important; } #MessageViewBody a { color: inherit; text-decoration: none; font-size: inherit; font-family: inherit; font-weight: inherit; line-height: inherit; } .btn-primary table td:hover { background-color: #626262 !important; } .btn-primary a:hover { background-color: #626262 !important; border-color: #626262 !important; } } </style> </head> <body class="" style="background-color: #f6f6f6; font-family: sans-serif; -webkit-font-smoothing: antialiased; font-size: 14px; line-height: 1.4; margin: 0; padding: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;"> <table border="0" cellpadding="0" cellspacing="0" class="body" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; background-color: #f6f6f6;"> <tr> <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;">&nbsp;</td> <td class="container" style="font-family: sans-serif; font-size: 14px; vertical-align: top; display: block; Margin: 0 auto; max-width: 580px; padding: 10px; width: 580px;"> <div class="content" style="box-sizing: border-box; display: block; Margin: 0 auto; max-width: 580px; padding: 10px;"> <!-- START CENTERED WHITE CONTAINER --> <span class="preheader" style="color: transparent; display: none; height: 0; max-height: 0; max-width: 0; opacity: 0; overflow: hidden; mso-hide: all; visibility: hidden; width: 0;">Rehamo: Enquiry Received</span> <table class="main" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; background: #ffffff; border-radius: 3px;"> <!-- START MAIN CONTENT AREA --> <tr> <td class="wrapper" style="font-family: sans-serif; font-size: 14px; vertical-align: top; box-sizing: border-box; padding: 20px;"> <table border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;"> <tr> <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;"> <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px;">Rehamo,</p> <div style="font-family: sans-serif; font-size: 12px; font-weight: normal; margin: 0; Margin-bottom: 15px;">`
                    +emaildata+`</div> <table border="0" cellpadding="0" cellspacing="0" class="btn btn-primary" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; box-sizing: border-box;"> <tbody> <tr> <td align="left" style="font-family: sans-serif; font-size: 14px; vertical-align: top; padding-bottom: 15px;"> <table border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: auto;"> <tbody> <tr> <td style="font-family: sans-serif; font-size: 14px; vertical-align: top; background-color: #3498db; border-radius: 0px; text-align: center;"> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> <p style="font-family: sans-serif; font-size: 12px; color:#727272; font-weight: normal; margin: 0; Margin-bottom: 5px; Margin-top: 15px;"><strong>Do Not Share The Email</strong></p> <p style="font-family: sans-serif; font-size: 11px; color:#727272; font-weight: normal; margin: 0; Margin-bottom: 15px;">This email consists a secure link to Rehamo, Please do not share this email, link or access code with others.</p><p style="font-family: sans-serif; font-size: 12px; color:#727272; font-weight: normal; margin: 0; Margin-bottom: 5px;"><strong>Questions about the Email?</strong></p><p style="font-family: sans-serif; font-size: 11px; color:#727272; font-weight: normal; margin: 0; Margin-bottom: 15px;">If you need to modify the email or have questions about the email, Please reach out to support@circleof.life by emailing them directly</p> </td> </tr> </table> </td> </tr> <!-- END MAIN CONTENT AREA --> </table> <!-- START FOOTER --> <div class="footer" style="clear: both; Margin-top: 10px; text-align: center; width: 100%;"> <table border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;"> <tr> <td class="content-block powered-by" style="font-family: sans-serif; vertical-align: top; padding-bottom: 10px; padding-top: 10px; font-size: 12px; color: #999999; text-align: center;"> Powered by <a href="https://www.rehamo.com" style="color: #2782b8; font-size: 12px; text-align: center; text-decoration: none;">Rehamo</a>. </td> </tr> </table> </div> <!-- END FOOTER --> <!-- END CENTERED WHITE CONTAINER --> </div> </td> <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;">&nbsp;</td> </tr> </table> </body></html>`,
                subject: 'Rehamo: Customise Enquiry',
                })
                .then(function (response) {
                //console.log(response)
                modal[2].style.display = "none";
                $('.meter').hide()
                //alert('Thank you for showing interest in our club, We will get back to you shortly.');
                alert(
                  "Your enquiry has been submitted, We will get back to you."
                );

                //window.location.hash = "#/auth/login";
                })
                .catch(function (error) {
                  $('.meter').hide()
                console.log(error)
                //document.getElementById('mainerrorspan').innerHTML = error
                })


              
            }
          })
          .catch(function (error) {
            $('.meter').hide()
            //console.log(error)
            //document.getElementById("loginregistererrorspan").innerHTML = error;
          });
           

      }else {
        $('.meter').hide()
        alert("Please fill all the details");
      }


      } else {
        $('.meter').hide()
        alert("Please enter a valid email");
      }
    };




  }

  render() {
    return (
      <>

        <Navbar />

        <div className="modal">

        <div className="enquirerentalmodal" id="enquirerentalmodal">
          <button id="modal-close-btn" onClick={()=>this.closemodal2()} className="modal-close-btn"  >
          <i className="material-icons modalclose">close</i>
          </button>

          <div className="enquiry_wrapper">
          <h4 className="enquiry_heading1">Enquire Now</h4>
          <h4 className="enquiry_heading2">we will get back to you</h4>
          <div className="enquiry_formWrapper">
            <p className="enquiry_label">Name</p>
            <input type="text" className="enqyiry_input" id="enquiryname" name="name"/>
            <p className="enquiry_label">Email</p>
            <input type="text" className="enqyiry_input" id="enquiryemail" name="email"/>
            <p className="enquiry_label">Phone</p>
            <input type="text" className="enqyiry_input" id="enquiryphone" name="phone"/>
            <div className="enquiry_row">
              <div class="enquiry_col">
                <p className="enquiry_label">Pin</p>
                <input type="text" className="enqyiry_input enquiry_widthSmall" id="enquirycity" name="pin"/>
              </div>
              <div class="enquiry_col">
                <p className="enquiry_label">City</p>
                <input type="text" className="enqyiry_input enquiry_widthMedium" id="enquirypin" name="city"/>
              </div>
            </div>
            <p className="enquiry_label">Message</p>
            <textarea name="message" rows="10" cols="50" id="enquirymessage" className="enqyiry_input">
            </textarea>
            <div className="meter">
              <span><span class="progress"></span></span>
          </div>

            <button className="enquiry_button" onClick={()=>this.enquirysubmit()}>Submit</button>
          </div>
        </div>

          </div>
          </div>


        <Container className="clp_wrapper">
          <img className="clp_banner" onClick={()=>window.location.href='/customised?cat=All&sub=All'} src={require('../assets/img/customizedLandingPage/banner.png')} />
          <div className="clp_banner2Container">
            <div className="clp_container1" onClick={()=>window.location.href='/customised?cat=Wheelchairs&sub=All'}>
              <img className="clp_img1" src={require('../assets/img/customizedLandingPage/wheelchair.png')} />
              <div className="clp_containerRight">
                <h2 className="clp_heading1">CUSTOMIZE YOUR</h2>
                <h3 className="clp_heading2">WHEELCHAIRS</h3>
              </div>
            </div>
            <div className="clp_container2" onClick={()=>window.location.href='/customised?cat=Orthotics&sub=All'}>
              <img className="clp_img1" src={require('../assets/img/customizedLandingPage/prosthetic.png')} />
              <div className="clp_containerRight">
                <h2 className="clp_heading1">CUSTOMIZE</h2>
                <h3 className="clp_heading2">PROSTHETICS & ORTHOTICS</h3>
              </div>
            </div>
          </div>
          <div className="clp_container3">
            <div className="cpl_outerWrapper">
              <div className="clp_c3innerWrapper">
                <img className="clp_img2" src={require('../assets/img/customizedLandingPage/individualDesign.png')} />
                <div className="cpl_c3col">
                  <h3 className="clp_heading3 clp_red">Indevidually Design</h3>
                  <p className="clp_text">Designed By Our Wheelchair Expert</p>
                </div>
              </div>
              <div className="clp_c3innerWrapper">
                <img className="clp_img2" src={require('../assets/img/customizedLandingPage/uniqueToYou.png')} />
                <div className="cpl_c3col">
                  <h3 className="clp_heading3 clp_green">Unique To You</h3>
                  <p className="clp_text">Designed Uniquely Based On Your requirements</p>
                </div>
              </div>
            </div>
            <div className="cpl_outerWrapper">
              <div className="clp_c3innerWrapper">
                <img className="clp_img2" src={require('../assets/img/customizedLandingPage/handBuild.png')} />
                <div className="cpl_c3col">
                  <h3 className="clp_heading3 clp_blue">Hand Built</h3>
                  <p className="clp_text">Designed by well trained professionals</p>
                </div>
              </div>
              <div className="clp_c3innerWrapper">
                <img className="clp_img2" src={require('../assets/img/customizedLandingPage/oneYrWarranty.png')} />
                <div class="cpl_c3col">
                  <h3 className="clp_heading3 clp_orange">1 Year Warranty</h3>
                  <p className="clp_text">And Free Service For All The Rehamo Products</p>
                </div>
              </div>
            </div>
          </div>
          <div className="clp_container4">
            <img className="clp_img3" src={require('../assets/img/customizedLandingPage/quality tested.png')}/>
            <div>
              <h1 className="clp_heading4">Quality Tested</h1>
              <h2 className="clp_heading5">Best In Class Materials Built For Durability</h2>
            </div>
          </div>
<div className="productReview_row">
         <div className="productReview_Col_noBorder">
         <h3 className="cust_heading">Process<br className="mobileBreak"/> Flow</h3>
</div>

<div className="productReview_Col_bothBorder">
  <div className="cust_numberContainer">
   <h3 className="cust_number">01</h3>
   </div>
   <div>
   <h2 className="cust_subHeading">Choose the<br/>product.</h2>
<p className="cust_para">Visit our Rental Section and choose the specific product you need on a rental basis</p>
</div>
</div>
<div className="productReview_Col">
<h3 className="cust_number">02</h3>
<div>
<h2 className="cust_subHeading">Enquire about<br/>the product</h2>
<p className="cust_para">Contact us to enquire the product which you need on Rent. </p>
</div>
</div>
<div className="productReview_Col_noBorder">
<h3 className="cust_number cust_number3">03</h3>
<div>
<h2 className="cust_subHeading">Get the<br/>Product</h2>
<p className="cust_para">Once Enquired, You can visit our store or get the product delivered at your home.
(available in Bangalore location only)</p>
</div>
</div>
</div>
{/* <img className="clp_banner" src={require('../assets/img/customizedLandingPage/c.png')} /> */}
<Container className="cust_banner2">
  <Row>
<Col className="cust_leftBanner">
  <img className="cust_banner2_img" src={require('../assets/img/customizedLandingPage/wheelchair2.png')} />
  </Col>
  <Col className="cust_rightBanner">
  <h1 className="clp_heading4"><span className="black">Fill the form<br/>
for</span> Personal<br/>
Customization</h1><br/>
<div className="cust_clickBtn" onClick={()=>this.openenquiry()}><p className="cust_clickBtnText">CLICK HERE</p></div>
 </Col>
 </Row>
</Container>
</Container>
<p className="products_textfaq"><b className="products_textHeading">FAQ’s </b> (Frequently Asked Questions)</p>

          <div className="cust_acc_faq">
          <Accordion preExpanded={[0]} allowMultipleExpanded={true} className="accordIan">
           


            <AccordionItem>
                <AccordionItemHeading className="accordIanhead">
                <AccordionItemButton className="accordIanbtn">
                Can a pediatric deformity can be corrected by an orthotic products?

                    
                    <i class="material-icons accordianbtnicon">keyboard_arrow_right</i>
                    </AccordionItemButton>
                   
                </AccordionItemHeading>
                <AccordionItemPanel className="accordIanpanel">
                <p className="productfaqdetail">
                Does insoles help in reducing the pain, swelling of the foot?

                </p>
                </AccordionItemPanel>
            </AccordionItem>


            <AccordionItem>
                <AccordionItemHeading className="accordIanhead">
                <AccordionItemButton className="accordIanbtn">
                
Do you offer customization of orthotics products?

                    
                    <i class="material-icons accordianbtnicon">keyboard_arrow_right</i>
                    </AccordionItemButton>
                   
                </AccordionItemHeading>
                <AccordionItemPanel className="accordIanpanel">
                <p className="productfaqdetail">
                Yes, we provide select wheelchairs on Rent; however, it is currently
                restricted to Bangalore. Please refer to to our rental category to choose a
                suitable wheelchair.
                </p>
                </AccordionItemPanel>
            </AccordionItem>



            <AccordionItem>
                <AccordionItemHeading className="accordIanhead">
                <AccordionItemButton className="accordIanbtn">
                Do you provide services and after-sales services for wheelchairs?
                    
                    <i class="material-icons accordianbtnicon">keyboard_arrow_right</i>
                    </AccordionItemButton>
                   
                </AccordionItemHeading>
                <AccordionItemPanel className="accordIanpanel">
                <p className="productfaqdetail">
                Rehamo does provide sales and after-sales services for Rehamo Products
                only. Please get in touch with us to know if your product is viable for sales
                services. 
                </p>
                </AccordionItemPanel>
            </AccordionItem>
        </Accordion>
          </div>
          
        <Footer />
      </>
    );
  }
}

export default CustomizedLandingPage;
