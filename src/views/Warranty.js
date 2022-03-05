import React from "react";
import OtpInput from 'react-otp-input';

import Navbar from "../components/Navbars/Navbar";

import Footer from "../components/Footer/Footer";


import $ from 'jquery'

import "../assets/css/warranty.css";
import "../components/Component5/Component5.css"

const axios = require('axios').default


class Warranty extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      progress : 1,
      name:'',
      phone:'',
      email:'',
      productname:'',
      purchasedfrom:'',
      orderid:'',
      invoiceid:'',
      // formData : {
      //   firstName : 'alpha',
      //   lastName : 'beta',
      //   email : 'gamma@gmail',
      //   phoneNo : 'delta',
      //   purchasedFrom : 'sdada',
      //   purchasedDate : 'asdad',
      //   invoice : 'asdadsa',
      //   prodName : 'asdas',
      //   receiveUpdates : 'sadsad',
      //   agreePrviacyPolicy : 'adsads'
      // }
    };
  }
  

                    
  handleCallback1 = (childData) =>{
    this.setState({
      formData : childData
    })

    this.setState({
      progress : 2
    })
  }

  handleCallback2 = (childData) =>{
    this.setState({
      otp : childData
    })

    this.setState({
      progress : 3,
    })
  }

  changeState2 = () =>{
    this.setState({
      progress : 2
    })
  }

  changeState3 = () =>{
    this.setState({
      progress : 3
    })
  }

  handleSelect = (name, value) => {
    console.log(name,value)
    this.setState({ [name]: value.target.value });
  }

  componentDidMount(){


    var modal = document.querySelectorAll('.modal')

    var globalthis = this

    this.submitfunc = async () => {
      test()
    }

    var otpresendbtn = document.getElementById('otpresendbtn');
    otpresendbtn.addEventListener('click', function (event) {
      checkandsendOTP()
      otptimer()
    })



    $('#progress1').show()
    $('#progress2').hide()
    $('#progress3').hide()

     
      var interval= null;
      function otptimer(){
        clearInterval(interval);
        var counter = 60;
        interval = setInterval(function() {
            counter--;
            // Display 'counter' wherever you want to display it.
            if (counter <= 0) {
                clearInterval(interval);
                $('#otperrorspan').html("");
                $('#otptimer').hide();
                $('#otpresendbtn').prop('disabled', false);
                return;
            }else{
              $('#otptimer').show();
              $('#timerspan').html(counter);
              $('#otpresendbtn').prop('disabled', true);
            }
        }, 1000);
      }

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

      function generateOTP(len)
        {
            var digits = '0123456789';
            var otpLength = len;
            var otp = '';
            for(let i=1; i<=otpLength; i++)
            {
                var index = Math.floor(Math.random()*(digits.length));
                otp = otp + digits[index];
            }
            return otp;
        }

      var userid = randomString(20)

      function test()
      {
        var productselect = document.getElementById('wproductselect').value

        var fromselect = document.getElementById('fromselect')
        var fromselectval =
        fromselect.options[fromselect.selectedIndex].value
        var isFormValid = true;

          $(".warranty_input").each(function(){
              if ($.trim($(this).val()).length == 0){
                  $(this).addClass("borderBottomDanger");
                  isFormValid = false;
              }
              else{
                  $(this).removeClass("borderBottomDanger");
              }
          });
          
              if (!isFormValid) { 
                $('#werrorspan').html("Please fill in all the fields");
              }else{
                if(fromselectval != ''){
                  if(productselect != ''){
                    $('#werrorspan').html("");
                    
                    checkandsendOTP()
                    otptimer()
                    $('#progress1').hide()
                    $('#progress2').show()
                    globalthis.setState({progress:2})
                    return isFormValid;
                  }else{
                    $('#werrorspan').html("Please select a store");
                  }
                  
                }else{
                  $('#werrorspan').html("Please select a product");
                }
              }
        }


        function checkandsendOTP(){
          var productselect = document.getElementById('wproductselect').value

        var fromselect = document.getElementById('fromselect')
        var fromselectval =
        fromselect.options[fromselect.selectedIndex].value
        
                    var customername = $('#wcustomername').val()
                    var wmobilenumber = $('#wmobilenumber').val()
                    var wemail = $('#wemail').val()
                    var wdate = $('#wdate').val()
                    var worderid = $('#worderid').val()
                    var winvoicenumber = $('#winvoicenumber').val()

                    globalthis.setState({name:customername})
                    globalthis.setState({phone:wmobilenumber})
                    globalthis.setState({email:wemail})
                    globalthis.setState({productname:productselect})
                    globalthis.setState({purchasedfrom:fromselectval})
                    globalthis.setState({orderid:worderid})
                    globalthis.setState({invoiceid:winvoicenumber})
                    //console.log(customername, wmobilenumber, wemail, worderid, winvoicenumber)
                    var today = new Date().toLocaleString().replace(',', '')
                    var otp = generateOTP(4)
                    //console.log(otp)
                    axios
                      .post('/api/checkuser', {
                        UserID: userid,
                        UserName: customername,
                        UserNumber: wmobilenumber,
                        UserEmail: wemail,
                        OriginDate: wdate,
                        RegisteredDate: today,
                      })
                      .then(function (response) {
                        console.log(response)
                        if (response.data.Status === 'user added' || response.data.Status === 'user exists') {
                          if(response.data.Status === 'user added'){

                          }else{
                            userid = response.data.user.UserID;
                          }
                          
                          axios
                            .post('/api/addorder', {
                              UserID: userid,
                              UserName: customername,
                              OrderID: worderid,
                              InvoiceID: winvoicenumber,
                              UserEmail: wemail,
                              UserNumber: wmobilenumber,
                              Product: productselect,
                              ProductOrigin: fromselectval,
                              OrderOTP:otp,
                              RegisteredDate: today,
                            })
                            .then(function (response) {
                              console.log(response)
                              if (response.data.Status === 'added') {
                                //console.log('registered');
                              }
                            })
                            .catch(function (error) {
                              console.log(error)
                              $('#otperrorspan').html("Error Please try again");
                            })
                          
                        } 
                      })
                      .catch(function (error) {
                        console.log(error)
                        $('#otperrorspan').html("Error Please try again");
                      })
        }
        
        $("#otpverifybtn").click(function(){
          $('#otperrorspan').html("Please Wait");
          $('#otpverifybtn').prop('disabled', true);
          var customername = $('#wcustomername').val()
          var wmobilenumber = $('#wmobilenumber').val()
          var wemail = $('#wemail').val()
          var worderid = $('#worderid').val()
          var enteredotp = $('#otp-number-input-1').val() + $('#otp-number-input-2').val() + $('#otp-number-input-3').val() + $('#otp-number-input-4').val()
          //console.log(customername, wmobilenumber, wemail, worderid, winvoicenumber)
          var today = new Date().toLocaleString().replace(',', '')
          axios
          .post('/api/checkotp', {
            UserID: userid,
            OrderID: worderid,
            UserNumber: wmobilenumber,
            UserEmail: wemail,
            EnteredOTP: enteredotp,
            VerifiedDate: today,
          })
          .then(function (response) {
            console.log(response)
            if (response.data.Status === 'verified') {
              $('#otperrorspan').html("Verified");
              $('#otpverifybtn').prop('disabled', false);
              console.log('verified');
              //modal[0].style.display = 'none'
              //$('#statusspan').html("Thank you for submitting your order details. We will get back to you with warranty activation status in next 48 hours");
              //modal[1].style.display = 'block'

              $('#progress1').hide()
              $('#progress2').hide()
              $('#progress3').show()
              globalthis.setState({progress:3})

              $('#otperrorspan').html("");
              $('#wcustomername').val('')
              $('#wmobilenumber').val('')
              $('#wemail').val('')
              $('#worderid').val('')
              $('#otp-number-input-1').val('')
              $('#otp-number-input-2').val('')
              $('#otp-number-input-3').val('')
              $('#otp-number-input-4').val('')
              
            } else if (response.data.Status === 'mismatch') {
              $('#otperrorspan').html("OTP Mismatch, Check the code you entered");
              $('#otpverifybtn').prop('disabled', false);
            }
          })
          .catch(function (error) {
            console.log(error)
            //modal[0].style.display = 'none'
              $('#otperrorspan').html("Sorry, we could not process your request.");
              //modal[1].style.display = 'block'
          })

      });


      var btnenabled = false;
    $('#agree-checkbox').change(function () {
      if(btnenabled === true){
        $('#submitbtn').prop('disabled', true); //TO DISABLED
        btnenabled = false;
        
      }else{
        $('#submitbtn').prop('disabled', false); //TO ENABLE
        btnenabled = true;
      }
   });

   $('#otp-number-input-1').on('keyup', function() {
    let ele = $('#otp-number-input-1').val().replace(/[^0-9]/g,'');
    if(ele != ''){
      $('#otp-number-input-2').focus()
    }else if(ele == ''){
      $('#otp-number-input-1').focus()
    } 
  })

  
  
  $('#otp-number-input-2').on('keyup', function(event) {
    let ele = $('#otp-number-input-2').val().replace(/[^0-9]/g,'');
    
    if(ele != ''){
      $('#otp-number-input-3').focus()
    }else if(ele == ''){
      if(event.which == 8) {
        //alert('backspace pressed');
        $('#otp-number-input-1').focus()
        }else{
          $('#otp-number-input-2').focus()
        }  
    } 
  })

  $('#otp-number-input-3').on('keyup', function(event) {
    let ele = $('#otp-number-input-3').val().replace(/[^0-9]/g,'');
    
    if(ele != ''){
      $('#otp-number-input-4').focus()
    }else if(ele == ''){
      if(event.which == 8) {
        //alert('backspace pressed');
        $('#otp-number-input-2').focus()
        }else{
          $('#otp-number-input-3').focus()
        } 
    } 
  })

  

  $('#otp-number-input-4').on('keyup', function(event) {
    let ele = $('#otp-number-input-4').val().replace(/[^0-9]/g,'');
    otpinputtest()
    if(ele != ''){
      //$('#otp-number-input-3').focus()
    }else if(ele == ''){
      if(event.which == 8) {
        //alert('backspace pressed');
        $('#otp-number-input-3').focus()
        }else{
          $('#otp-number-input-4').focus()
        } 
    } 
  })

  function otpinputtest()
      {

        var isFormValidOTP = true;

          $(".otp-number-input").each(function(){
              if ($.trim($(this).val()).length == 0){
                  isFormValidOTP = false;
                  $(this).focus()
              }
              else{

              }
          });
          
              if (!isFormValidOTP) { 
                $('#otperrorspan').html("Please enter the OTP");
                $('#otpverifybtn').prop('disabled', true);
              }else{
                $('#otperrorspan').html("");
                $('#otpverifybtn').prop('disabled', false);
                return isFormValidOTP;
              }
            
        
          
        }

        this.mailnow = async () => {
          modal[2].style.display = 'block'
        };

        this.closemodal2 = async () => {
          modal[2].style.display = 'none'
        };
  
        
  }

  render() {
    console.log(this.state);
    return (
      <>
        <Navbar />

        <div className="modal">

        <div className="enquirerentalmodal" id="enquirerentalmodal">
          <button id="modal-close-btn" onClick={()=>this.closemodal2()} className="modal-close-btn"  >
          <i className="material-icons modalclose">close</i>
          </button>

          <div className="enquiry_wrapper">
          <h4 className="enquiry_heading1">Fill in your details</h4>
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

          </div>
          </div>

        <div className="warrantyProgress_wrapper">
          <div className={this.state.progress == 1 ? 'warrantyProgress_greenBg warrantyProgress_greenBg1' : this.state.progress == 2 ? "warrantyProgress_greenBg warrantyProgress_greenBg2" : 'warrantyProgress_greenBg warrantyProgress_greenBg3'}>
            {this.state.progress == 1 ? <div className="warrantyProgress_circleGreen">1</div> : <div className="warrantyProgress_circleGreen"><img src={require('../assets/icons/tick.png')} className="warrantyProgress_img" /></div>}
            {this.state.progress == 1 ? <div className="warrantyProgress_circleGrey">2</div> : this.state.progress == 2 ? <div className="warrantyProgress_circleGreen">2</div> : <div className="warrantyProgress_circleGreen"><img src={require('../assets/icons/tick.png')} className="warrantyProgress_img" /></div>}
            {this.state.progress == 3 ? <div className="warrantyProgress_circleGreen"><img src={require('../assets/icons/tick.png')} className="warrantyProgress_img" /></div> : <div className="warrantyProgress_circleGrey">3</div>}
          </div>
        </div>
        
        
            <div id="progress1" className="warranty_progress1FormWrapper">
              <div className="warranty_row">
                <input
                    type="text"
                    id="wcustomername"
                    placeholder="Customer Name"
                    className="warranty_input"
                  />
                <input
                    type="text"
                    id="wmobilenumber"
                    placeholder="Mobile Number"
                    className="warranty_input"
                  />
              </div>
              <div className="warranty_row">
              
                <input
                    type="email"
                    id="wemail"
                    placeholder="Email"
                    className="warranty_input"
                  />
                  <input
                    type="text"
                    id="wproductselect"
                    placeholder="Product Name"
                    className="warranty_input"
                  />
              </div>
              <div className="warranty_row">
                <select
                    id="fromselect"
                    className="warranty_input"
                  >
                    <option value="">Purchased From</option>
                    <option value="Amazon">
                      Amazon
                    </option>
                    <option value="Flipkart">
                      Flipkart
                    </option>
                    <option value="Snapdeal">
                    Snapdeal
                    </option>
                    <option value="PayTM">
                    PayTM
                    </option>
                    <option value="Others">
                      Others
                    </option>
            </select>
                <input type='date' id='wdate' className="warranty_input" placeholder="Purchased Date"  name='purchasedDate'/>
              </div>
              <div className="warranty_row">
                  <input
                    type="text"
                    id="worderid"
                    placeholder="Order id"
                    className="warranty_input"
                  />
                  <input
                        type="text"
                        id="winvoicenumber"
                        placeholder="Invoice No."
                        className="warranty_input"
                      />
              </div>
              <div className="warranty_row">
                <div className="warranty_checkboxContainer">
                  <input id="update-checkbox" type='checkbox' name='receiveUpdates' /><p className="warranty_checkboxText">Do you like to receive updates from us?</p> 
                </div>
                <div className="warranty_checkboxContainer">
                  <input id="agree-checkbox" type='checkbox' name='agreePrviacyPolicy' /><p className="warranty_checkboxText">Agree to our Privacy Policy and Terms & Conditions.</p> 
                </div>
              </div>
              <div className="text-muted text-center">
                      <small>
                        <span id="werrorspan" className="text-danger text-center text-bold"></span>
                      </small>
                    </div>
              <div className="warranty_row warranty_justifyCenter">
                <button className="warranty_button" onClick={()=>this.submitfunc()} id="submitbtn">SUBMIT</button>
              </div>
            </div>
            

            <div id="progress2" className="warrantyProgress2_wrapper">
              <h1 className="wp2_heading1">Enter Verification Code</h1>
              <h3 className="wp2_heading2">Either from email or mobile</h3>
              <div className="wp2_otpWrapper">
                <div className="content">
                  <input type="text" id="otp-number-input-1" className="otp-number-input"  maxLength="1"  pattern="[0-9]*"/>
                  
                  <input type="text" id="otp-number-input-2" className="otp-number-input" maxLength="1"  pattern="[0-9]*"/>
                  
                  <input type="text" id="otp-number-input-3" className="otp-number-input" maxLength="1"  pattern="[0-9]*"/>
                  
                  <input type="text" id="otp-number-input-4" className="otp-number-input" maxLength="1"  pattern="[0-9]*"/>     
            </div>
              </div>

              <div className="text-muted text-center">
                  <small>
                    <span id="otperrorspan" className="text-danger text-center text-bold"></span>
                  </small>
                </div>

                  <p className="wp2_link" id="otptimer">Didn’t get OTP? Resend in <span className="timerspan" id="timerspan">60</span> seconds</p>
              
              <p className="wp2_link" id="otptimer">If you did not recieve the OTP. Kindly fill this <span className="fontbold" onClick={()=>this.mailnow()} >form</span></p>
              <button className="wp2_button" id="otpverifybtn">Verify</button>
              <button className="wp2_button" id="otpresendbtn">Resend OTP</button>
            </div>

            <div id="progress3">
            <div className="wp3_upperWrapper">
          <img className="wp3_img" src={require('../assets/icons/warrantyProgress3_tick.png')} />
          <div className="wp3_contentWrapper">
            <h1 className="wp2_heading1">Congratulation</h1>
            <h3 className="wp2_heading3">Check your email and phone for reference number</h3>
            <div className="wp2_linkWrapper wp3_width">
              <p className="wp2_link wp3_width">Did not get notification?</p>
              <span className="wp2_vl" style={{ width: '0.1vw', marginRight: '1vw'}}></span>
              <a href="#" className="wp2_link wp3_width">Contact us</a>
              <span className="wp2_vl" style={{ width: '0.1vw', marginRight: '1vw'}}></span>
              <a href="enquiry" className="wp2_link wp3_width">Enquire Now</a>
            </div>
          </div>
        </div>

        <div  className="wp2_lowerWrapper">
          <h3 className="wp3_heading">Warranty Details</h3>

          
          <div className="wp3_row">
            <p className="wp3_title">Full Name</p>
            <p className="wp3_colon">:</p>
            <p className="wp3_text">{this.state.name}</p>
          </div>
          <div className="wp3_row">
            <p className="wp3_title">Phone No.</p>
            <p className="wp3_colon">:</p>
            <p className="wp3_text">{this.state.phone}</p>
          </div>
          <div className="wp3_row">
            <p className="wp3_title">Email Address</p>
            <p className="wp3_colon">:</p>
            <p className="wp3_text">{this.state.email}</p>
          </div>
          <div className="wp3_row">
            <p className="wp3_title">Purchased from?</p>
            <p className="wp3_colon">:</p>
            <p className="wp3_text">{this.state.purchasedfrom}</p>
          </div>
          <div className="wp3_row">
            <p className="wp3_title">Purchased Date </p>
            <p className="wp3_colon">:</p>
            <p className="wp3_text">{this.state.purchaseddate}</p>
          </div>
          <div className="wp3_row">
            <p className="wp3_title">Invoice number</p>
            <p className="wp3_colon">:</p>
            <p className="wp3_text">{this.state.invoiceid}</p>
          </div>
          <div className="wp3_row">
            <p className="wp3_title">Order ID</p>
            <p className="wp3_colon">:</p>
            <p className="wp3_text">{this.state.orderid}</p>
          </div>
          <div className="wp3_row">
            <p className="wp3_title">Product Name</p>
            <p className="wp3_colon">:</p>
            <p className="wp3_text">{this.state.productname}</p>
          </div>
        </div>
        </div>
            
        <Footer />
      </>
    );
  }
}

