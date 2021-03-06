import React from "react";
import { Rating } from 'react-simple-star-rating'

import Navbar from "../components/Navbars/Navbar";
import Component13 from "../components/Component13/Component13";

import StarRatings from 'react-star-ratings';
import RentalCarousal from '../components/RentalCarousal/RentalCarousal'

import Footer from "../components/Footer/Footer";
import ReactStars from "react-rating-stars-component";
import {Row,Col,Container} from 'reactstrap';

import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from 'react-accessible-accordion';

import 'react-accessible-accordion/dist/fancy-example.css';

import "../assets/css/products.css";


const axios = require('axios').default

var products=[
  {name:"Electric wheelchair",image:require('../assets/img/products/img1a.png'),description:"active eco | light weight aluminum wheelchair",stars:0,oldPrice:"₹19000",price:"₹15000",like:false},
  {name:"Electric wheelchair",image:require('../assets/img/products/img1b.png'),description:"active eco | light weight aluminum wheelchair",stars:5,oldPrice:"₹19000",price:"₹18000",like:false},
  {name:"Electric wheelchair",image:require('../assets/img/products/img1c.png'),description:"active eco | light weight aluminum wheelchair",stars:4,oldPrice:"₹29000",price:"₹25000",like:false},
  {name:"Electric wheelchair",image:require('../assets/img/products/img1d.png'),description:"active eco | light weight aluminum wheelchair",stars:3,oldPrice:"₹19000",price:"₹14000",like:false},
  {name:"Electric wheelchair",image:require('../assets/img/products/img1e.png'),description:"active eco | light weight aluminum wheelchair",stars:4.5,oldPrice:"₹30000",price:"₹27000",like:false},
  {name:"Electric wheelchair",image:require('../assets/img/products/img1e.png'),description:"active eco | light weight aluminum wheelchair",stars:4.5,oldPrice:"30000",price:"₹27000",like:false},
];

