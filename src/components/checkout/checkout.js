import React from "react";
import uuid from "react-uuid";

import "./checkout.css";
import { Container, Row, Col } from "reactstrap";

import Cart from "../../components/Cart";
import $ from "jquery";

import { DataContext } from "../../components/Context";

const axios = require("axios").default;

class Checkout extends React.Component {
  static contextType = DataContext;

  constructor(props) {
    super(props);
    this.state = {
      fname: "",
      lname: "",
      email: "",
      number: "",
      street1: "",
      street2: "",
      locality: "",
      city: "",
      state: "",
      pincode: "",
      total: "",
      errortext: "Please wait. you will be redirected in 5 sec",
      waitmodal: false,
      cart: [],

      order_id : uuid()
    };
  }

  componentDidUpdate() {
    var globalthis = this;
    setTimeout(() => {
      var value = this.context;
      globalthis.setState({ total: value.total });
      globalthis.setState({ cart: value.cart });
    }, 1000);
  }

  componentDidMount() {
    const { cart, increase, reduction, removeProduct, removeAll, total } =
      this.context;

    var globalthis = this;

    setTimeout(() => {
      var value = this.context;
      globalthis.setState({ total: value.total });
      globalthis.setState({ cart: value.cart });
    }, 1000);

    var randomString = function (len, bits) {
      bits = bits || 36;
      var outStr = "",
        newStr;
      while (outStr.length < len) {
        newStr = Math.random().toString(bits).slice(2);
        outStr += newStr.slice(0, Math.min(newStr.length, len - outStr.length));
      }
      return outStr.toUpperCase();
    };

    $("html,body").animate(
      {
        scrollTop: $(".checkout_container").offset().top - 17,
      },
      10
    );

    $(document).on("click", "#checkoutbtn", function () {
      //BuyFunction()
      BuyFunction();
      //TestFunction()
      //console.log(globalthis.state.total)
      //console.log(globalthis.state.cart)
    });

    $("#pincode").on("input", function (e) {
      // Code here
      var pin = e.target.value;
      if (pin.length === 6) {
        axios
          .get("https://api.postalpincode.in/pincode/" + pin, {})
          .then(function (response) {
            document.getElementById("locality").value =
              response.data[0].PostOffice[0].Name;
            document.getElementById("city").value =
              response.data[0].PostOffice[0].District;
            document.getElementById("state").value =
              response.data[0].PostOffice[0].State;
          })
          .catch(function (error) {
            console.log(error);
            //document.getElementById('mainerrorspan').innerHTML = error
          });
      }
    });

    var shippingthere = true;

    function TestFunction() {
      console.log("test");

      var OrderID = "ORDERID" + randomString(13) + "";

      axios
        .post("/api/make-payment", {
          OrderID: OrderID,
          CustAddress: "No 28, Bangalore - 560015",
          CustName: "Prashanth",
          RedirectURL: "/api/order-redirect",
          Price: "5",
        })
        .then(function (response) {
          console.log(response.data);

          $("#paymentdiv").append(response.data);

          //window.location.hash = "#/auth/login";
        })
        .catch(function (error) {
          console.log(error);
          //document.getElementById('mainerrorspan').innerHTML = error
        });
    }

    function BuyFunction() {
      console.log("in Buy function");

      var tdate = new Date().toLocaleDateString("en-GB");
      var ttime = new Date().toLocaleTimeString("en-GB");
      var Timestamp = tdate + " " + ttime;

      var FinalOrder = [];
      var cart = globalthis.state.cart;

      cart.forEach((item, index) => {
        console.log(item);
        //FinalOrder.push({id:item.id,name:item.data.ProductName,categry:item.data.ProductCategory,price:item.data.ProductPrice,qty:item.count})
      });

      try {
        var OrderID = "ORDERID" + randomString(13) + "";
        var FirstName = document.getElementById("fname").value;
        var LastName = document.getElementById("lname").value;
        var Email = document.getElementById("email").value;
        var Number = document.getElementById("number").value;
        var Street1 = document.getElementById("street1").value;
        var Street2 = document.getElementById("street2").value;
        var Locality = document.getElementById("locality").value;
        var City = document.getElementById("city").value;
        var State = document.getElementById("state").value;
        var Pincode = document.getElementById("pincode").value;
        var GSTNumber = document.getElementById("gstnumber").value;
        var Order = FinalOrder;
        var Total = globalthis.state.total;
        if (Total > 500) {
          Total = Total + 30;
        } else {
          Total = Total + 50;
        }

        var maillist = ["info@rehamo.com"];

        if (
          FirstName !== "" ||
          LastName !== "" ||
          Email !== "" ||
          Number !== "" ||
          Street1 !== "" ||
          Street2 !== "" ||
          Locality !== "" ||
          City !== "" ||
          State !== "" ||
          Pincode !== ""
        ) {
          globalthis.setState({ waitmodal: true });
          globalthis.setState({
            errortext:
              "Please wait. This will take a few minutes. Please don't close or exit this page",
          });

          // $('#checkout_form').submit()

          axios.post("http://localhost:8080/api/ccavRequestHandler", {
            billing_name: FirstName + "+-+" + LastName,
            billing_address: Street1 + "+-+" + Street2 + "+-+" + Locality,
            billing_city: City,
            billing_state: State,
            billing_zip: Pincode,
            billing_country: "India",
            billing_tel: Number,
            billing_email: Email,
            delivery_name: FirstName + "+-+" + LastName,
            delivery_address: Street1 + "+-+" + Street2 + "+-+" + Locality,
            delivery_city: City,
            delivery_state: State,
            delivery_zip: Pincode,
            delivery_country: "India",
            delivery_tel: Number,

            merchant_id: "183192",
            order_id: uuid(),
            currency: "INR",
            amount: Total,
            redirect_url: "/success.html",
            cancel_url: "/cancel.html",
            language: "EN",
          });
        } else {
          alert("Please fill all the details to continue");
        }
      } catch (error) {
        console.log(error);
        alert("Error, Something went wrong");
      }
    }

    //checkoutbtn
  }

