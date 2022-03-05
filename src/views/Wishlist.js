import React from "react";
import { Rating } from 'react-simple-star-rating'

import Navbar from "../components/Navbars/Navbar";

import Footer from "../components/Footer/Footer";

import "../assets/css/wishlist.css"

const axios = require('axios').default

class Wishlist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      wishlist:[],
      loggedIn:false,
      }
  }

  componentDidMount(){
    
      var globalthis = this

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
            .post('https://admin.rehamo.com/api/getwishlist', {
              UserEmail:useremail,
            })
            .then(function (response) {
              console.log(response)

              var Wishlist = response.data

              globalthis.setState({ wishlist: Wishlist });

            })
            .catch(function (error) {
              console.log(error)
            })
                

      }

      fetch()

           
              
          
            this.gotoproductview = async (item) => {
              console.log(item)
              window.location.href = '/shopnow/'+item.ProductNameURL+'/'+item.ProductID+''
                  
            };

            this.removefromwishlist = async (item) => {
              console.log(item)
    
              axios
                .post('https://admin.rehamo.com/api/deletewish', {
                      WishID:item.ProductID,
                      UserEmail:useremail,
                })
                .then(function (response) {
                  //console.log(response)
                  if(response.data === 'wish deleted'){
    
                    fetch();
                  }
    
                  })
                  .catch(function (error) {
                    console.log(error)
                  })
                  
            };
    


  }

  render() {

    let count = 0;

    let WishArray = this.state.wishlist.map((item, i) => {

      var dicountprice = parseInt(item.Product.ProductPrice)/10
      var discountproductprice = parseInt(item.Product.ProductPrice) + (Math.ceil(dicountprice/100)*100)

     
            let Image_Http_URL = `https://rehamobucket.s3.ap-south-1.amazonaws.com/RehamoProducts/`+item.Product.ProductID+`/Images/1_Image.jpg`
            count += 1;
              return (
                <>
                <div key={i} className="wlc_wrapper">
                      <img className="wlc_img" src={Image_Http_URL} />
                      <div className="wlc_detailsWrapper">
                        <h4 className="wlc_name">{item.Product.ProductName}</h4>
                        <div className="wlc_priceContainer">
                          <p className="wlc_price">₹ {item.Product.ProductPrice}</p>
                          <p className="wlc_priceOriginal">₹ {discountproductprice}</p>
                        </div>
                      </div>
                      <div className="wlc_buttonWrapper">
                        <button className="wlc_btn wlc_btnColor1" onClick={()=>this.gotoproductview(item.Product)}>GO TO PRODUCT</button>
                        <button className="wlc_btn wlc_btnColor2" onClick={()=>this.removefromwishlist(item)}>REMOVE</button>
                      </div>
                    </div>
                  </>
              );
    });



    console.log(this.state);
    return (
      <>
        <Navbar />
        <div className="wl_wrapper">
          <p className="wl_heading">Wishlist</p>
          {WishArray}
        </div>
        <Footer/>
      </>
    )
  }
}

class WishlistCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.state);
    return (
      <>
        <div className="wlc_wrapper">
          <img className="wlc_img" src={this.props.img} />
          <div className="wlc_detailsWrapper">
            <h4 className="wlc_name">{this.props.name}</h4>
            <p className="wlc_quantity">Quantity : {this.props.quantity}</p>
            <div className="wlc_priceContainer">
              <p className="wlc_price">{this.props.rate}</p>
              <p className="wlc_priceOriginal">{this.props.rateOriginal}</p>
            </div>
            <Rating size={16}  readonly initialValue={this.props.rating}/>
          </div>
          <div className="wlc_buttonWrapper">
            <button className="wlc_btn wlc_btnColor1">GO TO PRODUCT</button>
            <button className="wlc_btn wlc_btnColor2">REMOVE</button>
          </div>
        </div>
      </>
    )
  }
}



export default Wishlist;