class Rental extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      products:[],
      subcategory:'All',
      category:'All',
      sort:'All',
      openkey:['g','h','i','j','k','l'],
      selectprice: { min: 0, max: 1000000 },
      subcategories:[
        'All',
        'Standard Economy',
        'Standard Premium',
        'Transit',
        'Power',
        'Reclining',
        'Active',
        'Sports',

        'Footwear',
        'Insoles',
        'Supports',

        'Bedroom Aids',
        'Transfer Aids',

        'Walkers',
        'Canes',
        'Crutches',
        'Rollators',

        'Wheelchair',
        'Walker',

        'Grab Bars',
        'Shower Chair',
        'Shower/Commode Chairs',
        'Commode Chair',
      ],

      wheelchairsaccord:false,
      pediatricaccord:false,
      orthoticsaccord:false,
      bandtaccord:false,
      aandlaccord:false,
      mobilityaccord:false,
      phaccord:false,
      eaaccord:false,
      rcaccord:false,
      icuaccord:false,


      Legs:'All',
      Leg1:false,
      Leg3:false,
      Leg4:false,
      LegN:true,
      Size:'All',
      SizeSm:false,
      SizeMd:false,
      SizeLg:false,
      Size16:false,
      Size18:false,
      Size20:false,
      Size22:false,
      SizeN:true,
      Mat:'All',
      Mat1:false,
      Mat2:false,
      Mat3:false,
      Mat4:false,
      MatN:true,
      Ag:'All',
      Ag1:false,
      Ag2:false,
      AgN:true,
    };

    this.changeMin = this.changeMin.bind(this)

  }

  handleSelect = (name, value) => {
    console.log(name,value)
    this.setState({ [name]: value.target.value });
  }

  handleURLSelect = (name, value) => {
    console.log(name,value)
    this.setState({ [name]: value });
  }

  handleCategory = (name, value) => {
    console.log(name,value)
    this.setState({ [name]: value});
   
    if(value === 'Wheelchairs'){
      var subcategories=[
        'All',
        'Standard Economy',
        'Standard Premium',
        'Transit',
        'Power',
        'Reclining',
        'Active',
        'Sports',]
        this.setState({ subcategories: subcategories});
    }else if(value === 'Pediatric'){
      var subcategories=[
        'All',
        'Wheelchair',
        'Walker',]
        this.setState({ subcategories: subcategories});
    }else if(value === 'Orthotics'){
      var subcategories=[
        'All',
        'Footwear',
        'Insoles',
        'Supports',]
        this.setState({ subcategories: subcategories});
    }else if(value === 'Beds & Transfers'){
      var subcategories=[
        'All',
        'Bedroom Aids',
        'Transfer Aids',]
        this.setState({ subcategories: subcategories});
    }else if(value === 'Assisted Living'){
      var subcategories=[
        'All',
        'Grab Bars',
        'Shower Chair',
        'Shower/Commode Chairs',
        'Commode Chair',
        ]
        this.setState({ subcategories: subcategories});
    }else if(value === 'Mobility'){
      var subcategories=[
        'All',
        'Walkers',
        'Canes',
        'Crutches',
        'Rollators',
        ]
        this.setState({ subcategories: subcategories});
    }
    
  }

  changeMin(evt){
    let val = evt.target.value
    this.setState({
      selectprice : {
        min : val, 
        max : this.state.value.max
      }
    })
  }

  changeMax(evt){
    let val = evt.target.value
    this.setState({
      selectprice : {
        max : val, 
        min : this.state.value.min
      }
    })
  }

  componentDidMount(){
    var globalthis = this
    var origproducts = []
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

      try {
        
        var cat = this.props.match.params.catName
        var sub = this.props.match.params.subName

        let catresult = cat.replace("+%26+", " & ");
        catresult = catresult.replace("-&-", " & ");
        catresult = catresult.replace("+", " ");
        catresult = catresult.replace("-", " ");
        let subresult = sub.replace("+", " ");
        subresult = subresult.replace("-", " ");

          if(catresult === 'Wheelchairs'){
              this.setState({ wheelchairsaccord:true});
          }else if(catresult === 'Pediatric'){
            this.setState({ pediatricaccord:true});
          }else if(catresult === 'Orthotics'){
            this.setState({ orthoticsaccord:true});
          }else if(catresult === 'Beds & Transfers'){
            this.setState({ bandtaccord:true});
          }else if(catresult === 'Assisted Living'){
            this.setState({ aandlaccord:true});
          }else if(catresult === 'Mobility'){
            this.setState({ mobilityaccord:true});
          }else if(catresult === 'Patient Hygiene'){
            this.setState({ phaccord:true});
          }else if(catresult === 'Exercise Aids'){
            this.setState({ eaaccord:true});
          }else if(catresult === 'Respiratory Care'){
            this.setState({ rcaccord:true});
          }else if(catresult === 'ICU Care'){
            this.setState({ icuaccord:true});
          }
          
          console.log(catresult)
          this.handleCategory('category', catresult)
          this.handleURLSelect('subcategory', subresult)

        } catch (error) {
          console.log(error)
        }


        this.changeaccord = async (val) => {
          if(val == 'wheelchairs'){
            globalthis.setState({wheelchairsaccord:!(this.state.wheelchairsaccord)})
          }else if(val == 'pediatric'){
            globalthis.setState({pediatricaccord:!(this.state.pediatricaccord)})
          }else if(val == 'orthotics'){
            globalthis.setState({orthoticsaccord:!(this.state.orthoticsaccord)})
          }else if(val == 'bandt'){
            globalthis.setState({bandtaccord:!(this.state.bandtaccord)})
          }else if(val == 'aandl'){
            globalthis.setState({aandlaccord:!(this.state.aandlaccord)})
          }else if(val == 'mobility'){
            globalthis.setState({mobilityaccord:!(this.state.mobilityaccord)})
          }else if(val == 'icu'){
            globalthis.setState({icuaccord:!(this.state.icuaccord)})
          }else if(val == 'ph'){
            globalthis.setState({phaccord:!(this.state.phaccord)})
          }else if(val == 'rc'){
            globalthis.setState({rcaccord:!(this.state.rcaccord)})
          }else if(val == 'ea'){
            globalthis.setState({eaaccord:!(this.state.eaaccord)})
          }
        };

        var wishlist =[]

        if(useremail){
          axios
          .post('https://admin.rehamo.com/api/getwishlist', {
            UserEmail:useremail,
          })
          .then(function (response) {
            console.log(response)

            var Wishlist = response.data

            Wishlist.forEach((item,i) => {
              wishlist.push(item.WishID)
            });

          })
          .catch(function (error) {
            console.log(error)
          })

        }

      axios
      .post('https://admin.rehamo.com/api/getrentalproductlist', {
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

          Product.forEach((item,i) => {

            console.log(item.ProductName)
            if(useremail){
              if(wishlist.includes(item.ProductID)){
                item.Wishlist = true
              }else{
                item.Wishlist = false
              }
            }

            axios
            .post('https://admin.rehamo.com/api/getratinglist', {
              ProductID: item.ProductID,
            })
            .then(function (response) {
              console.log(response)

              var Ratings = response.data
    
              var length = Ratings.length
              if(length !== 0){
                var total = 0
                var count = 0
                Ratings.forEach((data,index) => {
                  count = count + 1
                  total = total + parseInt(data.Rating) 
                    if(count === length){
                      var trating = total/length
                      //globalthis.setState({ totalrate: parseFloat(trating).toFixed(1)});
                      item.Ratings = parseInt(trating)
                  }
                });
              }else{
                item.Ratings = 0
              }
    
              
              })
              .catch(function (error) {
                //console.log(error)
                //modal[0].style.display = 'none'
                //$('#loading-circle').hide();
              })


          });

          setTimeout(() => {
            globalthis.setState({ products: Product });
            
          }, 1000);
          
          globalthis.setState({ products: Product });

          origproducts = Product
          //console.log(ApplyProducts)
          //console.log(IntakeProducts)
          //console.log(MeasureProducts)
          //console.log(RelaxProducts)
                 
                
          
        })
        .catch(function (error) {
          console.log(error)
          //modal[0].style.display = 'none'
          //$('#loading-circle').hide();
        })
    

        this.handleLegs = async (name,item) => {
          var trfl = item.target.checked
          if(trfl){
            if(name === 'Leg1'){
              this.setState({'Legs':'1'})
              this.setState({'Leg1':true})
              this.setState({'Leg3':false})
              this.setState({'Leg4':false})
              this.setState({'LegN':false})
            }else if(name === 'Leg3'){
              this.setState({'Legs':'3'})
              this.setState({'Leg1':false})
              this.setState({'Leg3':true})
              this.setState({'Leg4':false})
              this.setState({'LegN':false})
            }else if(name === 'Leg4'){
              this.setState({'Legs':'4'})
              this.setState({'Leg1':false})
              this.setState({'Leg3':false})
              this.setState({'Leg4':true})
              this.setState({'LegN':false})
            }else if(name === 'LegN'){
              this.setState({'Legs':'All'})
              this.setState({'Leg1':false})
              this.setState({'Leg3':false})
              this.setState({'Leg4':false})
              this.setState({'LegN':true})
            }
          }else{
            this.setState({'Legs':'All'})
            this.setState({'Leg1':false})
            this.setState({'Leg3':false})
            this.setState({'Leg4':false})
            this.setState({'LegN':true})
          }
          
        }
  
        this.handleSize = async (name,item) => {
          var trfl = item.target.checked
          if(trfl){
            if(name === 'SizeSm'){
              this.setState({'Size':'Small'})
              this.setState({'SizeSm':true})
              this.setState({'SizeMd':false})
              this.setState({'SizeLg':false})
              this.setState({'Size16':false})
              this.setState({'Size18':false})
              this.setState({'Size20':false})
              this.setState({'Size22':false})
              this.setState({'SizeN':false})
              SizeCheck('Small')
            }else if(name === 'SizeMd'){
              this.setState({'Size':'Medium'})
              this.setState({'SizeSm':false})
              this.setState({'SizeMd':true})
              this.setState({'SizeLg':false})
              this.setState({'Size16':false})
              this.setState({'Size18':false})
              this.setState({'Size20':false})
              this.setState({'Size22':false})
              this.setState({'SizeN':false})
              SizeCheck('Medium')
            }else if(name === 'SizeLg'){
              this.setState({'Size':'Large'})
              this.setState({'SizeSm':false})
              this.setState({'SizeMd':false})
              this.setState({'SizeLg':true})
              this.setState({'Size16':false})
              this.setState({'Size18':false})
              this.setState({'Size20':false})
              this.setState({'Size22':false})
              this.setState({'SizeN':false})
              SizeCheck('Large')
            }else if(name === 'Size16'){
              this.setState({'Size':'16 Inches'})
              this.setState({'SizeSm':false})
              this.setState({'SizeMd':false})
              this.setState({'SizeLg':false})
              this.setState({'Size16':true})
              this.setState({'Size18':false})
              this.setState({'Size20':false})
              this.setState({'Size22':false})
              this.setState({'SizeN':false})
              SizeCheck('16 inches')
            }else if(name === 'Size18'){
              this.setState({'Size':'168Inches'})
              this.setState({'SizeSm':false})
              this.setState({'SizeMd':false})
              this.setState({'SizeLg':false})
              this.setState({'Size16':false})
              this.setState({'Size18':true})
              this.setState({'Size20':false})
              this.setState({'Size22':false})
              this.setState({'SizeN':false})
              SizeCheck('18 inches')
            }else if(name === 'Size20'){
              this.setState({'Size':'20 Inches'})
              this.setState({'SizeSm':false})
              this.setState({'SizeMd':false})
              this.setState({'SizeLg':false})
              this.setState({'Size16':false})
              this.setState({'Size18':false})
              this.setState({'Size20':true})
              this.setState({'Size22':false})
              this.setState({'SizeN':false})
              SizeCheck('20 inches')
            }else if(name === 'Size22'){
              this.setState({'Size':'22 Inches'})
              this.setState({'SizeSm':false})
              this.setState({'SizeMd':false})
              this.setState({'SizeLg':false})
              this.setState({'Size16':false})
              this.setState({'Size18':false})
              this.setState({'Size20':false})
              this.setState({'Size22':true})
              this.setState({'SizeN':false})
              SizeCheck('22 Inches')
            }else if(name === 'SizeN'){
              this.setState({'Size':'All'})
              this.setState({'SizeSm':false})
              this.setState({'SizeMd':false})
              this.setState({'SizeLg':false})
              this.setState({'Size16':false})
              this.setState({'Size18':false})
              this.setState({'Size20':false})
              this.setState({'Size22':false})
              this.setState({'SizeN':true})
              this.setState({products:origproducts})
            }
          }else{
            this.setState({'Size':'All'})
              this.setState({'SizeSm':false})
              this.setState({'SizeMd':false})
              this.setState({'Sizelg':false})
              this.setState({'Size16':false})
              this.setState({'Size18':false})
              this.setState({'Size20':false})
              this.setState({'Size22':false})
              this.setState({'SizeN':true})
              this.setState({products:origproducts})
          }
          
        }
  
        function SizeCheck(searchsize) {
          var products = globalthis.state.products
          var newproducts = []
          products.forEach((data,i) => {
            var Sizes = data.Sizes
            Sizes.forEach((size) => {
              console.log(size.size)
              console.log(searchsize)
              if(size.size === searchsize){
                newproducts.push(data)
              }
            });
          });
          globalthis.setState({products:newproducts})
        }
  
  
  
        this.handleMaterial = async (name,item) => {
          var trfl = item.target.checked
          if(trfl){
            if(name === 'Mat1'){
              this.setState({'Mat':'Aluminum'})
              this.setState({'Mat1':true})
              this.setState({'Mat2':false})
              this.setState({'Mat3':false})
              this.setState({'Mat4':false})
              this.setState({'MatN':false})
              MatCheck('Aluminium')
            }else if(name === 'Mat2'){
              this.setState({'Mat':'Steel'})
              this.setState({'Mat1':false})
              this.setState({'Mat2':true})
              this.setState({'Mat3':false})
              this.setState({'Mat4':false})
              this.setState({'MatN':false})
              MatCheck('Steel')
            }else if(name === 'Mat3'){
              this.setState({'Mat':'Mild Steel'})
              this.setState({'Mat1':false})
              this.setState({'Mat2':false})
              this.setState({'Mat3':true})
              this.setState({'Mat4':false})
              this.setState({'MatN':false})
              MatCheck('Mild Steel')
            }else if(name === 'Mat4'){
              this.setState({'Mat':'Nylon And Steel'})
              this.setState({'Mat1':false})
              this.setState({'Mat2':false})
              this.setState({'Mat3':false})
              this.setState({'Mat4':true})
              this.setState({'MatN':false})
              MatCheck('Nylon And Steel')
            }else if(name === 'MatN'){
              this.setState({'Mat':'All'})
              this.setState({'Mat1':false})
              this.setState({'Mat2':false})
              this.setState({'Mat3':false})
              this.setState({'Mat4':false})
              this.setState({'MatN':true})
              this.setState({products:origproducts})
            }
          }else{
            this.setState({'Mat':'All'})
            this.setState({'Mat1':false})
            this.setState({'Mat2':false})
            this.setState({'Mat3':false})
            this.setState({'Mat4':false})
            this.setState({'MatN':true})
            this.setState({products:origproducts})
          }
          
        }
  
        function MatCheck(searchmat) {
          var products = globalthis.state.products
          var newproducts = []
          products.forEach((data,i) => {
            if(data.Material === searchmat){
              newproducts.push(data)
            }
          });
          globalthis.setState({products:newproducts})
        }
  
  
        this.handleAG = async (name,item) => {
          var trfl = item.target.checked
          if(trfl){
            if(name === 'Ag1'){
              this.setState({'Ag':'Adults'})
              this.setState({'Ag1':true})
              this.setState({'Ag2':false})
              this.setState({'AgN':false})
              MatCheck('Aluminium')
            }else if(name === 'Ag2'){
              this.setState({'Ag':'Children'})
              this.setState({'Ag1':false})
              this.setState({'Ag2':true})
              this.setState({'AgN':false})
              MatCheck('Steel')
            }else if(name === 'AgN'){
              this.setState({'Ag':'All'})
              this.setState({'Ag1':false})
              this.setState({'Ag2':false})
              this.setState({'AgN':true})
              this.setState({products:origproducts})
            }
          }else{
            this.setState({'Ag':'All'})
            this.setState({'Ag1':false})
            this.setState({'Ag2':false})
            this.setState({'AgN':true})
            this.setState({products:origproducts})
          }
          
        }
  
        function AGCheck(searchmat) {
          var products = globalthis.state.products
          var newproducts = []
          products.forEach((data,i) => {
            if(data.AgeGroup === searchmat){
              newproducts.push(data)
            }
          });
          globalthis.setState({products:newproducts})
        }

        this.gotorentalview = async (item) => {
          console.log(item)
          let catresult = item.ProductCategory.replace(" ", "-");
          let subresult = item.SubCategory.replace(" ", "-");
          window.location.href = '/rental/'+catresult+'/'+subresult+'/'+item.ProductNameURL+'/'+item.ProductID+''    
        };

        this.gotorentalview2 = async (item) => {
          console.log(item)
          let catresult = item.ProductCategory.replace(" ", "-");
          let subresult = item.SubCategory.replace(" ", "-");
          window.location.href = '/rental/'+catresult+'/'+subresult+'/'+item.ProductNameURL+'/'+item.ProductID+''
        };

        this.changeurlparams = (cat,subcat) => {
          let catresult = cat.replace(" ", "-");
          let subresult = subcat.replace(" ", "-");
          window.location.href = '/rental/'+catresult+'/'+subresult
        }

  }

  render() {

    let count = 0;
    let subcount = 0;
    let products = [];
    let subcategory = this.state.subcategory
    let category = this.state.category
    let sort = this.state.sort

    let ProductArray = this.state.products.map((item, i) => {

      var ratings = item.Ratings

      if(ratings){
        ratings = parseInt(item.Ratings)
      }else{
        ratings = 0
      }
      
      if (item.ProductStatus =="Active") {
        if(parseInt(item.ProductStock)!==0){
        if(category === item.ProductCategory || category === 'All'){
          if((subcategory === item.SubCategory) || (subcategory === 'All')){
            let Image_Http_URL = `https://rehamobucket.s3.ap-south-1.amazonaws.com/RehamoProducts/`+item.ProductID+`/Images/1_Image.jpg`
            count += 1;
              return (
                <>
    
              <Col lg="3" key={i} className="productsCard_container products_col">
                           
                        <div className="products_row productsCard_imgWrapper">
                          <img className="productsCard_imgrental" onClick={() => this.gotorentalview(item)} src={Image_Http_URL} alt="Image" />
                          </div>
                        <div className="productsCard_contentContainer product_col"> 
                        <StarRatings
                              rating={ratings}
                              starRatedColor="#FFC049"
                              numberOfStars={5}
                              name='rating'
                              starDimension="16px"
                              starSpacing="2px"
                              className="productView_ratingStar"
                            />             
                          <p className="productsCard_type">{item.SubCategory}</p>
                          <p className="productsCard_name" onClick={() => this.gotorentalview(item)}>{item.ProductName}</p>
                          <div className="products_row">
                            <p className="productsCard_oldPrice"></p>
                            <p className="productsCard_price"></p>
                          </div>
                          <div className="products_row1">
                            {/*<Rating size={16} />*/}
                            <div className="productsCard_btn" onClick={() => this.gotorentalview(item)}>Enquire Now</div>
                          </div>
                        </div>
                      </Col>
                  </>
              );
          }
        }
      }else{
        if(category === item.ProductCategory || category === 'All'){
          if((subcategory === item.SubCategory) || (subcategory === 'All')){
            let Image_Http_URL = `https://rehamobucket.s3.ap-south-1.amazonaws.com/RehamoProducts/`+item.ProductID+`/Images/1_Image.jpg`
            count += 1;
              return (
                <>
    
              <Col lg="3" key={i} className="productsCard_container products_col">
                          
                        <div className="products_row productsCard_imgWrapper">
                          <img className="productsCard_imgrental" onClick={() => this.gotorentalview(item)} src={Image_Http_URL} alt="Image" />
                          </div>
                        <div className="productsCard_contentContainer product_col">
                        <StarRatings
                              rating={ratings}
                              starRatedColor="#FFC049"
                              numberOfStars={5}
                              name='rating'
                              starDimension="16px"
                              starSpacing="2px"
                              className="productView_ratingStar"
                            />              
                          <p className="productsCard_type">{item.SubCategory}</p>
                          <p className="productsCard_name" onClick={() => this.gotorentalview(item)}>{item.ProductName}</p>
                          <div className="products_row">
                            <p className="productsCard_oldPrice"></p>
                            <p className="productsCard_price"></p>
                          </div>
                          <div className="products_row1">
                            <div className="productsCard_btnstock" onClick={() => this.gotorentalview(item)}>Out Of Stock</div>
                          </div>
                        </div>
                      </Col>
                  </>
              );
          }
        }
      }
      
    }
    });

        let SubCArray = this.state.subcategories.map((item, i) => {
      
          subcount += 1;
                  return (
                    <>
                       <option key={i} value={item}>{item}</option>
                      </>
                  );
      });

      if(count==0){
        ProductArray = <h6 className="nonetext">
        Sorry, There are no products available.
      </h6>
      }

    return (

      
      <>
        <Navbar />

        <RentalCarousal/>
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
<div className="products_hrLine"></div>

<div className="products_row products_upperWrapper">


<div className="compo13_wrapper">
  <h4 className="compo13_heading" onClick={() =>{this.changeurlparams('All','All'); this.handleCategory('category', 'All')}}>All Products</h4>



  <Accordion preExpanded={this.state.openkey}  allowMultipleExpanded={true} className="sidebaraccordIan">

            <AccordionItem dangerouslySetExpanded={this.state.bandtaccord} onClick={()=>this.changeaccord('bandt')} uuid="a">
                <AccordionItemHeading className="sidebaraccordIanhead">
                <AccordionItemButton className="sidebaraccordIanbtn">
                Beds & Transfers
                    <i class="material-icons sidebaraccordianbtnicon">expand_more</i>
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel className="sidebaraccordIanpanel">
                <div className="sidebaraccordIanpanelinside">
                  <a className="compo13_link" onClick={() => {this.changeurlparams('Beds & Transfers', 'All'); this.handleCategory('category', 'Beds & Transfers'); this.handleSelect('subcategory', 'All')}}>All</a>
                  <a className="compo13_link" onClick={() => {this.changeurlparams('Beds & Transfers', 'Bedroom Aids'); this.handleCategory('category', 'Beds & Transfers'); this.handleSelect('subcategory', 'Bedroom Aids')}}>Bedroom Aids</a>
                  <a className="compo13_link" onClick={() => {this.changeurlparams('Beds & Transfers', 'Transfer Aids'); this.handleCategory('category', 'Beds & Transfers'); this.handleSelect('subcategory', 'Transfer Aids')}}>Transfer Aids</a>
                  </div>
                </AccordionItemPanel>
            </AccordionItem>

            <AccordionItem dangerouslySetExpanded={this.state.mobilityaccord} onClick={()=>this.changeaccord('mobility')} uuid="b">
                <AccordionItemHeading className="sidebaraccordIanhead">
                <AccordionItemButton className="sidebaraccordIanbtn">
                Mobility
                    <i class="material-icons sidebaraccordianbtnicon">expand_more</i>
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel className="sidebaraccordIanpanel">
                <div className="sidebaraccordIanpanelinside">
                  <a className="compo13_link" onClick={() => {this.changeurlparams('Mobility', 'All'); this.handleCategory('category', 'Mobility'); this.handleSelect('subcategory', 'All')}}>All</a>
                  <a className="compo13_link" onClick={() => {this.changeurlparams('Mobility', 'Walker'); this.handleCategory('category', 'Mobility'); this.handleSelect('subcategory', 'Walker')}}>Walker</a>
                  <a className="compo13_link" onClick={() => {this.changeurlparams('Mobility', 'Canes'); this.handleCategory('category', 'Mobility'); this.handleSelect('subcategory', 'Canes')}}>Canes</a>
                  <a className="compo13_link" onClick={() => {this.changeurlparams('Mobility', 'Crutches'); this.handleCategory('category', 'Mobility'); this.handleSelect('subcategory', 'Crutches')}}>Crutches</a>
                  <a className="compo13_link" onClick={() => {this.changeurlparams('Mobility', 'Rollators'); this.handleCategory('category', 'Mobility'); this.handleSelect('subcategory', 'Rollators')}}>Rollators</a>
                  </div>
                </AccordionItemPanel>
            </AccordionItem>

            <AccordionItem dangerouslySetExpanded={this.state.phaccord} onClick={()=>this.changeaccord('ph')} uuid="c">
                <AccordionItemHeading className="sidebaraccordIanhead">
                <AccordionItemButton className="sidebaraccordIanbtn">
                Patient Hygiene
                    <i class="material-icons sidebaraccordianbtnicon">expand_more</i>
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel className="sidebaraccordIanpanel">
                <div className="sidebaraccordIanpanelinside">
                  <a className="compo13_link" onClick={() => {this.changeurlparams('Patient Hygiene', 'Others'); this.handleCategory('category', 'Patient Hygiene'); this.handleSelect('subcategory', 'Others')}}>Others</a>
                  </div>
                </AccordionItemPanel>
            </AccordionItem>

            <AccordionItem dangerouslySetExpanded={this.state.eaaccord} onClick={()=>this.changeaccord('ea')} uuid="d">
                <AccordionItemHeading className="sidebaraccordIanhead">
                <AccordionItemButton className="sidebaraccordIanbtn">
                Exercise Aids
                    <i class="material-icons sidebaraccordianbtnicon">expand_more</i>
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel className="sidebaraccordIanpanel">
                <div className="sidebaraccordIanpanelinside">
                  <a className="compo13_link" onClick={() => {this.changeurlparams('Exercise Aids', 'Others'); this.handleCategory('category', 'Exercise Aids'); this.handleSelect('subcategory', 'Others')}}>Others</a>
                  </div>
                </AccordionItemPanel>
            </AccordionItem>

            <AccordionItem dangerouslySetExpanded={this.state.rcaccord} onClick={()=>this.changeaccord('rc')} uuid="e">
                <AccordionItemHeading className="sidebaraccordIanhead">
                <AccordionItemButton className="sidebaraccordIanbtn">
                Respiratory Care
                    <i class="material-icons sidebaraccordianbtnicon">expand_more</i>
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel className="sidebaraccordIanpanel">
                <div className="sidebaraccordIanpanelinside">
                  <a className="compo13_link" onClick={() => {this.changeurlparams('Respiratory Care', 'Others'); this.handleCategory('category', 'Respiratory Care'); this.handleSelect('subcategory', 'Others')}}>Others</a>
                  </div>
                </AccordionItemPanel>
            </AccordionItem>

            <AccordionItem dangerouslySetExpanded={this.state.icuaccord} onClick={()=>this.changeaccord('icu')} uuid="f">
                <AccordionItemHeading className="sidebaraccordIanhead">
                <AccordionItemButton className="sidebaraccordIanbtn">
                ICU Care
                    <i class="material-icons sidebaraccordianbtnicon">expand_more</i>
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel className="sidebaraccordIanpanel">
                <div className="sidebaraccordIanpanelinside">
                  <a className="compo13_link" onClick={() => {this.changeurlparams('ICU Care', 'Others'); this.handleCategory('category', 'ICU Care'); this.handleSelect('subcategory', 'Others')}}>Others</a>
                  </div>
                </AccordionItemPanel>
            </AccordionItem>


            
            <AccordionItem uuid="g">
                <AccordionItemHeading className="sidebaraccordIanhead">
                <AccordionItemButton className="sidebaraccordIanbtn">
                    Legs
                    <i class="material-icons sidebaraccordianbtnicon">expand_more</i>
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel className="sidebaraccordIanpanel">
                <div className="sidebaraccordIanpanelinside">
                <div className="prodcheckboxdiv"><input type="checkbox" checked={this.state.LegN} onChange={event=>this.handleLegs('LegN',event)} className="productcheckbox"/><span className="compo13_link2">All</span></div>
                <div className="prodcheckboxdiv"><input type="checkbox" checked={this.state.Leg1} onChange={event=>this.handleLegs('Leg1',event)} className="productcheckbox"/><span className="compo13_link2">1</span></div>
                <div className="prodcheckboxdiv"><input type="checkbox" checked={this.state.Leg3} onChange={event=>this.handleLegs('Leg3',event)} className="productcheckbox"/><span className="compo13_link2">3</span></div>
                <div className="prodcheckboxdiv"><input type="checkbox" checked={this.state.Leg4} onChange={event=>this.handleLegs('Leg4',event)} className="productcheckbox"/><span className="compo13_link2">4</span></div>
                  </div>
                </AccordionItemPanel>
            </AccordionItem>

            <AccordionItem uuid="h">
                <AccordionItemHeading className="sidebaraccordIanhead">
                <AccordionItemButton className="sidebaraccordIanbtn">
                    Sizes
                    <i class="material-icons sidebaraccordianbtnicon">expand_more</i>
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel className="sidebaraccordIanpanel">
                <div className="sidebaraccordIanpanelinside">
                <div className="prodcheckboxdiv"><input type="checkbox" checked={this.state.SizeN} onChange={event=>this.handleSize('SizeN',event)} className="productcheckbox"/><span className="compo13_link2">All</span></div>
                <div className="prodcheckboxdiv"><input type="checkbox" checked={this.state.SizeSm} onChange={event=>this.handleSize('SizeSm',event)}  className="productcheckbox"/><span className="compo13_link2">Small</span></div>
                <div className="prodcheckboxdiv"><input type="checkbox" checked={this.state.SizeMd} onChange={event=>this.handleSize('SizeMd',event)}  className="productcheckbox"/><span className="compo13_link2">Medium</span></div>
                <div className="prodcheckboxdiv"><input type="checkbox" checked={this.state.SizeLg} onChange={event=>this.handleSize('SizeLg',event)}  className="productcheckbox"/><span className="compo13_link2">Large</span></div>
                <div className="prodcheckboxdiv"><input type="checkbox" checked={this.state.Size16} onChange={event=>this.handleSize('Size16',event)}  className="productcheckbox"/><span className="compo13_link2">16 Inches</span></div>
                <div className="prodcheckboxdiv"><input type="checkbox" checked={this.state.Size18} onChange={event=>this.handleSize('Size18',event)}  className="productcheckbox"/><span className="compo13_link2">18 Inches</span></div>
                <div className="prodcheckboxdiv"><input type="checkbox" checked={this.state.Size20} onChange={event=>this.handleSize('Size20',event)}  className="productcheckbox"/><span className="compo13_link2">20 Inches</span></div>
                <div className="prodcheckboxdiv"><input type="checkbox" checked={this.state.Size22} onChange={event=>this.handleSize('Size22',event)}  className="productcheckbox"/><span className="compo13_link2">22 Inches</span></div>
                  </div>
                </AccordionItemPanel>
            </AccordionItem>


            <AccordionItem uuid="i">
                <AccordionItemHeading className="sidebaraccordIanhead">
                <AccordionItemButton className="sidebaraccordIanbtn">
                    Frame Material
                    <i class="material-icons sidebaraccordianbtnicon">expand_more</i>
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel className="sidebaraccordIanpanel">
                <div className="sidebaraccordIanpanelinside">
                <div className="prodcheckboxdiv"><input type="checkbox" checked={this.state.MatN} onChange={event=>this.handleMaterial('MatN',event)}  className="productcheckbox"/><span className="compo13_link2">All</span></div>
                <div className="prodcheckboxdiv"><input type="checkbox" checked={this.state.Mat1} onChange={event=>this.handleMaterial('Mat1',event)}  className="productcheckbox"/><span className="compo13_link2">Aluminium</span></div>
                <div className="prodcheckboxdiv"><input type="checkbox" checked={this.state.Mat2} onChange={event=>this.handleMaterial('Mat2',event)}  className="productcheckbox"/><span className="compo13_link2">Steel</span></div>
                <div className="prodcheckboxdiv"><input type="checkbox" checked={this.state.Mat3} onChange={event=>this.handleMaterial('Mat3',event)}  className="productcheckbox"/><span className="compo13_link2">Mild Steel</span></div>
                <div className="prodcheckboxdiv"><input type="checkbox" checked={this.state.Mat4} onChange={event=>this.handleMaterial('Mat4',event)}  className="productcheckbox"/><span className="compo13_link2">Nylon And Steel</span></div>
                  </div>
                </AccordionItemPanel>
            </AccordionItem>

            <AccordionItem uuid="j">
                <AccordionItemHeading className="sidebaraccordIanhead">
                <AccordionItemButton className="sidebaraccordIanbtn">
                    Age Group
                    <i class="material-icons sidebaraccordianbtnicon">expand_more</i>
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel className="sidebaraccordIanpanel">
                <div className="sidebaraccordIanpanelinside">
                <div className="prodcheckboxdiv"><input type="checkbox" checked={this.state.AgN} onChange={event=>this.handleAG('AgN',event)} className="productcheckbox"/><span className="compo13_link2">All</span></div>
                <div className="prodcheckboxdiv"><input type="checkbox" checked={this.state.Ag1} onChange={event=>this.handleAG('Ag1',event)}  className="productcheckbox"/><span className="compo13_link2">Adult</span></div>
                <div className="prodcheckboxdiv"><input type="checkbox" checked={this.state.Ag2} onChange={event=>this.handleAG('Ag2',event)} className="productcheckbox"/><span className="compo13_link2">Children</span></div>
                  </div>
                </AccordionItemPanel>
            </AccordionItem>

            
        </Accordion>


  
  {/*<div className="compo13_dropdown">
    <h4 className="compo13_heading">Price<img className="compo13_gt" src={require('../../assets/icons/gt.png')} /></h4>
    <div className="compo13_dropdownContent">
      <div className="compo13_sliderContainer">
        <InputRange
          maxValue={400000}
          minValue={0}
          step={100}
          formatLabel={value => `Rs.${value}`}
          value={this.state.value}
          onChange={value => this.setState({ value })}
        />
      </div>
      <div className="compo13_sliderValuesWrapper">
        <p className="compo13_sliderText">Min</p>
        <input className="compo13_sliderValues" type="text" onChange={evt => this.changeMin(evt)} value={this.state.value.min}/>
        <p className="compo13_sliderText">Max</p>
        <input className="compo13_sliderValues" type="text" onChange={evt => this.changeMax(evt)} value={this.state.value.max} />
      </div>
    </div>
    </div>*/}

</div>

  <div className="products_col products_upperRightWrapper">

    <div className="products_dropdownWrapper">
      {/*<select id="subcategoryselect" value={this.state.subcategory} onChange={val => this.handleSelect('subcategory', val)} className="form-control  form-control-md productlistfilterselect" >
                {SubCArray}
          </select>*/}


      <select id="sortselect" value={this.state.sort} onChange={val => this.handleSelect('sort', val)} className="form-control  form-control-md productlistfilterselect" >
        <option value="Price : Low to High">Price : Low to High</option>
        <option value="Price : High to Low">Price : High to Low</option>
        <option value="Top Rated">Top Rated</option>
        <option value="Availability">Availability</option>
      </select>

    </div>

    <Row className="products_cardsWrapper">
      {ProductArray}
    </Row> 
  </div>
</div>
<div className="products_lowerWrapper products_col">
  <div className="products_hrLine"></div>

  <h5 className="products_textHeading">WHEELCHAIRS</h5>
  <p className="products_text">
    The wheelchair is used as an assistive aid for mobility. It is
    primarily used by differently-abled people, people who have an
    injury, age-related issues/geriatric, or people who have difficulty
    walking due to illness. <br/><br/>
    Wheelchairs are recommended for people
    suffering from spinal cord injuries &#40;paraplegia, hemiplegia, and
    quadriplegia &#41;, lower limb amputees, cerebral palsy, brain injury,
    osteogenesis, motor neuron diseases, and many more.<br/><br/> 
    These come with
    different technology to meet the specific needs of their users. The
    technology is considered according to the user conditions,
    requirements, environment, workspace, and many more minute things
    useful in the daily routine.<br/><br/> 
    The most widely recognized forms of
    wheelchairs are motorized and manual wheelchairs. The motorized
    wheelchairs are propelled with batteries, and electric motors and
    manual wheelchairs are propelled using a propulsive force either by
    a wheelchair user or an attendant.
  </p>
  <h5 className="products_textHeading">Types of WHEELCHAIRS available at Rehamo.</h5>
  <p className="products_text">
    Rehamo offers various types of Wheelchairs suited for varied needs.
    They are: Active Wheelchairs, Standard Wheelchairs, Reclining
    Wheelchairs, Power Wheelchairs, Transit Wheelchairs and Sports
    Wheelchairs.
  </p>
  <h5 className="products_textHeading">Active Wheelchairs</h5>
  <p className="products_text">
    Active Wheelchairs are designed for the user to be more active and
    independent. Suitable for people who have good trunk stability and
    upper arm strength, enabling them to do their daily activities such
    as bathing, shifting, and driving, making them independent and move
    at ease.<br/><br/> 
    Eg, wheelchair: Active Eco, Active Ultralight, RGK and
    Quickie Wheelchairs.
  </p>
  <h5 className="products_textHeading">Standard Economy</h5>
  <p className="products_text">
    Standard Economy wheelchairs are designed to be economical yet
    durable and comfortable. These are applicable for short-term
    applications such as hospital visits, transfers, etc. These
    wheelchairs come in a wide range of add-on features based on
    people’s activities and lifestyles.<br/><br/> 
    E.g.: Steely Econo, Steely Blue
  </p>
  <h5 className="products_textHeading">Standard Premium</h5>
  <p className="products_text">
    Standard Premium wheelchairs are made up of a premium aluminum frame
    and are suitable for users who spend longer time on the wheelchairs
    (4-5hrs per day), who can propel the wheelchair for themselves, and
    are partially dependent on the attendant for mobility. <br/>Eg: Allite
    Pro, Allite Pro BF
  </p>
  <h5 className="products_textHeading">Reclining Wheelchairs</h5>
  <p className="products_text">
    Reclining wheelchairs come with adjustable backrest angle
    (reclining), elevating footrest, and headrest. These wheelchairs are
    suitable for users who have significantly less trunk stability, less
    head control, and bedridden patients allowing them to rest in a
    wheelchair and assist the attendant in transferring patients from
    one place to another.<br/><br/> 
    E.g., Steely R, Steely R Transit
  </p>
  <h5 className="products_textHeading">Transit Wheelchairs</h5>
  <p className="products_text">
    Transit wheelchairs are helpful for elderly or disabled people where
    it helps for easy access to get transferred from one place to
    another. These wheelchairs are compact and lightweight, making it
    easier to go through compact areas for attendants to shift. These
    wheelchairs are only attendant propelled wheelchairs.<br/><br/> 
    E.g.: Allite TR
  </p>
  <h5 className="products_textHeading">Power Wheelchair</h5>
  <p className="products_text">
    Power wheelchairs are electric, battery-operated wheelchairs that
    the user can propel at one's fingertips. Primary users of Power
    Wheelchairs include people with limited upper arm strength. These
    wheelchairs are designed to travel around 20-40kms in a single
    charge.<br/><br/> 
    E.g.: Electra Eco, Electra Compact, Electra RHB
  </p>
  <h5 className="products_textHeading">sports Wheelchair</h5>
  <p className="products_text">
    Sports wheelchairs are designed to improve the performance of the
    sportsperson and consider the safety of the users. These wheelchairs
    are designed according to the sports such as Badminton, Basketball,
    Shooting, Tennis, Archery, etc. Each sporting event has its unique
    set of chairs, and these wheelchairs can also be categorized based
    on the users' performance, such as Beginner, Intermediate, and
    Professional.
  </p>

  <div className="products_hrLine"></div>

  <p className="products_textfaq"><b className="products_textHeadingp">FAQ’s </b> (Frequently Asked Questions)</p>


  <div>
  <Accordion preExpanded={[0]} allowMultipleExpanded={true} className="accordIan">
    <AccordionItem>
        <AccordionItemHeading className="accordIanhead">
        <AccordionItemButton className="accordIanbtn">
        Do we offer customization of wheelchair?
            
            <i class="material-icons accordianbtnicon">expand_more</i>
            </AccordionItemButton>
        </AccordionItemHeading>
        <AccordionItemPanel className="accordIanpanel">
        <p className="productfaqdetail">
            Yes, we have a customized range of wheelchairs designed according to users' needs.<br/> To understand the user's needs and conditions, an assessment has to be conducted to prescribe the right wheelchair.
        </p>
        </AccordionItemPanel>
    </AccordionItem>

    <AccordionItem>
        <AccordionItemHeading className="accordIanhead">
        <AccordionItemButton className="accordIanbtn">
        What is the maximum travel distance of electric wheelchairs?
            
            <i class="material-icons accordianbtnicon">expand_more</i>
            </AccordionItemButton>
           
        </AccordionItemHeading>
        <AccordionItemPanel className="accordIanpanel">
        <p className="productfaqdetail">
          Electric Wheelchair has a wide range of travel range which can start
        from 15 km, and maximum can travel up to 40kms. This is dependent on
        the wheelchair models and the battery capacity of the wheelchair. 
        </p>
        </AccordionItemPanel>
    </AccordionItem>


    <AccordionItem>
        <AccordionItemHeading className="accordIanhead">
        <AccordionItemButton className="accordIanbtn">
        Do we offer warranty on wheelchairs?
            
            <i class="material-icons accordianbtnicon">expand_more</i>
            </AccordionItemButton>
           
        </AccordionItemHeading>
        <AccordionItemPanel className="accordIanpanel">
        <p className="productfaqdetail">
        Yes, we offer one year warranty on wheelchairs and a six-month warranty
        on battery for power wheelchairs.
        </p>
        </AccordionItemPanel>
    </AccordionItem>


    <AccordionItem>
        <AccordionItemHeading className="accordIanhead">
        <AccordionItemButton className="accordIanbtn">
        Do you provide wheelchair on rent?
            
            <i class="material-icons accordianbtnicon">expand_more</i>
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
            
            <i class="material-icons accordianbtnicon">expand_more</i>
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
  
 
</div>

        <Footer />
      </>
    );
  }
}

