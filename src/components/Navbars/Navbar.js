
import React from "react";

import './Navbar.css'

import $ from 'jquery';

import CartNav from '../CartNav.js'
import {
  Button,
  UncontrolledCollapse,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  NavbarBrand,
  NavItem,
  Nav,
  Container,
  Row,
  Col
} from "reactstrap";



import SocialButton from '../../components/SocialButton.js'

import {DataContext} from '../../components/Context'

const axios = require('axios').default

class Navbar extends React.Component {

  static contextType = DataContext;
  
  constructor(){
    super()
    this.myRef = React.createRef()
    this.openNav = this.openNav.bind(this)
    this.closeNav = this.closeNav.bind(this)

    this.state = {
      showdrop:false,
      loggedIn:false,
      searchval:'',
      searchshow:false,
      products:[],
      globalproducts:[],
    };
  }
  
  openNav() {
    this.myRef.current.className = 'navbar_desktopHidden navbar_mobShow sideNavOpen'
    console.log(this.myRef);
  }
  
  closeNav() {
    this.myRef.current.className = 'navbar_desktopHidden navbar_mobShow sideNavClose'
    console.log(this.myRef);
  }

  componentDidMount(){

    var globalthis = this;

    var modal = document.querySelectorAll('.modal')

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


    function getCookie(name) {
      var nameEQ = name + '='
      var ca = document.cookie.split(';')
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i]
        while (c.charAt(0) == ' ') c = c.substring(1, c.length)
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length)
      }
      return null
    }

    var userid = getCookie('uid')
    //console.log(nowurl)

    if(userid){
      globalthis.setState({ loggedIn: true });
    }else{
      globalthis.setState({ loggedIn: false });
    }


    
    function setCookie(name, value, days) {
      var expires = ''
      if (days) {
        var date = new Date()
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
        expires = '; expires=' + date.toUTCString()
      }
      document.cookie = name + '=' + (value || '') + expires + '; path=/'
    }

    var globalthis = this
    //modal[0].style.display = 'block'
    //$('#loading-circle').show();

    function getCookie(name) {
      var nameEQ = name + '='
      var ca = document.cookie.split(';')
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i]
        while (c.charAt(0) == ' ') c = c.substring(1, c.length)
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length)
      }
      return null
    }

    var useremail = getCookie('useremail')

    if(useremail){
      globalthis.setState({loggedIn:true})
    }


    function fetch() {

        axios
        .post('https://admin.rehamo.com/api/getproductlist', {
        })
        .then(function (response) {
          //console.log(response)

            var Product = response.data
            var allcontent = ''

            Product.sort(function(a, b) {
              var keyA = new Date(a.ProductDate),
                keyB = new Date(b.ProductDate);
              // Compare the 2 dates
              if (keyA < keyB) return -1;
              if (keyA > keyB) return 1;
              return 0;
            });

            Product = Product.reverse()

            globalthis.setState({ products: Product });
            globalthis.setState({ globalproducts: Product });
                  
            
          })
          .catch(function (error) {
            console.log(error)
            //modal[0].style.display = 'none'
            //$('#loading-circle').hide();
          })


    }

    fetch()
  


    this.showDrop = async () => {
      this.setState({showdrop:!(this.state.showdrop)})
    };


    this.signinfunc = () => {
      var loggedIn = this.state.loggedIn
      if(loggedIn){
        window.location.href = '/profile'
      }else{
        modal[0].style.display = 'block'
      modal[1].style.display = 'none'
      }
      
    }

    this.signupfunc = () => {
      modal[0].style.display = 'none'
      modal[1].style.display = 'block'
    }

    this.closemodal1 = () => {
      modal[0].style.display = 'none'
    }

    this.closemodal2 = () => {
      modal[1].style.display = 'none'
    }


    var loginemail = document.getElementById('modalsigninemail')
    var loginpassword = document.getElementById('modalsigninpassword')
    var loginbtn = document.getElementById('pv-explore-btn4')
    loginbtn.addEventListener('click', function (event) {
      signin()
    })

    loginemail.addEventListener('keyup', function (e) {
      e.preventDefault()
      if (e.keyCode == 13) {
        loginbtn.click()
      }
    })

    loginpassword.addEventListener('keyup', function (e) {
      e.preventDefault()
      if (e.keyCode == 13) {
        loginbtn.click()
      }
    })


    function signin() {
      var email = document.getElementById('modalsigninemail').value
      var password = document.getElementById('modalsigninpassword').value
      if (email.length < 4) {
        document.getElementById('errorspan').innerHTML =
          'Please enter an email address.'

        return
      }
      if (password.length < 4) {
        document.getElementById('errorspan').innerHTML =
          'Please enter a password.'

        return
      }
      // Sign in with email and pass.
      // [START authwithemail]
      document.getElementById('errorspan').innerHTML = 'Please wait'
      axios
        .post('https://admin.rehamo.com/api/loginapi', {
          UserEmail: email,
          UserPassword: password,
        })
        .then(function (response) {
          //console.log(response)
          if (response.data.Status === 'login successful') {
            document.getElementById('errorspan').innerHTML =
              'Login Successful, This will close automatically'
              globalthis.setState({ loggedIn: true });
              setTimeout(() => {
                modal[1].style.display = 'none'
              }, 2000);
            setCookie('uid', response.data.UserID, 1)
            setCookie('useremail', response.data.UserEmail, 1)
            setCookie('usertype', response.data.UserType, 1)
            setCookie('userfirstname', response.data.UserFirstName, 1)
            setCookie('userlastname', response.data.UserLastName, 1)
            //this.props.history.push(DataVar.RedirectURL);
            //alert( 'Login Successful')
            window.location.reload(false)
          } else if (response.data.Status === 'activate account') {
            document.getElementById('errorspan').innerHTML =
              'Activate Your Account'
          } else if (response.data.Status === 'wrong password') {
            document.getElementById('errorspan').innerHTML =
              'Wrong Password'
          } else if (response.data.Status === 'user not found') {
            document.getElementById('errorspan').innerHTML =
              'User ID Does not exist'
          }
        })
        .catch(function (error) {
          //console.log(error)
        })
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

   

    $(document).on("click", "#pv-explore-btn42", function () {
      //modal[0].style.display = "block";
      var registeremail = document.getElementById('signupemail').value
      var registerpassword = document.getElementById('signuppassword').value
      var registerrepassword = document.getElementById('signuprepassword').value
      var registerfirstname = document.getElementById('signupname').value
      var registerlastname = ''

      if (registeremail.length > 4) {
        if (
          registerfirstname == '' ||
          registerpassword == '' 
        ) {
          //alert('Please fill all the details.');
          document.getElementById('errorspan2').innerHTML =
            'Please fill all the details'
        } else {
          if(registerpassword !== registerrepassword){
            document.getElementById('errorspan2').innerHTML =
            'Passwords dont match'
          }else{
            var user = randomString(20)
            logUser(user)
            document.getElementById('errorspan2').innerHTML = 'Please wait'
          }
          
        }
      } else {
        //alert('Please enter a valid email address.');
        document.getElementById('errorspan2').innerHTML =
          'Please enter a valid email address.'
      }
    });


    function logUser(user) {
      var registeremail = document.getElementById('signupemail').value
      var registerpassword = document.getElementById('signuppassword').value
      var registerfirstname = document.getElementById('signupname').value
      var registerlastname = ''


      if (user) {
        var userid = user
        var useractivated = true
        var userpremium = false

        axios
          .post('https://admin.rehamo.com/api/registerapi', {
            UserID: randomString(13),
            UserEmail: registeremail,
            UserPassword: registerpassword,
            UserFirstName: registerfirstname,
            UserLastName: registerlastname,
            UserType: "General",
            UserPremium: userpremium,
            UserActivated: useractivated,
          })
          .then(function (response) {
            ////console.log(response)
            if (response.data === 'registered') {
              ////console.log('registered');
              document.getElementById('errorspan2').innerHTML =
                response.data
              axios
                .post('https://admin.rehamo.com/api/sendmail', {
                  to: registeremail,
                  body:
                    `<!doctype html><html> <head> <meta name="viewport" content="width=device-width"> <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"> <title>Rehamo Club Activation</title> <style> @media only screen and (max-width: 620px) { table[class=body] h1 { font-size: 28px !important; margin-bottom: 10px !important; } table[class=body] p, table[class=body] ul, table[class=body] ol, table[class=body] td, table[class=body] span, table[class=body] a { font-size: 16px !important; } table[class=body] .wrapper, table[class=body] .article { padding: 10px !important; } table[class=body] .content { padding: 0 !important; } table[class=body] .container { padding: 0 !important; width: 100% !important; } table[class=body] .main { border-left-width: 0 !important; border-radius: 0 !important; border-right-width: 0 !important; } table[class=body] .btn table { width: 100% !important; } table[class=body] .btn a { width: 100% !important; } table[class=body] .img-responsive { height: auto !important; max-width: 100% !important; width: auto !important; } } /* ------------------------------------- PRESERVE THESE STYLES IN THE HEAD ------------------------------------- */ @media all { .ExternalClass { width: 100%; } .ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div { line-height: 100%; } .apple-link a { color: inherit !important; font-family: inherit !important; font-size: inherit !important; font-weight: inherit !important; line-height: inherit !important; text-decoration: none !important; } #MessageViewBody a { color: inherit; text-decoration: none; font-size: inherit; font-family: inherit; font-weight: inherit; line-height: inherit; } .btn-primary table td:hover { background-color: #626262 !important; } .btn-primary a:hover { background-color: #626262 !important; border-color: #626262 !important; } } </style> </head> <body class="" style="background-color: #f6f6f6; font-family: sans-serif; -webkit-font-smoothing: antialiased; font-size: 14px; line-height: 1.4; margin: 0; padding: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;"> <table border="0" cellpadding="0" cellspacing="0" class="body" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; background-color: #f6f6f6;"> <tr> <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;">&nbsp;</td> <td class="container" style="font-family: sans-serif; font-size: 14px; vertical-align: top; display: block; Margin: 0 auto; max-width: 580px; padding: 10px; width: 580px;"> <div class="content" style="box-sizing: border-box; display: block; Margin: 0 auto; max-width: 580px; padding: 10px;"> <!-- START CENTERED WHITE CONTAINER --> <span class="preheader" style="color: transparent; display: none; height: 0; max-height: 0; max-width: 0; opacity: 0; overflow: hidden; mso-hide: all; visibility: hidden; width: 0;">Rehamo Activation.</span> <table class="main" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; background: #ffffff; border-radius: 3px;"> <!-- START MAIN CONTENT AREA --> <tr> <td class="wrapper" style="font-family: sans-serif; font-size: 14px; vertical-align: top; box-sizing: border-box; padding: 20px;"> <table border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;"> <tr> <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;"> <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px;">Welcome to Rehamo, ` +
                    registerfirstname +
                    `</p> <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px;">We are just a few steps away from activating your account. Click the link below to activate your account.</p> <table border="0" cellpadding="0" cellspacing="0" class="btn btn-primary" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; box-sizing: border-box;"> <tbody> <tr> <td align="left" style="font-family: sans-serif; font-size: 14px; vertical-align: top; padding-bottom: 15px;"> <table border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: auto;"> <tbody> <tr> <td style="font-family: sans-serif; font-size: 14px; vertical-align: top; background-color: #3498db; border-radius: 0px; text-align: center;"> <a href="
                    https://www.rehamo.com/" target="_blank" style="display: inline-block; color: #ffffff; background-color: #2782b8; border: solid 1px #2782b8; border-radius: 0px; box-sizing: border-box; cursor: pointer; text-decoration: none; font-size: 14px; font-weight: bold; margin: 0; padding: 12px 25px; text-transform: capitalize; border-color: #2782b8;">Activate Account</a> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> <p style="font-family: sans-serif; font-size: 12px; color:#727272; font-weight: normal; margin: 0; Margin-bottom: 5px; Margin-top: 15px;"><strong>Do Not Share The Email</strong></p> <p style="font-family: sans-serif; font-size: 11px; color:#727272; font-weight: normal; margin: 0; Margin-bottom: 15px;">This email consists a secure link to Rehamo, Please do not share this email, link or access code with others.</p><p style="font-family: sans-serif; font-size: 12px; color:#727272; font-weight: normal; margin: 0; Margin-bottom: 5px;"><strong>Questions about the Email?</strong></p><p style="font-family: sans-serif; font-size: 11px; color:#727272; font-weight: normal; margin: 0; Margin-bottom: 15px;">If you have questions, Please reach out to the sender by emailing them directly</p> </td> </tr> </table> </td> </tr> <!-- END MAIN CONTENT AREA --> </table> <!-- START FOOTER --> <div class="footer" style="clear: both; Margin-top: 10px; text-align: center; width: 100%;"> <table border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;"> <tr> <td class="content-block powered-by" style="font-family: sans-serif; vertical-align: top; padding-bottom: 10px; padding-top: 10px; font-size: 12px; color: #999999; text-align: center;"> Powered by <a href="https://www.rehamo.com" style="color: #2782b8; font-size: 12px; text-align: center; text-decoration: none;">Rehamo</a>. </td> </tr> </table> </div> <!-- END FOOTER --> <!-- END CENTERED WHITE CONTAINER --> </div> </td> <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;">&nbsp;</td> </tr> </table> </body></html>`,
                  subject: 'Rehamo: Activation',
                })
                .then(function (response) {
                  ////console.log(response)
                  alert(
                    'An activation link is sent to your email, activate your account and login again to continue.'
                  )
                  window.location.href = '/'
                })
                .catch(function (error) {
                  document.getElementById('errorspan2').innerHTML = error
                })
            } else if (response.data === 'User already exists') {
              document.getElementById('errorspan2').innerHTML =
                response.data
            }
          })
          .catch(function (error) {
            //console.log(error)
            document.getElementById('errorspan2').innerHTML = error
          })
      }
    }

   
    this.gotoproductview = async (item) => {
      console.log(item)
      window.location.href = '/shopnow/'+item.ProductNameURL+'/'+item.ProductID+''
          
    };

    const filterPosts = (products, query) => {
      if (!query) {
        return products;
      }
  
      return products.filter((product) => {
          console.log(product)
          const productName = product.ProductName.toLowerCase();
          console.log(productName)
          console.log(productName.includes(query))
          return productName.includes(query);
      });


  };

  this.searchfunc = async (val) => {
    globalthis.setState({searchval:val.target.value})
    var products = globalthis.state.globalproducts
    val = val.target.value
    val = val.toLowerCase()
    var filtered = filterPosts(products,val)

    globalthis.setState({products:filtered})

  };


  }

  render() {

    const {cart,increase,reduction,removeProduct,total} = this.context;

    let count = 0;

    let ProductArray = this.state.products.map((item, i) => {
      
      if (item.ProductStatus =="Active") {
            let Image_Http_URL = `https://rehamobucket.s3.ap-south-1.amazonaws.com/RehamoProducts/`+item.ProductID+`/Images/1_Image.jpg`
            count += 1;
            
            var discount = '10%';
            var oldPrice = parseInt(item.ProductPrice)/10;
            var oldPrice = parseInt(item.ProductPrice) - oldPrice;
              return (
                <>
                <div className="prsearchdiv">
                <img className="prsearchimg" onClick={() => this.gotoproductview(item)} src={Image_Http_URL} alt="Image"/>
                <div className="prdetails">
                <h6 className="prsearcht1">{item.ProductName}</h6>
                <h6 className="prsearcht2">Rs. {oldPrice} | {discount}</h6>
                <h6 className="prsearcht3">Rs. {item.ProductPrice}</h6>
                </div>
                
                </div>
                  </>
              );
    }
    });

    return (
      <>

<div className="modal">

        


<div className="sign-modal-content" id="sign-modal-content">
  <button id="modal-close-btn" onClick={()=>this.closemodal1()} className="modal-close-btn"  >
  <i className="material-icons modalclose">close</i>
  </button>
  <div className="signmodalrow">
  <div id="signmodalimg" className="navmobile4">
      
    </div>
    <div id="signcontent" className="navmobile8">
      <h3 className="signheadtext">Sign in to your account</h3>

      <div>

    <div className="content">
        <div className="signup-input-container-large">
          <label
            className="signup-label"
            htmlFor="signup-username"
          >
            Email
          </label>
          <input
            type="email"
            id="modalsigninemail"
            className="signup-input"
          />
        </div>

        <div className="signup-input-container-large">
          <label
            className="signup-label"
            htmlFor="signup-username"
          >
            Password
          </label>
          <input
            type="password"
            id="modalsigninpassword"
            className="signup-input"
          />
        </div>
      
      
  </div>

  <div className="text-muted text-center">
      <small>
        <span id="errorspan" className="text-danger text-center text-bold"></span>
      </small>
  </div>
  


    <button id="modal-fp-btn" className="modal-nooutline-btn"  >
      Forgot Password
    </button>


    
    

    <button id="pv-explore-btn4" className="modal-btn mt-3"  >
      Sign In
    </button>

    </div>

    <h3 className="signimgrandomtxt2">Don't have an account? <span onClick={()=>this.signupfunc()} className="signcolortext">Sign Up</span></h3>
    <h3 className="signimgrandomtxt">or sign in using</h3>
    <div className="sociallogodiv">
        <SocialButton
          provider='google'
          appId='260828609778-9bur850a4dl2k7pffq8iqg08adh8kv70.apps.googleusercontent.com'
          className="sociallogodivicon"
          color="secondary"
        >
            <img alt="..." className="glogo" src={require("../../assets/img/gicon.png")} />
        </SocialButton>
        <SocialButton
          provider='facebook'
          appId='217329769982928'
          className="sociallogodivicon"
          color="secondary"
        >
          <img alt="..." className="flogo" src={require("../../assets/img/ficon.png")} />
        </SocialButton>
    </div>
    </div>
    
  </div>
</div>
</div>


<div className="modal">

  <div className="sign-modal-content" id="sign-modal-content">
    <button id="modal-close-btn" onClick={()=>this.closemodal2()} className="modal-close-btn"  >
    <i className="material-icons modalclose">close</i>
    </button>
    <div className="signmodalrow">
    <div id="signmodalimg" className="navmobile4">
        
        </div>
      <div id="signcontent2" className="navmobile8">
      <h3 className="signheadtext2">Create an account</h3>

      <div>

    <div className="content">
    <div className="signup-input-container-large">
            <label
              className="signup-label"
              htmlFor="signup-username"
            >
              Name
            </label>
            <input
              type="text"
              id="signupname"
              className="signup-input"
            />
          </div>

          <div className="signup-input-container-large">
            <label
              className="signup-label"
              htmlFor="signup-username"
            >
              Email
            </label>
            <input
              type="email"
              id="signupemail"
              className="signup-input"
            />
          </div>

          <div className="signup-input-container-large">
            <label
              className="signup-label"
              htmlFor="signup-username"
            >
              Password
            </label>
            <input
              type="password"
              id="signuppassword"
              className="signup-input"
            />
          </div>

          <div className="signup-input-container-large">
            <label
              className="signup-label"
              htmlFor="signup-username"
            >
              Repeat Password
            </label>
            <input
              type="password"
              id="signuprepassword"
              className="signup-input"
            />
          </div>
      
      
  </div>

  <div className="text-muted text-center">
      <small>
        <span id="errorspan2" className="text-danger text-center text-bold"></span>
      </small>
  </div>
  


    <button id="modal-fp-btn" className="modal-nooutline-btn"  >
      Forgot Password
    </button>



    <button id="pv-explore-btn42" className="modal-btn mt-3"  >
      Sign Up
    </button>

    </div>

    <h3 className="signimgrandomtxt2">Already a member? <span onClick={()=>this.signinfunc()} className="signcolortext">Sign In</span></h3>
    <h3 className="signimgrandomtxt">or sign in using</h3>
    <div className="sociallogodiv">
        <SocialButton
          provider='google'
          appId='260828609778-9bur850a4dl2k7pffq8iqg08adh8kv70.apps.googleusercontent.com'
          className="sociallogodivicon"
          color="secondary"
        >
            <img alt="..." className="glogo" src={require("../../assets/img/gicon.png")} />
        </SocialButton>
        <SocialButton
          provider='facebook'
          appId='217329769982928'
          className="sociallogodivicon"
          color="secondary"
        >
          <img alt="..." className="flogo" src={require("../../assets/img/ficon.png")} />
        </SocialButton>
    </div>


      </div>
    </div>
  </div>
  </div>

        <div className="navbar_container">
          <div className="navbar_wrapperUpper">
            <img onClick={()=>{window.location.href = '/'}} src={require('../../assets/img/logo.png')} className="navbar_logo" />
            
            <div className="navbar_searchWrapper navbar_mobHidden">
              <input type="text" placeholder="Search" onChange={(val)=>this.searchfunc(val)} onFocus={()=>{this.setState({searchshow:true})}} value={this.state.searchval} className="navbar_searchInput" />
              <button className="navbar_searchButton"><img src={require('../../assets/icons/search.png')} className="navbar_searchImg"/></button>
            </div>

            {this.state.searchshow?(
                 <div
                 className="searchdropdown"
               >
                 <Row className="searchrow">
                 <h6 className="searchtxt">Products</h6>
                 <i onClick={()=>{this.setState({searchshow:false})}} className="material-icons searchclose">close</i>
                 {ProductArray}
               </Row>
               </div>
              ):(<></>)}
           

            <div className="navbar_actionContainer">

            {this.state.loggedIn?(
                <span className="navbar_actionWrapper navbar_mobHidden">
                <img className="navbar_actionIcon" onClick={()=> window.location.href = '/wishlist'} src={require('../../assets/icons/reheart.png')} />
              </span>
              ):(<></>)}

              <UncontrolledDropdown>
                 <span className="navbar_actionWrapper cartbtn" onClick={()=>this.showDrop()}>
                  <img className="navbar_actionIcon" src={require('../../assets/icons/recart.png')} />
                  <span className="carttotal">{cart.length}</span></span>
                  
                    {this.state.showdrop?(
                      <div
                      className="cartdropdown"
                    >
                      <Row className="cartnavrow">
                      <h6 className="navshoptext">Your Cart</h6>
                      <CartNav/>
                    </Row>
                    </div>
                    ):(<></>)}
                    
                    
                  
                </UncontrolledDropdown>
              
              {this.state.loggedIn?(
                <span className="navbar_actionWrapper navbar_mobHidden">
                  <img className="navbar_actionIcon" src={require('../../assets/icons/renotif.png')} />
                </span>
              ):(<></>)}
              
              <span className="navbar_actionWrapper">
                <img className="navbar_actionIcon" onClick={()=>this.signinfunc()} src={require('../../assets/icons/reuser.png')} />
              </span>
              <span className="navbar_desktopHidden navbar_mobShow navbar_hamburgerIcon" onClick={this.openNav}>&#9776;</span>
            </div>

            <div className="navbar_desktopHidden navbar_mobShow sideNavClose" ref={this.myRef}>
              <span className="closebtn" onClick={this.closeNav}>&times;</span>
              <a href="/home" className="sidemenu_link">Home</a>
              <a href="/aboutus" className="sidemenu_link">About</a>
              <a href="/shopnow" className="sidemenu_link">Shop Now</a>
              <a href="/customised-landing" className="sidemenu_link">Customised Products</a>
              <a href="/rental" className="sidemenu_link">Rental Products</a>
              <a href="/warranty" className="sidemenu_link">Warranty</a>
              <a href="/blogs" className="sidemenu_link">Blogs</a>
              <a href="/contact" className="sidemenu_link">Contact</a>
            </div>
          </div>
          <div className="navbar_wrapperLower navbar_mobHidden">
            <div className="navbar_linkContainer">
              <a className="navbar_link" href="/" >Home</a>  
            </div>
            <div className="navbar_linkContainer">
              <a className="navbar_link" href="/aboutus" >About</a>  
            </div>
            <div className="navbar_linkContainer">
              <a className="navbar_link" href="/shopnow" >Shop Now</a>  
            </div>
            <div className="navbar_linkContainer">
              <a className="navbar_link" href="/customised" >Customised Products</a>  
            </div>
            <div className="navbar_linkContainer">
              <a className="navbar_link" href="/rental" >Rental Products</a>  
            </div>
            <div className="navbar_linkContainer">
              <a className="navbar_link" href="/warranty" >Warranty</a>  
            </div>
            <div className="navbar_linkContainer">
              <a className="navbar_link" href="/blogs" >Blogs</a>  
            </div>
            <div className="navbar_linkContainer">
              <a className="navbar_link" href="/contact" >Contact</a>  
            </div>
          </div>
        </div>
      </>
    );
  }
}

class SideMenu extends React.Component{
  constructor(){
    super()
  }

  render(){

    const {cart,increase,reduction,removeProduct,total} = this.context;
    
    return(
      <>
        <div className="navbar_desktopHidden navbar_mobShow sideNavOpen" ref={this.myRef}>
          <span className="closebtn" onClick={this.closeNav}>&times;</span>
          <a href="#" className="sidemenu_link">About</a>
          <a href="#" className="sidemenu_link">Services</a>
          <a href="#" className="sidemenu_link">Clients</a>
          <a href="#" className="sidemenu_link">Contact</a>
        </div>
      </>
    )
  }
}

export default Navbar;