  render() {
    return (
      <>
        <Container className="checkout_container">
          <div lg="8" id="checkoutdiv" className="mobile8">
            <div className="container_formWrapper">
              <form
                id="checkout_form"
                className="checkout_form"
                method="POST"
                action="https://nodetesting-ccavenue.herokuapp.com/api/ccavRequestHandler"
              >
                <h4 className="checkout_Content1">Add New Address</h4>

                <p className="checkout_formContent1">Personal Information</p>
                
                <input type="text" name="merchant_id" id="merchant_id" value="848238" hidden />
                <input type="text" name="order_id" id="order_id" value={this.state.order_id} hidden />
                <input type="text" name="currency" id="currency" value="INR" hidden />
                <input type="text" name="amount" id="amount" value='1' hidden />
                <input type="text" name="redirect_url" id="redirect_url" value="/success.html" hidden />
                <input type="text" name="cancel_url" id="cancel_url" value="/failure.html" hidden />
                <input type="text" name="language" id="language" value="EN" hidden />


                <div className="checkout_inputContainer">
                  <input
                    type="text"
                    id="billing_name"
                    name="billing_name"
                    className="checkout_formInputDouble"
                    placeholder="Name"
                  />
                </div>

                <div className="checkout_inputContainer">
                  <input
                    type="email"
                    id="billing_email"
                    name="billing_email"
                    className="checkout_formInputDouble"
                    placeholder="xyz@gmail.com"
                  />
                  <input
                    type="text"
                    id="billing_tel"
                    name="billing_tel"
                    placeholder="XXXXXXXXXX"
                    className="checkout_formInputDouble"
                  />
                </div>

                <p className="checkout_formContent1">GST Number (Optional)</p>
                <div className="checkout_inputContainer">
                  <input
                    type="text"
                    id="gstnumber"
                    className="checkout_formInputSingle"
                    placeholder="GST Number"
                  />
                </div>

                <p className="checkout_formContent1">Address</p>
                <div className="checkout_inputContainer">
                  <input
                    type="text"
                    id="billing_address"
                    name="billing_address"
                    className="checkout_formInputSingle"
                    placeholder="House No, Building"
                  />
                </div>
                
                <div className="checkout_inputContainer">
                  <input
                    type="text"
                    id="billing_city"
                    name="billing_city"
                    className="checkout_formInputDouble"
                    placeholder="City"
                  />
                </div>
                <div className="checkout_inputContainer">
                  <input
                    type="text"
                    id="billing_state"
                    name="billing_state"
                    className="checkout_formInputDouble"
                    placeholder="State"
                  />
                  <input
                    type="text"
                    id="billing_zip"
                    name="billing_zip"
                    className="checkout_formInputDouble"
                    placeholder="Pincode"
                  />
                </div>

                <input id="checkout" placeholder="Checkout" type='submit' value='Checkout'/>
              </form>
            </div>
          </div>
          <div lg="4" id="checkoutdiv2" className="mobile4">
            <div className="checkout_cartWrapper">
              <h4 className="checkout_cartContent1">Shopping Cart</h4>
              <div className="shopcheckoutcart">
                <Cart />
                <div lg="12" className="carttotaldiv">
                  {/* <input id="checkout" placeholder="Checkout" type='submit' value='Checkout'/> */}
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
