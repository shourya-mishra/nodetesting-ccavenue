import React from 'react';
import uuid from 'react-uuid'

import "./checkout.css";
import { Container, Row, Col } from 'reactstrap';

import Cart from "../../components/Cart";
import $ from 'jquery'

import {DataContext} from '../../components/Context'

const axios = require('axios').default

class Checkout extends React.Component {

  static contextType = DataContext;

  constructor(props) {
    super(props);
    this.state = {
      fname:'',
      lname:'',
      email:'',
      number:'',
      street1:'',
      street2:'',
      locality:'',
      city:'',
      state:'',
      pincode:'',
      total:'',
      errortext:'Please wait. you will be redirected in 5 sec',
      waitmodal:false,
      cart:[],
    };
  }

  componentDidUpdate(){

    var globalthis = this
    setTimeout(() => {
      var value = this.context
      globalthis.setState({total:value.total})
      globalthis.setState({cart:value.cart})
    }, 1000);
  }

  componentDidMount(){
    
    const {cart,increase,reduction,removeProduct,removeAll,total} = this.context;

    var globalthis = this

    setTimeout(() => {
      var value = this.context
      globalthis.setState({total:value.total})
      globalthis.setState({cart:value.cart})
    }, 1000);

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

    $('html,body').animate({
      scrollTop: $(".checkout_container").offset().top - 17
    }, 10);

    $(document).on('click', '#checkoutbtn', function () {
      //BuyFunction()
      BuyFunction()
      //TestFunction()
      //console.log(globalthis.state.total)
      //console.log(globalthis.state.cart)
    })

    $('#pincode').on('input',function(e){
      // Code here
      var pin = e.target.value
      if(pin.length === 6){
        axios
        .get('https://api.postalpincode.in/pincode/'+pin, {
        })
        .then(function (response) {
          document.getElementById('locality').value = response.data[0].PostOffice[0].Name
          document.getElementById('city').value = response.data[0].PostOffice[0].District
          document.getElementById('state').value = response.data[0].PostOffice[0].State
        })
        .catch(function (error) {
        console.log(error)
        //document.getElementById('mainerrorspan').innerHTML = error
        })
      }
     });

    var shippingthere = true

    function TestFunction() {
      console.log('test')

      var OrderID = 'ORDERID'+ randomString(13)+''

                axios
                  .post('/api/make-payment', {
                    OrderID: OrderID,
                    CustAddress: 'No 28, Bangalore - 560015',
                    CustName:'Prashanth',
                    RedirectURL: '/api/order-redirect',
                    Price: '5',
                  })
                  .then(function (response) {
                    console.log(response.data)

                    $("#paymentdiv").append(response.data);
                    
                  //window.location.hash = "#/auth/login";
                  })
                  .catch(function (error) {
                  console.log(error)
                  //document.getElementById('mainerrorspan').innerHTML = error
                  })

    }


    function BuyFunction() {
      console.log("in Buy function");
      
      var tdate = new Date().toLocaleDateString('en-GB');
        var ttime = new Date().toLocaleTimeString('en-GB')
        var Timestamp = tdate + ' ' + ttime

        var FinalOrder = []
        var cart = globalthis.state.cart
        
        cart.forEach((item,index) => {
          console.log(item)
          //FinalOrder.push({id:item.id,name:item.data.ProductName,categry:item.data.ProductCategory,price:item.data.ProductPrice,qty:item.count})
        });
        
        try {
        var OrderID = 'ORDERID'+ randomString(13)+''
        var FirstName= document.getElementById('fname').value
        var LastName= document.getElementById('lname').value
        var Email= document.getElementById('email').value
        var Number= document.getElementById('number').value
        var Street1= document.getElementById('street1').value
        var Street2= document.getElementById('street2').value
        var Locality= document.getElementById('locality').value
        var City= document.getElementById('city').value
        var State= document.getElementById('state').value
        var Pincode= document.getElementById('pincode').value
        var GSTNumber= document.getElementById('gstnumber').value
        var Order= FinalOrder
        var Total= globalthis.state.total
        if(Total>500){
          Total = Total + 30
        }else{
          Total = Total + 50
        }

        var maillist = [
          'info@rehamo.com',
        ];
        
        
        if(FirstName !== '' || LastName !== '' || Email !== '' || Number !== '' || Street1 !== '' || Street2 !== '' || Locality !== '' || City !== '' || State !== '' || Pincode !== ''){
          globalthis.setState({waitmodal:true})
          globalthis.setState({errortext:"Please wait. This will take a few minutes. Please don't close or exit this page"})

          // $('#checkout_form').submit()
          
          axios.post('http://localhost:8080/api/ccavRequestHandler',{
            billing_name : FirstName + '+-+' + LastName,
            billing_address : Street1 + '+-+' + Street2 + '+-+' + Locality,
            billing_city : City,
            billing_state : State,
            billing_zip : Pincode,
            billing_country : 'India',
            billing_tel : Number,
            billing_email : Email,
            delivery_name : FirstName + '+-+' + LastName,
            delivery_address : Street1 + '+-+' + Street2 + '+-+' + Locality,
            delivery_city : City,
            delivery_state : State,
            delivery_zip : Pincode,
            delivery_country : 'India',
            delivery_tel : Number,

            merchant_id : '183192',
            order_id : uuid(),
            currency : 'INR',
            amount : Total,
            redirect_url : '/success.html',
            cancel_url : '/cancel.html',
            language : 'EN'
          })
          // let options = {
          //   "key": "rzp_live_mVjeF0bIVsGzcb",
          //   "amount": parseInt(Total) * 100, // 2000 paise = INR 20, amount in paisa
          //   "name": "Rehamo",
          //   "description": "Order From Website",
          //   "image": "https://test.rehamo.com/logo.png",
          //   "handler": function (response){
          //     console.log(response)
          //     //alert('rzp response')
          //     //alert(response.razorpay_payment_id);
          //     var ps  = true;

          //     var rzpid = response.razorpay_payment_id 

          //     axios
          //     .post('https://www.mievida.com/api/orderconfirm', {
          //       OrderID:OrderID,
          //       FirstName:FirstName,
          //       LastName:LastName,
          //       Email:Email,
          //       Number:Number,
          //       Street1:Street1,
          //       Street2:Street2,
          //       Locality:Locality,
          //       City:City,
          //       State:State,
          //       Pincode:Pincode,
          //       Total:Total,
          //       Order:Order,
          //       Timestamp:Timestamp,
          //       GSTNumber:GSTNumber,
          //       PaymentStatus:true,
          //       RazorpayPaymentID:response.razorpay_payment_id,
          //     })
          //     .then(function (orderresponse) {
          //       console.log(orderresponse)
          //       //alert('order response')
          //       if (orderresponse.data === 'order done') {

          //         globalthis.setState({errortext:'Please wait. you will be redirected in 5 sec'})
          //         removeAll()
                  
                 

          //         var ClientEmail =''
    
          //         ClientEmail += '<div>'
          //         ClientEmail +='<p>Order('+OrderID+') Succesfulfully placed </p>'
          //         ClientEmail +='<p>Details</p>'
          //         ClientEmail +='<p>Name: '+FirstName+' '+LastName+'</p>'
          //         ClientEmail +='<p>Email: '+Email+'</p>'
          //         ClientEmail +='<p>Address: '+Street1+', '+Street2+', '+Locality+', '+City+', '+State+', '+Pincode+'</p>'
          //         ClientEmail +='<p>Number: '+Number+'</p>'
          //         ClientEmail +='<p>Payment ID: '+rzpid+'</p>'
          //         ClientEmail +='<p>Price: '+Total+'</p>'
          //         ClientEmail +='<p></p>'
          //         ClientEmail +=`<p>Please check the admin portal for more details</p>`
          //         ClientEmail += '</div>'

          //         var CustomerEmail =''
    
          //         CustomerEmail += '<div>'
          //         CustomerEmail +='<p>Order('+OrderID+') Succesfulfully placed </p>'
          //         CustomerEmail +='<p>Details:</p>'
          //         CustomerEmail +='<p>Name: '+FirstName+' '+LastName+'</p>'
          //         CustomerEmail +='<p>Email: '+Email+'</p>'
          //         CustomerEmail +='<p>Address: '+Street1+', '+Street2+', '+Locality+', '+City+', '+State+', '+Pincode+'</p>'
          //         CustomerEmail +='<p>Number: '+Number+'</p>'
          //         CustomerEmail +='<p>Payment ID: '+rzpid+'</p>'
          //         CustomerEmail +='<p>Price: '+Total+'</p>'
          //         CustomerEmail +='<p></p>'
          //         CustomerEmail +=`<p>Thank you for placing an order with Mievida. Your order will be processed within 7 working days. You will recieve a tracking URL from our delivery partner Shiprocket.</p>`
          //         CustomerEmail += '</div>'

          //         axios
          //         .post('https://www.mievida.com/api/sendmail', {
          //         to: Email,
          //         body:
          //             `<!doctype html><html> <head> <meta name="viewport" content="width=device-width"> <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"> <title>Mievida Enquiry Recieved</title> <style> @media only screen and (max-width: 620px) { table[class=body] h1 { font-size: 28px !important; margin-bottom: 10px !important; } table[class=body] p, table[class=body] ul, table[class=body] ol, table[class=body] td, table[class=body] span, table[class=body] a { font-size: 16px !important; } table[class=body] .wrapper, table[class=body] .article { padding: 10px !important; } table[class=body] .content { padding: 0 !important; } table[class=body] .container { padding: 0 !important; width: 100% !important; } table[class=body] .main { border-left-width: 0 !important; border-radius: 0 !important; border-right-width: 0 !important; } table[class=body] .btn table { width: 100% !important; } table[class=body] .btn a { width: 100% !important; } table[class=body] .img-responsive { height: auto !important; max-width: 100% !important; width: auto !important; } } /* ------------------------------------- PRESERVE THESE STYLES IN THE HEAD ------------------------------------- */ @media all { .ExternalClass { width: 100%; } .ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div { line-height: 100%; } .apple-link a { color: inherit !important; font-family: inherit !important; font-size: inherit !important; font-weight: inherit !important; line-height: inherit !important; text-decoration: none !important; } #MessageViewBody a { color: inherit; text-decoration: none; font-size: inherit; font-family: inherit; font-weight: inherit; line-height: inherit; } .btn-primary table td:hover { background-color: #626262 !important; } .btn-primary a:hover { background-color: #626262 !important; border-color: #626262 !important; } } </style> </head> <body class="" style="background-color: #f6f6f6; font-family: sans-serif; -webkit-font-smoothing: antialiased; font-size: 14px; line-height: 1.4; margin: 0; padding: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;"> <table border="0" cellpadding="0" cellspacing="0" class="body" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; background-color: #f6f6f6;"> <tr> <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;">&nbsp;</td> <td class="container" style="font-family: sans-serif; font-size: 14px; vertical-align: top; display: block; Margin: 0 auto; max-width: 580px; padding: 10px; width: 580px;"> <div class="content" style="box-sizing: border-box; display: block; Margin: 0 auto; max-width: 580px; padding: 10px;"> <!-- START CENTERED WHITE CONTAINER --> <span class="preheader" style="color: transparent; display: none; height: 0; max-height: 0; max-width: 0; opacity: 0; overflow: hidden; mso-hide: all; visibility: hidden; width: 0;">Mievida: Enquiry Recieved</span> <table class="main" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; background: #ffffff; border-radius: 3px;"> <!-- START MAIN CONTENT AREA --> <tr> <td class="wrapper" style="font-family: sans-serif; font-size: 14px; vertical-align: top; box-sizing: border-box; padding: 20px;"> <table border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;"> <tr> <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;"> <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px;">Mievida,</p> <div style="font-family: sans-serif; font-size: 12px; font-weight: normal; margin: 0; Margin-bottom: 15px;">`
          //             +CustomerEmail+`</div> <table border="0" cellpadding="0" cellspacing="0" class="btn btn-primary" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; box-sizing: border-box;"> <tbody> <tr> <td align="left" style="font-family: sans-serif; font-size: 14px; vertical-align: top; padding-bottom: 15px;"> <table border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: auto;"> <tbody> <tr> <td style="font-family: sans-serif; font-size: 14px; vertical-align: top; background-color: #3498db; border-radius: 0px; text-align: center;"> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> <p style="font-family: sans-serif; font-size: 12px; color:#727272; font-weight: normal; margin: 0; Margin-bottom: 5px; Margin-top: 15px;"><strong>Do Not Share The Email</strong></p> <p style="font-family: sans-serif; font-size: 11px; color:#727272; font-weight: normal; margin: 0; Margin-bottom: 15px;">This email consists a secure link to Mievida, Please do not share this email, link or access code with others.</p><p style="font-family: sans-serif; font-size: 12px; color:#727272; font-weight: normal; margin: 0; Margin-bottom: 5px;"><strong>Questions about the Email?</strong></p><p style="font-family: sans-serif; font-size: 11px; color:#727272; font-weight: normal; margin: 0; Margin-bottom: 15px;">If you need to modify the email or have questions about the email, Please reach out to support@circleof.life by emailing them directly</p> </td> </tr> </table> </td> </tr> <!-- END MAIN CONTENT AREA --> </table> <!-- START FOOTER --> <div class="footer" style="clear: both; Margin-top: 10px; text-align: center; width: 100%;"> <table border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;"> <tr> <td class="content-block powered-by" style="font-family: sans-serif; vertical-align: top; padding-bottom: 10px; padding-top: 10px; font-size: 12px; color: #999999; text-align: center;"> Powered by <a href="https://www.mievida.com" style="color: #2782b8; font-size: 12px; text-align: center; text-decoration: none;">Mievida</a>. </td> </tr> </table> </div> <!-- END FOOTER --> <!-- END CENTERED WHITE CONTAINER --> </div> </td> <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;">&nbsp;</td> </tr> </table> </body></html>`,
          //         subject: 'Mievida: Order Placed('+OrderID+')',
          //         })
          //         .then(function (response) {

          //           //window.location.href = '/checkout-success?id='+OrderID
          //         //window.location.hash = "#/auth/login";
          //         })
          //         .catch(function (error) {
          //         console.log(error)
          //         //document.getElementById('mainerrorspan').innerHTML = error
          //         })

          //         axios
          //         .post('https://www.mievida.com/api/sendmail', {
          //         to: maillist,
          //         body:
          //             `<!doctype html><html> <head> <meta name="viewport" content="width=device-width"> <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"> <title>Mievida Enquiry Recieved</title> <style> @media only screen and (max-width: 620px) { table[class=body] h1 { font-size: 28px !important; margin-bottom: 10px !important; } table[class=body] p, table[class=body] ul, table[class=body] ol, table[class=body] td, table[class=body] span, table[class=body] a { font-size: 16px !important; } table[class=body] .wrapper, table[class=body] .article { padding: 10px !important; } table[class=body] .content { padding: 0 !important; } table[class=body] .container { padding: 0 !important; width: 100% !important; } table[class=body] .main { border-left-width: 0 !important; border-radius: 0 !important; border-right-width: 0 !important; } table[class=body] .btn table { width: 100% !important; } table[class=body] .btn a { width: 100% !important; } table[class=body] .img-responsive { height: auto !important; max-width: 100% !important; width: auto !important; } } /* ------------------------------------- PRESERVE THESE STYLES IN THE HEAD ------------------------------------- */ @media all { .ExternalClass { width: 100%; } .ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div { line-height: 100%; } .apple-link a { color: inherit !important; font-family: inherit !important; font-size: inherit !important; font-weight: inherit !important; line-height: inherit !important; text-decoration: none !important; } #MessageViewBody a { color: inherit; text-decoration: none; font-size: inherit; font-family: inherit; font-weight: inherit; line-height: inherit; } .btn-primary table td:hover { background-color: #626262 !important; } .btn-primary a:hover { background-color: #626262 !important; border-color: #626262 !important; } } </style> </head> <body class="" style="background-color: #f6f6f6; font-family: sans-serif; -webkit-font-smoothing: antialiased; font-size: 14px; line-height: 1.4; margin: 0; padding: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;"> <table border="0" cellpadding="0" cellspacing="0" class="body" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; background-color: #f6f6f6;"> <tr> <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;">&nbsp;</td> <td class="container" style="font-family: sans-serif; font-size: 14px; vertical-align: top; display: block; Margin: 0 auto; max-width: 580px; padding: 10px; width: 580px;"> <div class="content" style="box-sizing: border-box; display: block; Margin: 0 auto; max-width: 580px; padding: 10px;"> <!-- START CENTERED WHITE CONTAINER --> <span class="preheader" style="color: transparent; display: none; height: 0; max-height: 0; max-width: 0; opacity: 0; overflow: hidden; mso-hide: all; visibility: hidden; width: 0;">Mievida: Enquiry Recieved</span> <table class="main" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; background: #ffffff; border-radius: 3px;"> <!-- START MAIN CONTENT AREA --> <tr> <td class="wrapper" style="font-family: sans-serif; font-size: 14px; vertical-align: top; box-sizing: border-box; padding: 20px;"> <table border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;"> <tr> <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;"> <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px;">Mievida,</p> <div style="font-family: sans-serif; font-size: 12px; font-weight: normal; margin: 0; Margin-bottom: 15px;">`
          //             +ClientEmail+`</div> <table border="0" cellpadding="0" cellspacing="0" class="btn btn-primary" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; box-sizing: border-box;"> <tbody> <tr> <td align="left" style="font-family: sans-serif; font-size: 14px; vertical-align: top; padding-bottom: 15px;"> <table border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: auto;"> <tbody> <tr> <td style="font-family: sans-serif; font-size: 14px; vertical-align: top; background-color: #3498db; border-radius: 0px; text-align: center;"> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> <p style="font-family: sans-serif; font-size: 12px; color:#727272; font-weight: normal; margin: 0; Margin-bottom: 5px; Margin-top: 15px;"><strong>Do Not Share The Email</strong></p> <p style="font-family: sans-serif; font-size: 11px; color:#727272; font-weight: normal; margin: 0; Margin-bottom: 15px;">This email consists a secure link to Mievida, Please do not share this email, link or access code with others.</p><p style="font-family: sans-serif; font-size: 12px; color:#727272; font-weight: normal; margin: 0; Margin-bottom: 5px;"><strong>Questions about the Email?</strong></p><p style="font-family: sans-serif; font-size: 11px; color:#727272; font-weight: normal; margin: 0; Margin-bottom: 15px;">If you need to modify the email or have questions about the email, Please reach out to support@circleof.life by emailing them directly</p> </td> </tr> </table> </td> </tr> <!-- END MAIN CONTENT AREA --> </table> <!-- START FOOTER --> <div class="footer" style="clear: both; Margin-top: 10px; text-align: center; width: 100%;"> <table border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;"> <tr> <td class="content-block powered-by" style="font-family: sans-serif; vertical-align: top; padding-bottom: 10px; padding-top: 10px; font-size: 12px; color: #999999; text-align: center;"> Powered by <a href="https://www.mievida.com" style="color: #2782b8; font-size: 12px; text-align: center; text-decoration: none;">Mievida</a>. </td> </tr> </table> </div> <!-- END FOOTER --> <!-- END CENTERED WHITE CONTAINER --> </div> </td> <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;">&nbsp;</td> </tr> </table> </body></html>`,
          //         subject: 'Mievida: New Order Recieved('+OrderID+')',
          //         })
          //         .then(function (response) {
                    
          //           globalthis.setState({waitmodal:false})
          //           window.location.href = '/checkout-success?id='+OrderID
                    
          //         //window.location.hash = "#/auth/login";
          //         })
          //         .catch(function (error) {
          //         console.log(error)
          //         //document.getElementById('mainerrorspan').innerHTML = error
          //         })

                 
          
          //       } else {
          //         alert('Your Transaction was unsuccessful, please try again');
                  
          //       }
                
          //     })
          //     .catch(function (error) {
          //       console.log(error)
          //     })
    
    
          //     //window.location.href = 'https://app.circleof.life/api/mobileLiveconfirm2?PaymentStatus='+ps+'&PaymentID='+response.razorpay_payment_id+'&OrderID='+LiveOrderID+'&LiveOrderID='+LiveOrderID+'&CustomerID='+LiveUserID+'&TaxationAmount='+LivePrice+'&CustomerEmail='+LiveCustomerEmail+'&LiveID='+LiveID+'&LivePsychologistName='+LivePsychologistName+'&LivePsychologistID='+LivePsychologistID+'&LiveDuration='+LiveDuration+'&LiveDate='+LiveDate+'&LiveTime='+LiveTime+'&LiveCustomerName='+LiveCustomerName+'&LiveTimestamp='+LiveTimestamp+'&LiveStatus='+LiveStatus+''
          //   },
          //   "prefill": {
          //     "name": FirstName,
          //     "email": Email,
          //     "contact": Number,
          //   },
          //   "notes": {
          //     "type": "Order"
          //   },
          //   "theme": {
          //     "color": "#8AC43F"
          //   },
          //   "modal": {
          //     "ondismiss": function(){
          //       globalthis.setState({waitmodal:false})
          //      }
          // }
          // };
          
          // let rzp = new window.Razorpay(options);
          // rzp.open();

          
        }else{
          alert('Please fill all the details to continue')
        }
        
        } catch (error) {
          console.log(error)
          alert('Error, Something went wrong')
        }
      
    }

    //checkoutbtn
  }
 