class Progress1 extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      receiveUpdates : false,
      agreePrviacyPolicy : false,
    }
    }

  handleChange(event){
    this.setState({
     [event.target.name] : event.target.value
    })
  }

  handleCheckboxChange(event){
    this.setState({
     [event.target.name] : !this.state[event.target.name]
    })
  }

  onSubmit = () => {
    this.props.callback(this.state);
  }

  render(){
    return(
      <>
        {/*<h2 className="warranty_heading">Product Categories</h2>

        <div className="compo5_wrapper">
          <Compo5card
            img={require('../assets/img/compo5/reticon7.png')}
            text={'Orthotics'}
          />
            
          <Compo5card
            img={require('../assets/img/compo5/reticon2.png')}
            text={'Pediatric'}
          />
            
          <Compo5card
            img={require('../assets/img/compo5/reticon3.png')}
            text={'Mobility'}
          />
            
          <Compo5card
            img={require('../assets/img/compo5/reticon4.png')}
            text={'WheelChairs'}
          />
            
          <Compo5card
            img={require('../assets/img/compo5/reticon5.png')}
            text={'Assisted Living'}
          />
            
          <Compo5card
            img={require('../assets/img/compo5/reticon6.png')}
            text={'Beds & Transfers'}
          />
            
    </div>
        <div className="compo5_innerWrapper"></div>
*/}


        
      </>
    )
  }
}