// class ProductsCard extends React.Component{
//   constructor(props){
//     super(props);
//     }

//   render(){  
//     return(
//       <>
//         <div className="productsCard_container products_col">
//           <div className="products_row productsCard_imgWrapper">
//             <img className="productsCard_img" src={this.props.image} alt="Image" style={{width: '20vw',height: '20vw'}}/>
//             {this.props.like ? <img className="productsCard_like" src={require("../assets/icons/likeSelected.png")} alt="Image" style={{position: 'relative',width: '2vw',height: '2vw',top: '0.8vw',right: '2.8vw'}}/> : <img className="productsCard_like" src={require("../assets/icons/like.png")} alt="Image"/>}
//           </div>
//           <div className="productsCard_contentContainer product_col">             
//             <p className="productsCard_type">{this.props.type}</p>
//             <p className="productsCard_name">{this.props.name}</p>
//             <div className="products_row">
//               <p className="productsCard_oldPrice">{this.props.oldPrice}</p>
//               <p className="productsCard_price">{this.props.price}</p>
//             </div>
//             <div className="products_row">
//               <Rating size={20} />
//               <div className="productsCard_btn">Add To Cart</div>
//             </div>
//           </div>
//         </div>
//       </>
//     );
//   }
// }

class ProductCard extends React.Component{
  constructor(props){
    super(props);
    }

