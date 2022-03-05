import React from "react";

import Navbar from "../components/Navbars/Navbar";

import Footer from "../components/Footer/Footer";
import ReactStars from "react-rating-stars-component";

import $ from 'jquery'
import "../assets/css/enquiry.css";

import { Progress,Modal } from "reactstrap";

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import {DataContext} from '../components/Context'

import {
  Magnifier,
  GlassMagnifier,
  SideBySideMagnifier,
  MagnifierContainer,
  MagnifierPreview,
  MagnifierZoom,
  PictureInPictureMagnifier,
  MOUSE_ACTIVATION,
  TOUCH_ACTIVATION
} from "react-image-magnifiers";

import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from 'react-accessible-accordion';

import 'react-accessible-accordion/dist/fancy-example.css';

import "../assets/css/productView.css";

const axios = require('axios').default

var ratingsVar=[{'star' : 5, 'count' : 495},
{'star' : 4, 'count' : 60},
{'star' : 3, 'count' : 10},
{'star' : 2, 'count' : 2},
{'star' : 1, 'count' : 0}];

var customerPic1=[require('../assets/img/products/customerPic1.png'),
require('../assets/img/products/customerPic2.png'),
require('../assets/img/products/customerPic3.png'),
require('../assets/img/products/customerPic4.png')]

var customerPic2=[require('../assets/img/products/customerPic1.png'),
require('../assets/img/products/customerPic22.png')]

var numrows=6;
var products=[
  {name:"Electric wheelchair",image:require('../assets/img/products/img1a.png'),description:"active eco | light weight aluminum wheelchair",stars:0,oldPrice:"₹19000",price:"₹15000",like:false},
  {name:"Electric wheelchair",image:require('../assets/img/products/img1b.png'),description:"active eco | light weight aluminum wheelchair",stars:5,oldPrice:"₹19000",price:"₹18000",like:false},
  {name:"Electric wheelchair",image:require('../assets/img/products/img1c.png'),description:"active eco | light weight aluminum wheelchair",stars:4,oldPrice:"₹29000",price:"₹25000",like:false},
  {name:"Electric wheelchair",image:require('../assets/img/products/img1d.png'),description:"active eco | light weight aluminum wheelchair",stars:3,oldPrice:"₹19000",price:"₹14000",like:false},
  {name:"Electric wheelchair",image:require('../assets/img/products/img1e.png'),description:"active eco | light weight aluminum wheelchair",stars:4.5,oldPrice:"₹30000",price:"₹27000",like:false},
  {name:"Electric wheelchair",image:require('../assets/img/products/img1e.png'),description:"active eco | light weight aluminum wheelchair",stars:4.5,oldPrice:"30000",price:"₹27000",like:false},
];
// let productsList=
// for (var i = 0; i < products.length; i++) {
//   <ProductCard 
//        image={products[i].image}           
//        name={products[i].name}
//        oldPrice={products[i].oldPrice}
//        description={products[i].description}
//        price={products[i].price}
//        like={products[i].like} 
//        rating={products[i].rating}
//   />
// };

const CustomDot = ({ onMove, index, onClick, active }) => {
  // onMove means if dragging or swiping in progress.
  // active is provided by this lib for checking if the item is active or not.
  return (
    <li
      className={active ? "active" : "inactive"}
      onClick={() => onClick()}
    >
      <div className="productrowdot"></div>
    </li>
  );
};

const ButtonGroup = ({ next, previous, goToSlide, ...rest }) => {
  const { carouselState: { currentSlide } } = rest;
  return (
    <div className="productrow-button-group">
      <button className={currentSlide === 0 ? 'disable' : 'productrowright'} onClick={() => next()}>
        <i className="material-icons productrowrightarrow">chevron_right</i>
      </button>
      <button className="productrowleft" onClick={() => previous()}>
        <i className="material-icons productrowleftarrow">chevron_left</i>
      </button>
    </div>
  );
};

const CustomRight = ({ onClick }) => (
  <button className="productrowright" onClick={onClick}>
    <i className="material-icons productrowrightarrow">chevron_right</i>
  </button>
);
const CustomLeft = ({ onClick }) => (
  <button className="productrowleft" onClick={onClick}>
    <i className="material-icons productrowleftarrow">chevron_left</i>
  </button>
);

const responsive3 = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 5
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 2
  }
};


class CustomiseView extends React.Component {

  static contextType = DataContext;

  constructor(props) {
    super(props);

    this.state = {
      productname:'',
      productid:'',
      qtyproductprice:'',
      defaultproductprice:'',
      discountproductprice:'',
      productcat:'',
      productsubcat:'',
      productmaterial:'',
      productlegs:'',
      producthighlights:'',
      productspecs:[],
      productagegroup:'',
      productfeatures:'',
      productspeclist:[],
      productfaq:[],
      productdesc:'',
      mainimage:'1_Image',
      productsPage:true,
      qty:1,
      products:[],
      colors:[],
      sizes:[],
      size:'Medium',
      color:'#000',
      rentaldeposit:'',
      rentalgst:'',
      rentalprice:'',
      enquirymodal:true,
      stocktext:'In Stock',
      stock:false,
      colorsthere:true,
      sizesthere:true,
      faqsthere:true,
      specsthere:true,
      APlus:false,
      VideoThere:false,
      producturlshow:false,

      ratingstars:0,
      ratingname:'',
      ratingemail:'',
      ratingmessage:'',
      ratingerror:'',
      ratings:[],
      totalrate:0,
      ratinglength:0,
      ratingfetched:false,
    };
  }