class Progress2 extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      otp : ''
    }
  }

  handleChange = (otp) => this.setState({ otp });
  
  onSubmit = () => {
    this.props.callback(this.state);
  }

  render(){
    return(
      <>
       <div className="warrantyProgress2_wrapper">
         <h1 className="wp2_heading1">Enter Verification Code</h1>
         <h3 className="wp2_heading2">Either from email or mobile</h3>
         <div className="wp2_otpWrapper">
          <OtpInput
            value={this.state.otp}
            onChange={this.handleChange}
            numInputs={4}
            inputStyle="wp_otpInput"
          />
         </div>
         <h3 className="wp2_heading3">Didn’t you recieved any code?</h3>
         <div className="wp2_linkWrapper">
            <a href="#" className="wp2_link">Resend new code</a>
            <span className="wp2_vl"></span>
            <a href="enquiry" className="wp2_link">Enquire Now</a>
         </div>
         <button className="wp2_button" onClick={this.onSubmit}>SUBMIT</button>
       </div>
      </>
    )
  }
}

class Progress3 extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    return(
      <>
        <div className="wp3_upperWrapper">
          <img className="wp3_img" src={require('../assets/icons/warrantyProgress3_tick.png')} />
          <div className="wp3_contentWrapper">
            <h1 className="wp2_heading1">Congratulation</h1>
            <h3 className="wp2_heading3">Check your email and phone for reference number</h3>
            <div className="wp2_linkWrapper wp3_width">
              <p className="wp2_link wp3_width">Did not get notification?</p>
              <span className="wp2_vl" style={{ width: '0.1vw', marginRight: '1vw'}}></span>
              <a href="#" className="wp2_link wp3_width">Contact us</a>
              <span className="wp2_vl" style={{ width: '0.1vw', marginRight: '1vw'}}></span>
              <a href="enquiry" className="wp2_link wp3_width">Enquire Now</a>
            </div>
          </div>
        </div>

        <div className="wp2_lowerWrapper">
          <h3 className="wp3_heading">Warranty Details</h3>

          
          <div className="wp3_row">
            <p className="wp3_title">Full Name</p>
            <p className="wp3_colon">:</p>
            <p className="wp3_text">{this.props.details.firstName} {this.props.details.lastName}</p>
          </div>
          <div className="wp3_row">
            <p className="wp3_title">Phone No.</p>
            <p className="wp3_colon">:</p>
            <p className="wp3_text">{this.props.details.phoneNo}</p>
          </div>
          <div className="wp3_row">
            <p className="wp3_title">Email Address</p>
            <p className="wp3_colon">:</p>
            <p className="wp3_text">{this.props.details.email}</p>
          </div>
          <div className="wp3_row">
            <p className="wp3_title">Purchased from?</p>
            <p className="wp3_colon">:</p>
            <p className="wp3_text">{this.props.details.purchasedFrom}</p>
          </div>
          <div className="wp3_row">
            <p className="wp3_title">Purchased Date </p>
            <p className="wp3_colon">:</p>
            <p className="wp3_text">{this.props.details.purchasedDate}</p>
          </div>
          <div className="wp3_row">
            <p className="wp3_title">Invoice number</p>
            <p className="wp3_colon">:</p>
            <p className="wp3_text">{this.props.details.invoice}</p>
          </div>
          <div className="wp3_row">
            <p className="wp3_title">Product Name</p>
            <p className="wp3_colon">:</p>
            <p className="wp3_text">{this.props.details.prodName}</p>
          </div>
        </div>
      </>
    )
  }
}

class Compo5card extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <>
        <div className="compo5card_wrapper">
            <div className="compo5card_imgWrapper">
              <img src={this.props.img} className="compo5card_img" />
            </div>
            <p className="compo5card_text">{this.props.text}</p>   
        </div>
      </>
    )
  }
}

export default Warranty;