  render(){
    let likeIcon;
    if(this.props.like)   
    likeIcon=<img className="productViewCard_like" src={require("../assets/img/compo12/likeSelected.png")} alt="Image"/>
   else
   likeIcon=<img className="productViewCard_like" src={require("../assets/img/products/like.png")} alt="Image"/>
  let star=this.props.stars;
    return(
      <>
        <div className="productCard_wrapper">
        {/* <FontAwesomeIcon icon="fa fa-heart" /> */}
        {/* <FavoriteIcon/>
        <i class="fa fa-heart" aria-hidden="true"></i> */}
        <div className="productView_imageContainer">
        <img className="productViewCard_img" src={this.props.image} alt="Image"/>
        {likeIcon}
        </div>
            <div className="productView_contentContainer">             
              <p className="productCard_text">{this.props.name}</p>
              <p className="productCard_description">{this.props.description}</p>
              <div className="productCard_rowSpace">
              <ReactStars
    count={5}
    size={24}
    isHalf={true}
   activeColor="#FFC656"
    value={star}
    edit={false}
    classNames="productView_ratingStar"
  />
                <div className="productsCard_Cartbtn">Add To Cart</div>
                </div>
              <div className="productView_row">
                <p className="productCard_oldPrice">{this.props.oldPrice}</p>&nbsp;&nbsp;&nbsp;&nbsp;
                <p className="productCard_price">{this.props.price}</p>
              </div>       
            </div>
        </div>
      </>
    );
  }
}


export default Rental;