  render() {
    return (
      <>
        <Container className="checkout_container">
              {/*<div id="paymentDiv">

             
              <form method="POST" name="customerData" action="/api/ccavRequestHandler">
		<table width="40%" height="100" border='1' align="center">
			<caption>
				<font size="4" color="blue"><b>Integration Kit</b></font>
			</caption>
		</table>
		<table width="40%" height="100" border='1' align="center">
			<tr>
				<td>Parameter Name:</td>
				<td>Parameter Value:</td>
			</tr>
			<tr>
				<td colspan="2">Compulsory information</td>
			</tr>
			<tr>
				<td>Merchant Id</td>
				<td><input type="text" name="merchant_id" id="merchant_id" value="183192" /> </td>
			</tr>
			<tr>
				<td>Order Id</td>
				<td><input type="text" name="order_id" value="1263126357123" /></td>
			</tr>
			<tr>
				<td>Currency</td>
				<td><input type="text" name="currency" value="INR" /></td>
			</tr>
			<tr>
				<td>Amount</td>
				<td><input type="text" name="amount" value="1.00" /></td>
			</tr>
			<tr>
				<td>Redirect URL</td>
				<td><input type="text" name="redirect_url"
					value="http://localhost:8080/api/ccavResponseHandler" />
				</td>
			</tr>
			<tr>
				<td>Cancel URL</td>
				<td><input type="text" name="cancel_url"
					value="http://localhost:8080/api/ccavResponseHandler" />
				</td>
			</tr>
			<tr>
				<td>Language</td>
				<td><input type="text" name="language" id="language" value="EN" /></td>
			</tr>
			<tr>
				<td colspan="2">Billing information(optional):</td>
			</tr>
			<tr>
				<td>Billing Name</td>
				<td><input type="text" name="billing_name" value="Peter" /></td>
			</tr>
			<tr>
				<td>Billing Address:</td>
				<td><input type="text" name="billing_address"
					value="Santacruz" /></td>
			</tr>
			<tr>
				<td>Billing City:</td>
				<td><input type="text" name="billing_city" value="Mumbai" /></td>
			</tr>
			<tr>
				<td>Billing State:</td>
				<td><input type="text" name="billing_state" value="MH" /></td>
			</tr>
			<tr>
				<td>Billing Zip:</td>
				<td><input type="text" name="billing_zip" value="400054" /></td>
			</tr>
			<tr>
				<td>Billing Country:</td>
				<td><input type="text" name="billing_country" value="India" />
				</td>
			</tr>
			<tr>
				<td>Billing Tel:</td>
				<td><input type="text" name="billing_tel" value="9876543210" />
				</td>
			</tr>
			<tr>
				<td>Billing Email:</td>
				<td><input type="text" name="billing_email"
					value="testing@domain.com" /></td>
			</tr>
			<tr>
				<td colspan="2">Shipping information(optional):</td>
			</tr>
			<tr>
				<td>Shipping Name</td>
				<td><input type="text" name="delivery_name" value="Sam" />
				</td>
			</tr>
			<tr>
				<td>Shipping Address:</td>
				<td><input type="text" name="delivery_address"
					value="Vile Parle" /></td>
			</tr>
			<tr>
				<td>Shipping City:</td>
				<td><input type="text" name="delivery_city" value="Mumbai" />
				</td>
			</tr>
			<tr>
				<td>Shipping State:</td>
				<td><input type="text" name="delivery_state" value="Maharashtra" />
				</td>
			</tr>
			<tr>
				<td>Shipping Zip:</td>
				<td><input type="text" name="delivery_zip" value="400038" /></td>
			</tr>
			<tr>
				<td>Shipping Country:</td>
				<td><input type="text" name="delivery_country" value="India" />
				</td>
			</tr>
			<tr>
				<td>Shipping Tel:</td>
				<td><input type="text" name="delivery_tel" value="0123456789" />
				</td>
			</tr>
			<tr>
				<td>Merchant Param1</td>
				<td><input type="text" name="merchant_param1"
					value="additional Info." /></td>
			</tr>
			<tr>
				<td>Merchant Param2</td>
				<td><input type="text" name="merchant_param2"
					value="additional Info." /></td>
			</tr>
			<tr>
				<td>Merchant Param3</td>
				<td><input type="text" name="merchant_param3"
					value="additional Info." /></td>
			</tr>
			<tr>
				<td>Merchant Param4</td>
				<td><input type="text" name="merchant_param4"
					value="additional Info." /></td>
			</tr>
			<tr>
				<td>Merchant Param5</td>
				<td><input type="text" name="merchant_param5"
					value="additional Info." /></td>
			</tr>
			<tr>
				<td>Promo Code:</td>
				<td><input type="text" name="promo_code" value=""/></td>
			</tr>
			<tr>
				<td>Customer Id:</td>
				<td><input type="text" name="customer_identifier" value=""/></td>
			</tr>
			<tr>
				<td></td>
				<td><input TYPE="submit" value="Checkout"/></td>
			</tr>
		</table>
	</form>

    </div>*/}
                
                

              <div lg='8' id="checkoutdiv" className='mobile8'>
               
              <div className="container_formWrapper">
                <form id='checkout_form' className="checkout_form" method='POST' action='http://localhost:8080/api/ccavRequestHandler'>
                  <h4 className="checkout_Content1">
                    Add New Address
                  </h4>

                  <p className="checkout_formContent1">Personal Information</p>
                  <div className="checkout_inputContainer">
                    <input type="text" id="fname" className="checkout_formInputDouble" placeholder="Firstname"/>
                    <input type="text" id="lname" className="checkout_formInputDouble" placeholder="Lastname"/>
                  </div>

                  <div className="checkout_inputContainer">
                      <input type="email" id="email" className="checkout_formInputDouble" placeholder="xyz@gmail.com"/>
                      <input type="text" id="number"  placeholder="XXXXXXXXXX" className="checkout_formInputDouble"/>
                  </div>

                  

                  <p className="checkout_formContent1">GST Number (Optional)</p>
                  <div className="checkout_inputContainer">
                    <input type="text" id="gstnumber" className="checkout_formInputSingle" placeholder="GST Number"/>
                  </div>

                  <p className="checkout_formContent1">Address</p>
                  <div className="checkout_inputContainer">
                    <input type="text" id="street1" className="checkout_formInputSingle" placeholder="House No, Building"/>
                  </div>
                  <div className="checkout_inputContainer">
                    <input type="text" id="street2" className="checkout_formInputSingle" placeholder="Street, Area"/>
                  </div>
                  <div className="checkout_inputContainer">
                    <input type="text" id="locality" className="checkout_formInputDouble" placeholder="Locality/Town"/>
                    <input type="text" id="city" className="checkout_formInputDouble" placeholder="City"/>
                  </div>
                  <div className="checkout_inputContainer">
                    <input type="text" id="state" className="checkout_formInputDouble" placeholder="State"/>
                    <input type="text" id="pincode" className="checkout_formInputDouble" placeholder="Pincode"/>
                  </div>

                  
                  
                </form>
              </div>
              </div>
              <div lg='4' id="checkoutdiv2" className='mobile4'>

                <div className="checkout_cartWrapper">
                  <h4 className="checkout_cartContent1">Shopping Cart</h4>
                  <div className="shopcheckoutcart">
                  <Cart/>
                  <div lg="12" className="carttotaldiv">
                        <button id="checkoutbtn" className="cartcheckout" >Checkout</button>
                    </div>
                  </div>
                </div>
              </div>
        </Container>
      </>
      );
  }
}

export default Checkout;