  handleQty = (name,value) => {
    console.log(name,value)
    this.setState({ [name]: value.target.value });
    this.setState ({ qtyproductprice: this.state.defaultproductprice*value.target.value});
  }


  handleInput = (name, event) => {
    this.setState({ [name]: event.target.value });
  };

  componentDidUpdate(){
    $('html,body').animate({
      scrollTop: $("#pv-first-section").offset().top - 500
    }, 10);
  }
  

  componentDidMount(){

    var modal = document.querySelectorAll('.modal')

    const {products,addCart,addCartQty} = this.context;

    var RateIMG1,RateIMG2,RateIMG3 = false

    var paramsID = this.props.match.params.productId

    var id = paramsID

    var globalthis = this;
    globalthis.setState ({ productid: id });

    
    $('html,body').animate({
      scrollTop: $("#pv-first-section").offset().top - 500
    }, 10);

    this.initialfetch = async () => {
    
      //modal[0].style.display = 'block'
      axios
        .post('https://admin.rehamo.com/api/getcustomiseproductdata', {
          ProductID: id,
        })
        .then(function (response) {
          console.log(response)
          if (response.data.Status === 'product found') {
            //modal[0].style.display = 'none'

            var Product = response.data.Product

            globalthis.setState ({ productname: Product.ProductName });
            globalthis.setState ({ productid: Product.ProductID });
            globalthis.setState ({ productcat: Product.ProductCategory});
            globalthis.setState ({ productdesc: Product.ProductDesc});
            globalthis.setState ({ productsubcat: Product.SubCategory});
            globalthis.setState ({ productmaterial: Product.Material});
            globalthis.setState ({ productlegs: Product.Legs});
            globalthis.setState ({ producthighlights: Product.ProductHighlights});
            globalthis.setState ({ productagegroup: Product.AgeGroup});
            globalthis.setState ({ productfeatures: Product.ProductFeatures});
            globalthis.setState ({ productspeclist: Product.SpecList});

            globalthis.setState ({ VideoThere: Product.VideoThere});
            globalthis.setState ({ APlus: Product.APlus});

            if(Product.ProductSpecs){
              globalthis.setState({productspecs: Product.ProductSpecs})
              if(Product.ProductSpecs.length === 0){
                globalthis.setState({specsthere: false})
              }
            }else{
              globalthis.setState({specsthere: false})
            }

           

            if(Product.FAQs){
              globalthis.setState ({ productfaq: Product.FAQs});
              if(Product.FAQs.length === 0){
                globalthis.setState({faqsthere: false})
              }
            }else{
              globalthis.setState({faqsthere: false})
            }

            

            if(Product.ProductStock!==0){
              globalthis.setState({stock: true})
              globalthis.setState({stocktext: 'In Stock'})
            }else{
              globalthis.setState({stock: false})
              globalthis.setState({stocktext: 'Out of Stock'})

            }
            

            


          }
        })
        .catch(function (error) {
          //console.log(error)
        })

      };

      this.initialfetch()


      var globalthis = this
    //modal[0].style.display = 'block'
    //$('#loading-circle').show();

    axios
    .post('https://admin.rehamo.com/api/getcustomiseproductlist', {
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

      axios
        .post('https://admin.rehamo.com/api/getratinglist', {
          ProductID: id,
        })
        .then(function (response) {
          console.log(response)
          
          globalthis.setState({ ratings: response.data });

          var Ratings = response.data

          var rc5 = 0
          var rc4 = 0
          var rc3 = 0
          var rc2 = 0
          var rc1 = 0
          var rc0 = 0

          var length = Ratings.length
          globalthis.setState({ ratinglength: length});
          var total = 0
          var count = 0
          Ratings.forEach((data,index) => {
            count = count + 1
            var rating = parseInt(data.Rating) 
            total = total + parseInt(data.Rating) 

            if(rating === 5){
              rc5 = rc5 + 1
            }else if(rating === 4){
              rc4 = rc4 + 1
            }else if(rating === 3){
              rc3 = rc3 + 1
            }else if(rating === 2){
              rc2 = rc2 + 1
            }else if(rating === 1){
              rc1 = rc1 + 1
            }else if(rating === 0){
              rc0 = rc0 + 1
            }

            if(count === length){
              var trating = total/length
              globalthis.setState({ totalrate: parseFloat(trating).toFixed(1)});
              globalthis.setState({ ratinglength: length});
              globalthis.setState({ ratingfetched: true});
            }

          });

          ratingsVar=[{'star' : 5, 'count' : rc5},
                      {'star' : 4, 'count' : rc4},
                      {'star' : 3, 'count' : rc3},
                      {'star' : 2, 'count' : rc2},
                      {'star' : 1, 'count' : rc1}];

          var color5 = rc5/length * 100
          var color4 = rc4/length * 100
          var color3 = rc3/length * 100
          var color2 = rc2/length * 100
          var color1 = rc1/length * 100

          $('#color5').css('width', color5 + '%');
          $('#color4').css('width', color4 + '%');
          $('#color3').css('width', color3 + '%');
          $('#color2').css('width', color2 + '%');
          $('#color1').css('width', color1 + '%');


          
          })
          .catch(function (error) {
            //console.log(error)
            //modal[0].style.display = 'none'
            //$('#loading-circle').hide();
          })
  
  

      this.gotocustomiseview = async (item) => {
        console.log(item)
        let catresult = item.ProductCategory.replace(" ", "-");
        let subresult = item.SubCategory.replace(" ", "-");
        window.location.href = '/customised/'+catresult+'/'+subresult+'/'+item.ProductNameURL+'/'+item.ProductID+''  
            
      };

      this.gotocustomiseview2 = async (item) => {
        console.log(item)
        let catresult = item.ProductCategory.replace(" ", "-");
        let subresult = item.SubCategory.replace(" ", "-");
        window.location.href = '/customised/'+catresult+'/'+subresult+'/'+item.ProductNameURL+'/'+item.ProductID+''  
            
      };

      this.addtocart = async () => {
        //console.log()
        //globalthis.props.history.push('/shopnow/'+item.ProductName+'/'+item.ProductID+'')
        addCartQty(this.state.productid,this.state.qty,this.state.size,this.state.color)
      };
  
      this.gotobuynow = async () => {
        addCart(this.state.productid)
      globalthis.props.history.push('/checkout')
      };

      this.mailnow = async () => {
        modal[2].style.display = 'block'
      };

      this.callnow = async () => {
        window.open('tel:+919742702222');
      };

      this.whatsappnow = async () => {
        window.open('https://web.whatsapp.com/send?phone=+919108740202&amp;text=Hello', "_blank");
      };

      this.closemodal2 = async () => {
        modal[2].style.display = 'none'
      };


      this.ratenow = async () => {
        modal[3].style.display = 'block'
      };


      this.closemodal3 = async () => {
        modal[3].style.display = 'none'
      };




      $("#rateimg1").click(function(){
        document.getElementById('rateimginput1').click()
      })


    document
      .getElementById('rateimginput1')
      .addEventListener('input', function (input) {
        try {
          //console.log(input.target.value);
          //console.log(input.srcElement.files[0].name);

          var file = input.srcElement.files[0]
          //console.log(input.srcElement.files[0].name);

          var reader = new FileReader()
          reader.readAsDataURL(file)

          reader.onload = function () {
            //URI = reader.result
            RateIMG1 = true
            document.getElementById('rateimg1').src = reader.result
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


      $("#rateimg2").click(function(){
        document.getElementById('rateimginput2').click()
      })


    document
      .getElementById('rateimginput2')
      .addEventListener('input', function (input) {
        try {
          //console.log(input.target.value);
          //console.log(input.srcElement.files[0].name);

          var file = input.srcElement.files[0]
          //console.log(input.srcElement.files[0].name);

          var reader = new FileReader()
          reader.readAsDataURL(file)

          reader.onload = function () {
            //URI = reader.result
            RateIMG2 = true
            document.getElementById('rateimg2').src = reader.result
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



      $("#rateimg3").click(function(){
        document.getElementById('rateimginput3').click()
      })


    document
      .getElementById('rateimginput3')
      .addEventListener('input', function (input) {
        try {
          //console.log(input.target.value);
          //console.log(input.srcElement.files[0].name);

          var file = input.srcElement.files[0]
          //console.log(input.srcElement.files[0].name);

          var reader = new FileReader()
          reader.readAsDataURL(file)

          reader.onload = function () {
            //URI = reader.result
            RateIMG3 = true
            document.getElementById('rateimg3').src = reader.result
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

      $("#ratingsubmitbtn").on('click', function () {
        var rating = globalthis.state.ratingstars
        var message = globalthis.state.ratingmessage
        var username = globalthis.state.ratingname
        var useremail = globalthis.state.ratingemail
        var productp = globalthis.state.defaultproductprice
        var productid = globalthis.state.productid
        var productname = globalthis.state.productname

        var ratingid = randomString(20)
  
        var today = new Date().toLocaleDateString('en-GB');
  
        if(message === ''){
          alert("Error, Please add a description to continue");
        }else{
          globalthis.setState({ ratingerror: 'Please wait' });
          axios
          .post('https://admin.rehamo.com/api/addproductrating', {
            ProductID: productid,
            RatingID: ratingid,
            ProductName: productname,
            ProductPrice: productp,
            UserEmail: useremail,
            UserName: username,
            Rating: rating,
            RateIMG1:RateIMG1,
            RateIMG2:RateIMG2,
            RateIMG3:RateIMG3,
            RatingDesc: message,
            RatingDate: today,
          })
          .then(function (response) {
            //console.log(response)
            if (response.data === 'done') {
              //alert("Error, Please add a description to continue");

              if(RateIMG1){
                var rateimg1 = document.getElementById('rateimg1').src
                axios
                  .post('https://admin.rehamo.com/api/uploadrateimage', {
                    ProductID: productid,
                    ProductImageIndex:'1',
                    ProductImageBody: rateimg1
                  })
                  .then( function (response) {
                    if (response.data === 'done') {
                      // //console.log('Session Added !')
                      //console.log(listItems.length)
                    }
                  })
                  .catch(function (error) {
                    alert('Something went wrong')
                    console.log(error)
                  })
              }

              if(RateIMG2){
                var rateimg2 = document.getElementById('rateimg2').src
                axios
                  .post('https://admin.rehamo.com/api/uploadrateimage', {
                    ProductID: productid,
                    ProductImageIndex:'2',
                    ProductImageBody: rateimg2
                  })
                  .then( function (response) {
                    if (response.data === 'done') {
                      // //console.log('Session Added !')
                      //console.log(listItems.length)
                    }
                  })
                  .catch(function (error) {
                    alert('Something went wrong')
                    console.log(error)
                  })
              }

              if(RateIMG3){
                var rateimg3 = document.getElementById('rateimg3').src
                axios
                  .post('https://admin.rehamo.com/api/uploadrateimage', {
                    ProductID: productid,
                    ProductImageIndex:'3',
                    ProductImageBody: rateimg3
                  })
                  .then( function (response) {
                    if (response.data === 'done') {
                      // //console.log('Session Added !')
                      //console.log(listItems.length)
                    }
                  })
                  .catch(function (error) {
                    alert('Something went wrong')
                    console.log(error)
                  })
              }
  
              setTimeout(() => {
                globalthis.setState({ ratingstars: 0 });
              globalthis.setState({ ratingmessage: '' });
              globalthis.setState({ ratingerror: 'Review Submitted, this will close automatically' });
              setTimeout(() => {
                globalthis.setState({ ratingerror: '' });
                window.location.reload(false)
              }, 2000);
              }, 3000);
              
            }
            })
            .catch(function (error) {
              //console.log(error)
              //modal[0].style.display = 'none'
              //$('#loading-circle').hide();
            })
        }
      });


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

    const ratingChanged = (newRating) => {
      this.setState({ ratingstars: newRating });
    };

    let count = 0

    let productid = this.state.productid

    let FAQArray = this.state.productfaq.map((item, i) => {
      
        count += 1;
          return (
            <>
            <AccordionItem key={i}>
                <AccordionItemHeading className="accordIanhead">
                <AccordionItemButton className="accordIanbtn">
                {item.question}
                    <i class="material-icons accordianbtnicon">keyboard_arrow_right</i>
                    </AccordionItemButton>
                   
                </AccordionItemHeading>
                <AccordionItemPanel className="accordIanpanel">
                <p className="productfaqdetail">
                {item.answer}
                </p>
                </AccordionItemPanel>
            </AccordionItem>
              </>
          );

      
      
      });

      let count2 = 0

    let ColorArray = this.state.colors.map((item, i) => {
      
        count2 += 1;
          return (
            <div key={i} className="productcolor" onClick={() => this.handleQty('color', item.color)} style={{backgroundColor:item.color}}>
            </div>
          );

      });


      let countsp = 0

    let SpecsArray = this.state.productspecs.map((item, i) => {
        
        countsp += 1;
          return (
            <p  key={i} className="productspec"><span className="productspectitle">{item.title}:</span> {item.desc}</p>
          );

      });
    

      let count3 = 0

    let SizeArray = this.state.sizes.map((item, i) => {
        
        count3 += 1;
          return (
            <option key={i} value="small" onChange={val => this.handleQty('size', val)} className="sizeSelectBoxValue">{item.size}</option>
          );

      });
    

      let countp = 0;

    let ProductArray = this.state.products.map((item, i) => {
      
      if (item.ProductStatus =="Active") {
        if(item.ProductID !== productid){

        
            let Image_Http_URL = `https://rehamobucket.s3.ap-south-1.amazonaws.com/RehamoProducts/`+item.ProductID+`/Images/1_Image.jpg`
            countp += 1;
            
            var discount = '10%';
            var oldPrice = parseInt(item.ProductPrice)/10;
            var oldPrice = parseInt(item.ProductPrice) - oldPrice;
              return (
                <>
            <div key={i} className="productView_wrapper">
              {/* <FontAwesomeIcon icon="fa fa-heart" /> */}
              {/* <FavoriteIcon/>
              <i class="fa fa-heart" aria-hidden="true"></i> */}
              <div className="productView_imageContainer">
              <img className="productView_img" onClick={() => this.gotocustomiseview(item)} src={Image_Http_URL} alt="Image"/>
              <img className="compo12card_like" src={require("../assets/img/compo12/like.png")} alt="Image"/>
              </div>
                  <div className="productView_contentContainer">             
                    <p className="productView_text" onClick={()=>this.gotocustomiseview2(item)}>{item.ProductName}</p>
                    {/*<ReactStars
                        count={5}
                        size={20}
                        isHalf={true}
                      activeColor="#FFC656"
                        value={4}
                        edit={false}
                        classNames="productView_ratingStar"
                    />*/}
                            <div className="productView_row">
                      <button className="pvshopnowbtn2" onClick={()=>this.gotocustomiseview2(item)}>Enquire Now</button>
                    </div>       
                  </div>
              </div>
    
                  </>
              );
      }
    }
    });

    let likeIcon;
    if(this.props.like)   
    likeIcon=<img className="productView_like" src={require("../assets/img/compo12/likeSelected.png")} alt="Image"/>
   else
   likeIcon=<img className="productView_like" src={require("../assets/img/products/like.png")} alt="Image"/>
  // console.log(products);

  var countr = 0

  let RatingArray = this.state.ratings.map((item, i) => {
      
          let Image_Http_URL1 = `https://rehamobucket.s3.ap-south-1.amazonaws.com/RehamoProducts/`+item.ProductID+`/Rating/1_Image.jpg`
          let Image_Http_URL2 = `https://rehamobucket.s3.ap-south-1.amazonaws.com/RehamoProducts/`+item.ProductID+`/Rating/2_Image.jpg`
          let Image_Http_URL3 = `https://rehamobucket.s3.ap-south-1.amazonaws.com/RehamoProducts/`+item.ProductID+`/Rating/3_Image.jpg`

          countr += 1;

          var customerPic=[Image_Http_URL1]
          
            return (
              <>

    <div className="productReview">
      <div className="productReview_rowCenter">
        <div className="ratesRow_review productReview_ratingContainer">
          <p className="productReview_starCount">{item.Rating}</p>
          <img src={require("../assets/img/products/star.png")} className="starImage" />
        </div>
      </div>
      <p className="productReview_description">{item.RatingDesc}</p>
      <div className="ratesRow_review"> 
          {item.RateIMG1?(
            <img src={Image_Http_URL1} className="productReview_customerPic" />  
          ):(<></>)}

          {item.RateIMG2?(
            <img src={Image_Http_URL2} className="productReview_customerPic" />  
          ):(<></>)}

          {item.RateIMG3?(
            <img src={Image_Http_URL3} className="productReview_customerPic" />  
          ):(<></>)}
          
      </div>
    
      <p className="productReviewBy">{item.UserName} | {item.RatingDate}</p>
      </div>
      
                </>
            );
  });

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

          <div className="modal">

        <div className="enquirerentalmodal" id="enquirerentalmodal">
          <button id="modal-close-btn" onClick={()=>this.closemodal3()}  className="modal-close-btn"  >
          <i className="material-icons modalclose">close</i>
          </button>

          <div className="enquiry_wrapper">
          <h4 className="enquiry_heading1">Rate this product</h4>
          <div className="ratenowflex">
          <img className="ratenowimg" src={'https://rehamobucket.s3.ap-south-1.amazonaws.com/RehamoProducts/'+this.state.productid+'/Images/1_Image.jpg'}></img>
          <div>
          <h4 className="enquiry_heading3">Product: {this.state.productname}</h4>
          <h4 className="enquiry_heading4">price: {this.state.defaultproductprice}</h4>
          </div>
          </div>
          <div className="ratenowflex">
          <img className="ratenowaddimg" id="rateimg1" src={require('../assets/img/addrateimg2.png')}></img>
          <img className="ratenowaddimg" id="rateimg2" src={require('../assets/img/addrateimg2.png')}></img>
          <img className="ratenowaddimg" id="rateimg3" src={require('../assets/img/addrateimg2.png')}></img>

          <input id="rateimginput1" className="imageinput" type="file" accept="image/*"/> 
          <input id="rateimginput2" className="imageinput" type="file" accept="image/*"/> 
          <input id="rateimginput3" className="imageinput" type="file" accept="image/*"/> 
          </div>
          <div className="enquiry_formWrapper">
          <ReactStars
                count={5}
                value={this.state.ratingstars}
                onChange={ratingChanged}
                size={24}
                isHalf={true}
                className="ratingstarsmain"
                emptyIcon={<i className="far fa-star"></i>}
                halfIcon={<i className="fa fa-star-half-alt"></i>}
                fullIcon={<i className="fa fa-star"></i>}
                activeColor="#F2994A"
              />
            <p className="enquiry_label" id="enquiry_labelname">Name</p>
            <input type="text" className="enqyiry_input" name="name"  value={this.state.ratingname} onChange={val => this.handleInput('ratingname', val)}/>
            <p className="enquiry_label">Email</p>
            <input type="text" className="enqyiry_input" name="email"  value={this.state.ratingemail} onChange={val => this.handleInput('ratingemail', val)}/>
            <p className="enquiry_label">Message</p>
            <textarea name="message" rows="10" cols="50" className="enqyiry_input" value={this.state.ratingmessage} onChange={val => this.handleInput('ratingmessage', val)}>
            </textarea>

            <h6 className="ratingerrorspan">{this.state.ratingerror}</h6>

            <button className="enquiry_button" id="ratingsubmitbtn">Submit</button>
          </div>

        </div>

          </div>
          </div>


        <div className="productContainer" id="pv-first-section">

        

        <div className="productImageList">
          <img onClick={()=>{this.setState({mainimage:'1_Image'}); this.setState({producturlshow:false})}} src={'https://rehamobucket.s3.ap-south-1.amazonaws.com/RehamoProducts/'+this.state.productid+'/Images/1_Image.jpg'} className="imageList" />
          {this.state.VideoThere?(
          <img onClick={()=>{this.setState({mainimage:'Thumb_Image'}); this.setState({producturlshow:true})}} src={'https://rehamobucket.s3.ap-south-1.amazonaws.com/RehamoProducts/'+this.state.productid+'/Images/Thumb_Image.jpg'} className="imageList" />
          ):(<></>)}
          <img onClick={()=>{this.setState({mainimage:'2_Image'}); this.setState({producturlshow:false})}} src={'https://rehamobucket.s3.ap-south-1.amazonaws.com/RehamoProducts/'+this.state.productid+'/Images/2_Image.jpg'} className="imageList" />
          <img onClick={()=>{this.setState({mainimage:'3_Image'}); this.setState({producturlshow:false})}} src={'https://rehamobucket.s3.ap-south-1.amazonaws.com/RehamoProducts/'+this.state.productid+'/Images/3_Image.jpg'} className="imageList" />
          <img onClick={()=>{this.setState({mainimage:'4_Image'}); this.setState({producturlshow:false})}} src={'https://rehamobucket.s3.ap-south-1.amazonaws.com/RehamoProducts/'+this.state.productid+'/Images/4_Image.jpg'} className="imageList" />
          <img onClick={()=>{this.setState({mainimage:'5_Image'}); this.setState({producturlshow:false})}} src={'https://rehamobucket.s3.ap-south-1.amazonaws.com/RehamoProducts/'+this.state.productid+'/Images/5_Image.jpg'} className="imageList" />
          <img onClick={()=>{this.setState({mainimage:'6_Image'}); this.setState({producturlshow:false})}} src={'https://rehamobucket.s3.ap-south-1.amazonaws.com/RehamoProducts/'+this.state.productid+'/Images/6_Image.jpg'} className="imageList" />
          </div>
            <div className="productImgContainer">        
            <SideBySideMagnifier
                  fillAvailableSpace={true}
                  alwaysInPlace={true}
                  magnifierSize='0.1%'
                  magnifierBorderSize='2'
                  className="mainproductImage" 
                  imageSrc={'https://rehamobucket.s3.ap-south-1.amazonaws.com/RehamoProducts/'+this.state.productid+'/Images/'+this.state.mainimage+'.jpg'}
                  imageAlt="Example"
                  largeImageSrc={'https://rehamobucket.s3.ap-south-1.amazonaws.com/RehamoProducts/'+this.state.productid+'/Images/'+this.state.mainimage+'.jpg'} // Optional
                />      
              {/*{likeIcon}*/}
              
            </div>
            
            <div className="productscrollcontainer">
            <div className="productDetailsContainer">
              <h3 className="productName">{this.state.productname}</h3>
<div className="productsnextRow">
{this.state.ratingfetched?(
            <>
            <ReactStars
                count={5}
                // onChange={ratingChanged}
                size={26}
                isHalf={true}
                // borderColor="red"
              activeColor="#FFC656"
                // emptyIcon={<EmptyStar/>}
                // filledIcon={<FilledStar/>}
                value={this.state.totalrate}
                edit={false}
                classNames="productView_ratingStar"
              />
              <p className="ratingCount">{this.state.ratinglength} <span className="reviewsmall">Reviews</span></p>
            </>
            
          ):(<></>)}
  </div>


<br/>
  <div className="products_hrLine"></div>
<h3 className="productsSubHeading">Highlights</h3>
<p className="products_texthl" dangerouslySetInnerHTML={{ __html: this.state.producthighlights }}></p>
            </div>
       
            {/*<div className="buyOptionContainer">
            <h3 className="productRate">₹ {this.state.qtyproductprice}</h3>
            <p className="inclusive_text">FREE delivery</p>
            <p className="product_greyText">In stock</p>
            <div className="productReview_rowqty">
              <p className="product_text">Quantity:</p>
  <select id="qty" name="qty" onChange={val => this.handleQty('qty', val)} className="qtySelectBox qtySelectBoxValue">
    <option value="1" className="qtySelectBoxValue">1</option>
    <option value="2" className="qtySelectBoxValue">2</option>
    <option value="3" className="qtySelectBoxValue">3</option>
    <option value="4" className="qtySelectBoxValue">4</option>
    <option value="5" className="qtySelectBoxValue">5</option>
  </select>

            </div>
            <div className="product_cartButton" onClick={()=>this.addtocart()}>
              <h3 className="product_blackText">ADD TO CART</h3>
            </div>
            <div className="product_buyButton">
              <h3 className="product_blackText">BUY NOW</h3>
            </div>
  </div>*/}

            <div className="buyOptionContainer">
            
            <div className="product_buyButton" onClick={()=>this.callnow()}>
              <h3 className="product_blackText2"><img className="enquireimgbtn" src={require('../assets/img/callimg.png')}></img> Call</h3>
            </div>
            <div className="product_buyButton" onClick={()=>this.mailnow()}>
              <h3 className="product_blackText2"><img className="enquireimgbtn" src={require('../assets/img/emailimg.png')}></img>Enquiry</h3>
            </div>
            <div className="product_buyButton" onClick={()=>this.whatsappnow()}>
              <h3 className="product_blackText2"><img className="enquireimgbtn" src={require('../assets/img/whatsappimg.png')}></img>Whatsapp</h3>
            </div>
            </div>
            
            </div>
        </div>
        <div className="product_mainContainer">
        </div>        
        <div className="productView_upperWrapper">
        {this.state.APlus?(
           <>
           <div className="products_hrLine"></div>
            <h5 className="products_textHeading">More Details</h5>
           <div className="productView_bannerWrapper">
        
            <img src={'https://rehamobucket.s3.ap-south-1.amazonaws.com/RehamoProducts/'+this.state.productid+'/DescImages1_Desc.jpg'} className="productsBanner" />
            <img src={'https://rehamobucket.s3.ap-south-1.amazonaws.com/RehamoProducts/'+this.state.productid+'/DescImages2_Desc.jpg'} className="productsBanner" />
            <img src={'https://rehamobucket.s3.ap-south-1.amazonaws.com/RehamoProducts/'+this.state.productid+'/DescImages3_Desc.jpg'} className="productsBanner" />
            <img src={'https://rehamobucket.s3.ap-south-1.amazonaws.com/RehamoProducts/'+this.state.productid+'/DescImages4_Desc.jpg'} className="productsBanner" />       
            </div>
            
            </>
                    
            ):(<></>)}
            {/* <div className="products_cardsWrapper">
              <ProductsCard
                image = {require('../assets/img/wheelChair.png')}
                like = {true}
                name = {'alpha'}
                oldPrice={'op'}
                discount={'discount'}
                price={'price'}
              />
            </div>  */}
        </div>
        <div className="products_lowerWrapper products_col">
          <div className="products_hrLine"></div>

          <h5 className="products_textHeading">Description</h5>
          <p className="products_text" dangerouslySetInnerHTML={{ __html: this.state.productdesc }}></p>
<div className="products_hrLine"></div>

        <h5 className="products_textHeading">Features</h5>
          <p className="products_text" dangerouslySetInnerHTML={{ __html: this.state.productfeatures }}></p>
          <div className="products_hrLine"></div>
          {this.state.specsthere?(<>
          <h5 className="products_textHeading">Specifications</h5>
          <div className="specsrow">
              {SpecsArray}
          </div>
          </>):(<></>)}
          <div className="products_hrLine"></div>          
          <h5 className="products_textHeading">Similar products</h5>
          <div className="productsRowcontain">
          <Carousel
              swipeable={true}
              draggable={true}
              responsive={responsive3}
              infinite={true}
              autoPlay={true}
              autoPlaySpeed={3000}
              keyBoardControl={true}
              transitionDuration={1000}
              arrows={false}
              renderButtonGroupOutside={true}
              customButtonGroup={<ButtonGroup />}
              renderButtonGroupOutside={true}
              customLeftArrow={<CustomLeft/>}
              customRightArrow={<CustomRight/>}
              className="productsRow"
              showDots={false}
              deviceType={this.props.deviceType}
              dotListClass="custom-dot-list-style"
              itemClass="productsRowitem"
              >
          {/* for (var i = 0; i < products.length; i++) { */}
          {ProductArray}
  </Carousel>
  </div>
  <br/>
  {this.state.faqsthere?(<>
            <div className="products_hrLine"></div>
              <p className="products_textfaq"><b className="products_textHeading2">FAQ’s </b> (Frequently Asked Questions)</p>

            <div>
              <Accordion preExpanded={[0]} allowMultipleExpanded={true} className="accordIan">
                {FAQArray}

            </Accordion>

          
              </div>

          </>):(<></>)}
          
          <br/>
          <div className="products_hrLine"></div>
          <div className="reviewsection">
          <h5 className="products_textHeading">Ratings & Reviews</h5>
<div className="productViewReview_row1">
<div className="productReview_Col">
          <div className="productViewReview_row1 productReview_ratingContainer2">
          <p className="productReview_starNumber">{this.state.totalrate}</p>
          <img src={require("../assets/img/products/starBlack.png")} className="productReview_starImage" />
        </div>
        <p className="productReview_greyText">{this.state.ratinglength} ratings</p>
</div>



<div className="productReview_Col2">
<div className="productReview_rowrevi">
            <h3 className="productReview_singleStarNumber">{ratingsVar[0].star}</h3>
            <img src={require("../assets/img/products/starBlack.png")} className="starImage" />&nbsp;&nbsp;
            <div className="w3-border">
              <div className="w3-green" id="color5"></div>
            </div>&nbsp;&nbsp;
            <h3 className="product_greyText"><b>{ratingsVar[0].count}</b></h3>
    </div>
    <div className="productReview_rowrevi">
            <h3 className="productReview_singleStarNumber">{ratingsVar[1].star}</h3>
            <img src={require("../assets/img/products/starBlack.png")} className="starImage" />&nbsp;&nbsp;
            <div className="w3-border">
              <div className="w3-green" id="color4"></div>
            </div>&nbsp;&nbsp;
            <h3 className="product_greyText"><b>{ratingsVar[1].count}</b></h3>
    </div>
    <div className="productReview_rowrevi">
            <h3 className="productReview_singleStarNumber">{ratingsVar[2].star}</h3>
            <img src={require("../assets/img/products/starBlack.png")} className="starImage" />&nbsp;&nbsp;
            <div className="w3-border">
              <div className="w3-orange" id="color3"></div>
            </div>&nbsp;&nbsp;
            <h3 className="product_greyText"><b>{ratingsVar[2].count}</b></h3>
    </div>
    <div className="productReview_rowrevi">
            <h3 className="productReview_singleStarNumber">{ratingsVar[3].star}</h3>
            <img src={require("../assets/img/products/starBlack.png")} className="starImage" />&nbsp;&nbsp;
            <div className="w3-border">
              <div className="w3-orange" id="color2"></div>
            </div>&nbsp;&nbsp;
            <h3 className="product_greyText"><b>{ratingsVar[3].count}</b></h3>
    </div>
    <div className="productReview_rowrevi">
            <h3 className="productReview_singleStarNumber">{ratingsVar[4].star}</h3>
            <img src={require("../assets/img/products/starBlack.png")} className="starImage" />&nbsp;&nbsp;
            <div className="w3-border">
              <div className="w3-red" id="color1"></div>
            </div>&nbsp;&nbsp;
            <h3 className="product_greyText"><b>{ratingsVar[4].count}</b></h3>
    </div>    
          </div>
<div className="productReview_Col3">
  <div className="productReview_rateBtn">
<button className="productReview_greyTextBtn"  onClick={()=>this.ratenow()}>Rate product</button>
</div>
</div>
</div>
          {/*<div className="productReview_row1">
          <img src={require("../assets/img/products/customer1.png")} className="cutomerimageList" />
          <img src={require("../assets/img/products/customer2.png")} className="cutomerimageList" />
          <img src={require("../assets/img/products/customer3.png")} className="cutomerimageList" />
          <img src={require("../assets/img/products/customer4.png")} className="cutomerimageList" />
          <img src={require("../assets/img/products/customer5.png")} className="cutomerimageList" />
          <img src={require("../assets/img/products/customer6.png")} className="cutomerimageList" />
          <img src={require("../assets/img/products/customer7.png")} className="cutomerimageList" />
          <img src={require("../assets/img/products/customer1.png")} className="cutomerimageList" />
          </div>*/}
         <div className="productView_review">
         {this.state.ratingfetched?(
             <>
             {RatingArray}
             </>
           ):(
            <h6 className="noratingstxt">No ratings yet</h6>
            )}
           
          {/*<ProductReview 
          title={"Amazing product by Rehamo"}
          stars={5}
          description={"I’m a ex National Swimmer and a sports enthusiast. I did have a small ligament tear which did give me little trouble. Visiting Rehamo was the best decision. There was a thorough checkup by the in house physiotherapist and then they suggested me as to how I should take care. I got my knee support bands and I’m ready to Hit back again! Thank you Rehamo 🙌🏻💕"}
          customerPicArray={customerPic1}
          givenBy="chaya athri"
          time="2 months ago"
          />
           <ProductReview 
          title={"Amazing"}
          stars={5}
          description={"I checked many places for wheelchair climber on stairs but no one was ready to show demo only rehamo accepted & came from Bangalore to Chennai demo was well explained by prakash & his colleague we have started using the same and find it very useful thanks to everyone."}
          customerPicArray={customerPic2}
          givenBy="chaya athri"
          time="5 months ago"
          />
           <ProductReview 
          title={"Impressive"}
          stars={5}
          description={"Superb medical rehabilitation store with all equipment’s under one roof. First of its kind store I have seen. I am a regular customer since a decade. The staff are very cooperative, polite, soft-spoken and friendly. They advise and guide you for convincing about the product. Nice ambience & on the main road with easy access even to a differently abled person to shop his requirement. Management Keep it up!!! "}
          customerPicArray={false}
          givenBy="chaya athri"
          time="5 months ago"
          />
          <h3 className="product_greyText"><b>READ MORE</b></h3>*/}
        </div>
        {/*<div className="floatingIcon">
        <img src={require("../assets/img/products/floatingDots.png")} className="float" />
        <img src={require("../assets/img/products/floatingChat.png")} className="float" />
      </div>*/}
          </div>
          </div>
        <Footer />
      </>
    );
  }
}

class EnquiryComponent extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
      <>
       <div className="buyOptionContainer">            
            <div className="product_enquiryButton">
              <div className="productView_iconContainer">
              <img className="enquiryIcons" src={require("../assets/img/products/phone.png")} alt="Image"/>
              </div>
              <h3 className="product_enquiryText">CALL</h3>
            </div>
            <div className="product_enquiryButton">
              <div className="productView_iconContainer">
              <img className="enquiryIcons" src={require("../assets/img/products/gmail.png")} alt="Image"/>
              </div>
              <a href="enquiry" className="product_enquiryText">ENQUIRY</a>
            </div>
            <div className="product_enquiryButton">
              <div className="productView_iconContainer">
              <img className="enquiryIcons" src={require("../assets/img/products/whatsapp.png")} alt="Image"/>
              </div>
              <h3 className="product_enquiryText">WHATSAPP</h3>
            </div>
        </div>
      </>
    );
  }
}

class BuyContainer extends React.Component{
  constructor(props)
  {
    super(props);
  }
  render(){
    return(
      <>
      <div className="buyOptionContainer">
            <h3 className="productRate">₹5,999.00</h3>
            <p className="inclusive_text">FREE delivery</p>
            <p className="product_greyText">In stock</p>
            <div className="productReview_row">
              <p className="product_text">Quantity:</p>
  <select id="qty" name="qty" className="qtySelectBox qtySelectBoxValue">
    <option value="1" className="qtySelectBoxValue">1</option>
    <option value="2" className="qtySelectBoxValue">2</option>
    <option value="3" className="qtySelectBoxValue">3</option>
    <option value="4" className="qtySelectBoxValue">4</option>
  </select>

            </div>
            <div className="product_cartButton">
              <h3 className="product_blackText">ADD TO CART</h3>
            </div>
            <div className="product_buyButton">
              <h3 className="product_blackText">BUY NOW</h3>
            </div>
            </div>
      </>
    );
  }
}

class ProductViewCard extends React.Component{
  constructor(props){
    super(props);
    }

  render(){
    let likeIcon;
    if(this.props.like)   
    likeIcon=<img className="productView_like" src={require("../assets/img/compo12/likeSelected.png")} alt="Image"/>
   else
   likeIcon=<img className="productView_like" src={require("../assets/img/products/like.png")} alt="Image"/>
  let star=this.props.stars;
    return(
      <>
        <div className="productView_wrapper">
        {/* <FontAwesomeIcon icon="fa fa-heart" /> */}
        {/* <FavoriteIcon/>
        <i class="fa fa-heart" aria-hidden="true"></i> */}
        <div className="productView_imageContainer">
        <img className="productView_img" src={this.props.image} alt="Image"/>
        {likeIcon}
        </div>
            <div className="productView_contentContainer">             
              <p className="productView_text">{this.props.name}</p>
              <p className="productView_description">{this.props.description}</p>
              <ReactStars
    count={5}
    size={20}
    isHalf={true}
   activeColor="#FFC656"
    value={star}
    edit={false}
    classNames="productView_ratingStar"
  />
              <div className="productView_row">
                <p className="productView_oldPrice">{this.props.oldPrice}</p>&nbsp;&nbsp;
                <p className="productView_price">{this.props.price}</p>
                <button className="pvshopnowbtn">Shop Now</button>
              </div>       
            </div>
        </div>
      </>
    );
  }
}

class ProductReview extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
      <>
      <div className="productReview">
      <div className="productReview_rowCenter">
        <div className="ratesRow productReview_ratingContainer">
          <p className="productReview_starCount">{this.props.stars}</p>
          <img src={require("../assets/img/products/star.png")} className="starImage" />
        </div>
      <h3 className="productReview_title">{this.props.title}</h3>
      </div>
      <p className="productReview_description">{this.props.description}</p>
     {this.props.customerPicArray?
      <div className="ratesRow">
      {this.props.customerPicArray.map(pic => (  
              <img src={pic} className="productReview_customerPic" />  
        ))}  
      </div>
      : <></>
  }
      <p className="productReviewBy">{this.props.givenBy} | {this.props.time}</p>
      </div>
      </>
    );
  }
}

export default CustomiseView;
