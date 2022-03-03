import React from "react";
import { Rating } from 'react-simple-star-rating'

import Navbar from "../components/Navbars/Navbar";
import Component13 from "../components/Component13/Component13";

import $ from 'jquery'
// reactstrap components
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Row,
} from 'reactstrap'

import Footer from "../components/Footer/Footer";

import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from 'react-accessible-accordion';

import 'react-accessible-accordion/dist/fancy-example.css';

import "../assets/css/profile.css";


const axios = require('axios').default

class Products extends React.Component {
  constructor(props) {
    super(props);


    this.state = {
      offers:[],
    };
  }





  componentDidMount(){

    var modal = document.querySelectorAll('.modal')

    try {
      var mainurl = document.location.hash,
        params = mainurl.split('?')[1].split('&'),
        data = {},
        tmp
      for (var i = 0, l = params.length; i < l; i++) {
        tmp = params[i].split('=')
        data[tmp[0]] = tmp[1]
      }
      var id = data.id
      if(id='coupons'){
        var btncount = 0;

        $('.profile-select-btn').each(function() {
          btncount = btncount + 1
          $('.profile-select-btn').removeClass('defaultprofileselect');
          if(btncount === 1){
            $('.profile-select-btn').addClass('defaultprofileselect');
          }
        });
        
        $("#profilecouponcard").show()
        $("#profileinfocard").hide()

      }
    } catch (error) {
      
    }

    var userid = ''
    var URI = ''
    //modal[0].style.display = 'block'

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
    var email = ''

    if (userid) {
      //console.log('user logged in');
      //console.log(userid);
      email = getCookie('useremail')

      try {
        modal[0].style.display = 'none'
      } catch (error) {
        modal[0].style.display = 'none'
      }

      axios
        .post('https://admin.rehamo.com/api/getuserdata', {
          UserEmail: email,
        })
        .then(function (response) {
          console.log(response)
          if (response.data.Status === 'user found') {
            document.getElementById('input-userfirstname').value =
              response.data.user.UserFirstName
            document.getElementById('input-userlastname').value =
              response.data.user.UserLastName
            document.getElementById('input-email').value =
              response.data.user.UserEmail
            if( response.data.user.UserGender !== undefined && response.data.user.UserGender !== ''){
              document.getElementById('input-gender').value =
              response.data.user.UserGender
            }
            if( response.data.user.UserDOB !== undefined && response.data.user.UserDOB !== ''){
              document.getElementById('input-dob').value =
              response.data.user.UserDOB
            }
            if( response.data.user.UserHouse !== undefined && response.data.user.UserHouse !== ''){
              document.getElementById('input-house').value =
              response.data.user.UserHouse
            }
            if( response.data.user.UserLocality !== undefined && response.data.user.UserLocality !== ''){
              document.getElementById('input-locality').value =
              response.data.user.UserLocality
            }
            if( response.data.user.UserDistrict !== undefined && response.data.user.UserDistrict !== ''){
              document.getElementById('input-district').value =
              response.data.user.UserDistrict
            }
            if( response.data.user.UserState !== undefined && response.data.user.UserState !== ''){
              document.getElementById('input-state').value =
              response.data.user.UserState
            }
            if( response.data.user.UserPincode !== undefined && response.data.user.UserPincode !== ''){
              document.getElementById('input-pincode').value =
              response.data.user.UserPincode
            }
            

            document.getElementById('defaultname').innerText =
              response.data.user.UserFirstName

            if (response.data.user.ProfileImage) {
              var img = document.getElementById('profilepicmodal')
              img.setAttribute('crossOrigin', 'anonymous')
              var img2 = document.getElementById('settingsprofilepic')
              img2.setAttribute('crossOrigin', 'anonymous')

              img.src = response.data.user.ProfileImage
              img2.src = response.data.user.ProfileImage
            }
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    } else {
      //window.location.href = '/'
    }

    /*
    var profilepicbtn = document.getElementById('profilepicbtn')
    profilepicbtn.addEventListener('click', function (event) {
      modal[1].style.display = 'block'
    })

    var uploadprofilepicbtn = document.getElementById('uploadprofilepicbtn')
    uploadprofilepicbtn.addEventListener('click', function (event) {
      //console.log('pressed');
      document.getElementById('inputprofilepicbtn').click()
    })

    document
      .getElementById('inputprofilepicbtn')
      .addEventListener('input', function (input) {
        try {
          //console.log(input.target.value);
          //console.log(input.srcElement.files[0].name);

          var file = input.srcElement.files[0]
          //console.log(input.srcElement.files[0].name);

          var reader = new FileReader()
          reader.readAsDataURL(file)

          reader.onload = function () {
            URI = reader.result
            document.getElementById('profilepicmodal').src = reader.result
            document.getElementById('settingsprofilepic').src = reader.result
            var url = reader.result
          }

          reader.onerror = function () {
            //console.log(reader.error);
            alert('Error Opening File')
          }
        } catch (error) {
          console.log(error)
        }
      })

    var closeprofilepicbtn = document.getElementById('closeprofilepicbtn')
    closeprofilepicbtn.addEventListener('click', function (event) {
      modal[1].style.display = 'none'
    })

    var saveprofilepicbtn = document.getElementById('saveprofilepicbtn')
    saveprofilepicbtn.addEventListener('click', function (event) {
      modal[0].style.display = 'block'
      modal[1].style.display = 'none'
      if (URI == '') {
        alert('No Image Selected')
      } else {
        axios
          .post('/api/profilepic', {
            UserEmail: email,
            ProfileImage: URI,
          })
          .then(function (response) {
            if (response.data === 'updated') {
              modal[0].style.display = 'none'
              window.location.reload(false)
            }
          })
          .catch(function (error) {})
      }
    })

    */

    $("#savesettingsbtn").on('click', function () {
      modal[2].style.display = 'block'
      var firstname = document.getElementById('input-userfirstname').value
      var lastname = document.getElementById('input-userlastname').value
      var email = document.getElementById('input-email').value
      var gender = document.getElementById('input-gender').value
      var dob = document.getElementById('input-dob').value
      var house = document.getElementById('input-house').value
      var locality = document.getElementById('input-locality').value
      var district = document.getElementById('input-district').value
      var state = document.getElementById('input-state').value
      var pincode = document.getElementById('input-pincode').value

      axios
        .post('/api/saveuserdata', {
          UserFirstName: firstname,
          UserLastName: lastname,
          UserEmail: email,
          UserGender: gender,
          UserHouse: house,
          UserDOB: dob,
          UserLocality: locality,
          UserDistrict: district,
          UserState: state,
          UserPincode: pincode,
        })
        .then(function (response) {
          console.log(response)
          if (response.data === 'settings saved') {
            modal[2].style.display = 'none'
            window.location.reload(false)

          }
        })
        .catch(function (error) {
          console.log(error)
          modal[2].style.display = 'none'
        })
    });

    var globalthis = this;


    axios
      .post('/api/getofferlist', {
      })
      .then(function (response) {
        console.log(response)

          var Offer = response.data

          globalthis.setState({ offers: Offer });
                 
                
          
        })
        .catch(function (error) {
          console.log(error)
          //modal[0].style.display = 'none'
          //$('#loading-circle').hide();
        })

        function setCookie(name, value, days) {
          var expires = ''
          if (days) {
            var date = new Date()
            date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
            expires = '; expires=' + date.toUTCString()
          }
          document.cookie = name + '=' + (value || '') + expires + '; path=/'
        }



    $(document).on('click', '.profile-select-btn', function () {


        var image_index = $(".profile-select-btn").index(this)

        $('.profile-select-btn').each(function() {
          $('.profile-select-btn').removeClass('defaultprofileselect');
        });

        $(this).addClass('defaultprofileselect');
      
      if(image_index === 0){
        $("#profilecouponcard").hide()
        $("#profileinfocard").show()
      }else if(image_index === 1){
        $("#profilecouponcard").show()
        $("#profileinfocard").hide()
      }else if(image_index === 2){
        setCookie('uid', null, 1)
        setCookie('useremail', null, 1)
          globalthis.setState({ loggedIn: false });
          window.location.href = '/'
      }
      })


  }

  render() {

    let count = 0;
    
    let OfferArray = ''

    OfferArray = this.state.offers.map((item, i) => {

      var todaydate = new Date().toLocaleDateString('en-GB')
      var offerdate = new Date(item.OfferExpiryDate).toLocaleDateString('en-GB')

      if(offerdate>=todaydate){
        count += 1;
          return (
            <div className="coupondiv" key={i}>
            <div className="couponinnerdiv">
              <Row>
                <Col lg="2">
                  <h6 className="couponoffer">{item.OfferDiscount}%<br/>Off</h6>
                </Col>
                <Col lg="10">
                <h6 className="coupondesc">{item.OfferDescription}</h6>
                <h6 className="couponcode">Code: {item.OfferName}</h6>
                </Col>
              </Row>
            </div>
            <div className="innderdiv2">
            <h6 className="couponexpiry">Expiry: {item.OfferExpiryDate} {item.OfferExpiryTime}</h6>
            </div>
          </div>
          );
      }
       
      
      });

      if(count === 0){
        OfferArray = <h6 className="nodatatext">Sorry, No coupons available at the moment. Check back later</h6>
      }

    return (
      <>
        <Navbar />

        <Container className="profile-first-section" fluid>

          <div className="profilemainrow">
            <div className="profilemobile4">
              <Card className="profilepiccard">
                <div className="profilerow2">
                  <div className="profilemobile5">
                  <div className="card-profile-image" id="card-profile-image">
                      <a
                        href="#pablo"
                        id="profilepicbtn"
                        onClick={(e) => e.preventDefault()}
                      >
                        <img
                          alt="..."
                          className="rounded-circle"
                          id="settingsprofilepic"
                          src="./team-4-800x800.jpg"
                        />
                      </a>
                    </div>
                  </div>

                  <div className="profilemobile7">
                  <div className="text-left">
                    <h6 id="defaultnamebefore">Hello,</h6>
                    <h3 id="defaultname">Name</h3>
                  </div>
                  </div>
                </div>
                <div>
                  <div
                    className="profile-select-btn defaultprofileselect"
                  >
                    <span className="btntxt">
                    <i className="fas fa-user-circle profileselecticon"></i>Basic Information</span>
                  </div>
                  <div
                    className="profile-select-btn"
                  >
                    <span className="btntxt">
                    <i className="fas fa-tags profileselecticon"></i>Coupons</span>
                  </div>
                  <div
                    className="profile-select-btn"
                  >
                    <span className="btntxt">
                    <i className="fas fa-logout profileselecticon"></i>Logout</span>
                  </div>
                </div>
                    
              </Card>
                
            </div>
          
            <div className="profilesecondsection profilemobile7">
              <Card className="profileinfocard" id="profileinfocard">
              
                <CardBody>
                  <Form>
                    <div className="pl-lg-4">
                      <div>
                      <div className="profilemobileinputfullrow">
                        <div className="profilemobileinputrow">
                          <FormGroup>
                            <label
                              className="form-control-label profile-label"
                              htmlFor="input-userfirstname"
                            >
                              First Name
                            </label>
                            <Input
                              className="form-control-alternative profile-input"
                              id="input-userfirstname"
                              placeholder="First Name"
                              type="text"
                            />
                          </FormGroup>
                        </div>
                        <div className="profilemobileinputrow">
                        <FormGroup>
                            <label
                              className="form-control-label profile-label"
                              htmlFor="input-userlastname"
                            >
                              Last Name
                            </label>
                            <Input
                              className="form-control-alternative profile-input"
                              id="input-userlastname"
                              placeholder="Last Name"
                              type="text"
                            />
                          </FormGroup>
                         
                        </div>
                        </div>
                        <div className="profilemobileinputfullrow">
                        <div className="profilemobileinputrow">
                        
                          <FormGroup>
                            <label
                              className="form-control-label profile-label"
                              htmlFor="input-email"
                            >
                              Email address
                            </label>
                            <Input
                              className="form-control-alternative profile-input"
                              id="input-email"
                              placeholder="Email"
                              type="email"
                            />
                          </FormGroup>
                        </div>

                        <div className="profilemobileinputrow">
                        
                          <FormGroup>
                            <label
                              className="form-control-label profile-label"
                              htmlFor="input-email"
                            >
                              Gender
                            </label>
                            <Input
                              className="form-control-alternative profile-input"
                              id="input-gender"
                              placeholder="Gender"
                              type="email"
                            />
                          </FormGroup>
                        </div>
                        </div>

                        <div className="profilemobileinputfullrow">
                        <div className="profilemobileinputrow">
                        
                          <FormGroup>
                            <label
                              className="form-control-label profile-label"
                              htmlFor="input-email"
                            >
                              Date of Birth
                            </label>
                            <Input
                              className="form-control-alternative profile-input"
                              id="input-dob"
                              placeholder="Date Of Birth"
                              type="date"
                            />
                          </FormGroup>
                        </div>

                        <div className="profilemobileinputrow">
                        
                          <FormGroup>
                            <label
                              className="form-control-label profile-label"
                              htmlFor="input-email"
                            >
                              Address
                            </label>
                            <Input
                              className="form-control-alternative profile-input"
                              id="input-house"
                              placeholder="House No, Building, Street, Area"
                              type="text"
                            />
                          </FormGroup>
                        </div>
                        </div>

                        <div className="profilemobileinputfullrow">
                        <div className="profilemobileinputrow">
                        
                          <FormGroup>
                            
                            <Input
                              className="form-control-alternative profile-input"
                              id="input-locality"
                              placeholder="Locality/Town"
                              type="text"
                            />
                          </FormGroup>
                        </div>
                        <div className="profilemobileinputrow">
                        
                          <FormGroup>
                            
                            <Input
                              className="form-control-alternative profile-input"
                              id="input-district"
                              placeholder="District"
                              type="text"
                            />
                          </FormGroup>
                        </div>
                        </div>

                        <div className="profilemobileinputfullrow">
                        <div className="profilemobileinputrow">
                        
                          <FormGroup>
                            
                            <Input
                              className="form-control-alternative profile-input"
                              id="input-state"
                              placeholder="State"
                              type="text"
                            />
                          </FormGroup>
                        </div>
                        <div className="profilemobileinputrow">
                        
                          <FormGroup>
                            
                            <Input
                              className="form-control-alternative profile-input"
                              id="input-pincode"
                              placeholder="Pincode"
                              type="text"
                            />
                          </FormGroup>
                        </div>
                        </div>
                      </div>
                    </div>
                    
                  </Form>

                  <Button
                  id="savesettingsbtn"
                  className="profile-save-btn"
                >
                  <span className="btntxt">Save Changes</span>
                </Button>
                </CardBody>

              </Card>
              <Card className="profileinfocard" id="profilecouponcard">
              
                <CardBody>
                  <Form>
                    <div className="pl-lg-4">
                      <div>
                        <h6 id="couponheader">Available Coupons</h6>
                        <div className="profilemobile6"id="couponcol">
                            {OfferArray}


                        </div>
                      </div>
                    </div>
                    </Form>
                  </CardBody>
                </Card>  
            </div>
          </div>
        </Container>
        <Footer />
      </>
    );
  }
}



export default Products;
