import React from "react";

import Navbar from '../components/Navbars/Navbar'

import StarRatings from 'react-star-ratings';

import { Rating } from 'react-simple-star-rating'
import Compo2 from '../components/Component2/Component2'
import Compo3 from '../components/Component3/Component3'
import Compo4 from '../components/Component4/Component4'
import Compo5 from '../components/Component5/Component5'
import Compo6 from '../components/Component6/Component6'
import Compo7 from '../components/Component7/Component7'
import Compo8 from '../components/Component8/Component8'
import Compo9 from '../components/Component9/Component9'
import Compo10 from '../components/Component10/Component10'
import Compo11 from '../components/Component11/Component11'
import Compo12 from '../components/Component12/Component12'
import Test from '../components/Component9/test'

import Footer from '../components/Footer/Footer'

import '../assets/css/index.css'

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const axios = require('axios').default

var image1=[require('../assets/img/compo12/img1a.png'),
require('../assets/img/compo12/img1b.png'),
require('../assets/img/compo12/img1c.png'),
require('../assets/img/compo12/img1d.png')];

var image2=[require('../assets/img/compo12/img2a.png'),
require('../assets/img/compo12/img2b.png'),
require('../assets/img/compo12/img2c.png'),
require('../assets/img/compo12/img2a.png')];

var image3=[require('../assets/img/compo12/img3a.png'),
require('../assets/img/compo12/img3b.png'),
require('../assets/img/compo12/img3c.png'),
require('../assets/img/compo12/img3a.png')];

var image4=[require('../assets/img/compo12/img4a.png'),
require('../assets/img/compo12/img4b.png'),
require('../assets/img/compo12/img4c.png'),
require('../assets/img/compo12/img4a.png')];

var name1=["Stroller Pram","Baby walker","Standing Frame","Stroller Pram"];
var oldPrice1=["Rs. 4495","Rs. 4495","Rs. 4495","Rs. 4495"];
var discount1=["25% off","25% off","25% off","25% off"];
var price1=["Rs. 3369","Rs. 2369","Rs. 2143","Rs. 3369"];
var like1=[true,false,false,false];

var name2=["Wheel chair","Walking Stick","Chair Commode ","Hand Stick "];
var oldPrice2=["Rs. 24495","Rs. 4495","Rs. 4495","Rs. 4495"];
var discount2=["45% off","25% off","25% off","25% off"];
var price2=["Rs. 12369","Rs. 1369","Rs. 2369","Rs. 3369"];
var like2=[false,true,false,false];

var name3=["Foot Insoles","Wrist Pads","Knee Pads","Hand Gloves"];
var oldPrice3=["Rs. 4495","Rs. 4495","Rs. 4495","Rs. 4495"];
var discount3=["45% off","25% off","25% off","25% off"];
var price3=["Rs. 2369","Rs. 999","Rs. 1369","Rs. 3369"];
var like3=[false,true,false,false];

var name4=["Homecare Bed","Incontinence Pads","Positioners","Pressure Prevention"];
var oldPrice4=["Rs. 41495","Rs. 4495","Rs. 4495","Rs. 4495"];
var discount4=["45% off","25% off","25% off","25% off"];
var price4=["Rs. 21369","Rs. 229","Rs. 3369","Rs. 3369"];
var like4=[true,false,false,false];

const CustomDot = ({ onMove, index, onClick, active }) => {
  // onMove means if dragging or swiping in progress.
  // active is provided by this lib for checking if the item is active or not.
  return (
    <li
      className={active ? "active" : "inactive"}
      onClick={() => onClick()}
    >
      <div className="productlistdot"></div>
    </li>
  );
};

const ButtonGroup = ({ next, previous, goToSlide, ...rest }) => {
  const { carouselState: { currentSlide } } = rest;
  return (
    <div className="carousel-button-group">
      <button className={currentSlide === 0 ? 'disable' : 'productlistright'} onClick={() => next()}>
        <i className="material-icons productlistrightarrow">chevron_right</i>
      </button>
      <button className="productlistleft" onClick={() => previous()}>
        <i className="material-icons productlistleftarrow">chevron_left</i>
      </button>
    </div>
  );
};

const CustomRight = ({ onClick }) => (
  <button className="productlistright" onClick={onClick}>
    <i className="material-icons productlistrightarrow">chevron_right</i>
  </button>
);
const CustomLeft = ({ onClick }) => (
  <button className="productlistleft" onClick={onClick}>
    <i className="material-icons productlistleftarrow">chevron_left</i>
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
    items: 4
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 2
  }
};



class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {    
      
      products:[], 
      rentalproducts:[], 
      customiseproducts:[], 
      loggedIn:false,
    };
  }

  componentDidMount(){
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


    var wishlist = []

    function fetch() {

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
        .post('https://admin.rehamo.com/api/getproductlist', {
        })
        .then(function (response) {
          //console.log(response)

            var Product = response.data
            console.log(Product)
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
                        item.Ratings = parseFloat(trating).toFixed(1)
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

            //console.log(ApplyProducts)
            //console.log(IntakeProducts)
            //console.log(MeasureProducts)
            //console.log(RelaxProducts)


            setTimeout(() => {
            globalthis.setState({ products: Product });
            }, 1000);

            //globalthis.setState({ products: Product });
                  
                  
            
          })
          .catch(function (error) {
            console.log(error)
            //modal[0].style.display = 'none'
            //$('#loading-circle').hide();
          })



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

            Product.forEach((item,i) => {
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
                        item.Ratings = parseFloat(trating).toFixed(1)
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

            //console.log(ApplyProducts)
            //console.log(IntakeProducts)
            //console.log(MeasureProducts)
            //console.log(RelaxProducts)


            setTimeout(() => {
              globalthis.setState({ rentalproducts: Product });
              }, 1000);
  
              globalthis.setState({ rentalproducts: Product });
                
                  
            
          })
          .catch(function (error) {
            console.log(error)
            //modal[0].style.display = 'none'
            //$('#loading-circle').hide();
          })



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

            Product.forEach((item,i) => {
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
                        item.Ratings = parseFloat(trating).toFixed(1)
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

            //console.log(ApplyProducts)
            //console.log(IntakeProducts)
            //console.log(MeasureProducts)
            //console.log(RelaxProducts)


            setTimeout(() => {
              globalthis.setState({ customiseproducts: Product });
              }, 1000);
  
              globalthis.setState({ customiseproducts: Product });
                    
                  
            
          })
          .catch(function (error) {
            console.log(error)
            //modal[0].style.display = 'none'
            //$('#loading-circle').hide();
          })
    }

    fetch()
  

      this.gotoproductview = async (item) => {
        console.log(item)
        let catresult = item.ProductCategory.replace(" ", "-");
        let subresult = item.SubCategory.replace(" ", "-");
        window.location.href = '/shopnow/'+catresult+'/'+subresult+'/'+item.ProductNameURL+'/'+item.ProductID+''  
            
      };

      this.gotorentalview = async (item) => {
        console.log(item)
        let catresult = item.ProductCategory.replace(" ", "-");
        let subresult = item.SubCategory.replace(" ", "-");
        window.location.href = '/rental/'+catresult+'/'+subresult+'/'+item.ProductNameURL+'/'+item.ProductID+''  
            
      };


      this.gotocustomiseview = async (item) => {
        console.log(item)
        let catresult = item.ProductCategory.replace(" ", "-");
        let subresult = item.SubCategory.replace(" ", "-");
        window.location.href = '/customised/'+catresult+'/'+subresult+'/'+item.ProductNameURL+'/'+item.ProductID+''  
            
      };


      this.removefromwishlist = async (item,i,key) => {
        console.log(item)

        axios
          .post('https://admin.rehamo.com/api/deletewish', {
                WishID:item.ProductID,
                UserEmail:useremail,
          })
          .then(function (response) {
            //console.log(response)
            if(response.data === 'wish deleted'){

              for(var i in wishlist){
                if(wishlist[i]==item.ProductID){
                    wishlist.splice(i,1);
                    break;
                }
            }
              if(key === 'Product'){
                var Product = globalthis.state.products
                Product.forEach((itemn,i) => {
                  //console.log(itemn)
                  if(wishlist.includes(itemn.ProductID)){
                    itemn.Wishlist = true
                  }else{
                    itemn.Wishlist = false
                  }
                });
  
                globalthis.setState({ products: Product });
              }else if(key === 'Rental'){
                var RentalProduct = globalthis.state.rentalproducts
                RentalProduct.forEach((itemn,i) => {
                  //console.log(itemn)
                  if(wishlist.includes(itemn.ProductID)){
                    itemn.Wishlist = true
                  }else{
                    itemn.Wishlist = false
                  }
                });
  
                globalthis.setState({ rentalproducts: RentalProduct });
              }else if(key === 'Custom'){
                var CustomiseProduct = globalthis.state.customiseproducts
              CustomiseProduct.forEach((itemn,i) => {
                //console.log(itemn)
                if(wishlist.includes(itemn.ProductID)){
                  itemn.Wishlist = true
                }else{
                  itemn.Wishlist = false
                }
              });

              globalthis.setState({ customiseproducts: CustomiseProduct });
              }
              
              
            }

            })
            .catch(function (error) {
              console.log(error)
            })
            
      };

      this.addtowishlist = async (item,i,key) => {
        //console.log(item)

        axios
          .post('https://admin.rehamo.com/api/addwishlist', {
                WishID:item.ProductID,
                UserEmail:useremail,
                ProductID:item.ProductID,
                Product:item,
          })
          .then(function (response) {
            //console.log(response)
            fetch()
            

            })
            .catch(function (error) {
              console.log(error)
            })
            
      };

  }
 
  render() {


    let count = 0;

    let ProductArray = this.state.products.map((item, i) => {

      var ratings = item.Ratings

      if(ratings){
        ratings = parseInt(item.Ratings)
      }else{
        ratings = 0
      }


      if (item.ProductStatus =="Active") {
        if (item.ProductKey) {
            let Image_Http_URL = `https://rehamobucket.s3.ap-south-1.amazonaws.com/RehamoProducts/`+item.ProductID+`/Images/1_Image.jpg`
            count += 1;
            
            var discount = '10%';
            var oldPrice = parseInt(item.ProductPrice)/10;
            var oldPrice = parseInt(item.ProductPrice) - oldPrice;
              return (
                <>

                <div key={i} className="compo12card_wrapper" key={i}>
                        {/* <FontAwesomeIcon icon="fa fa-heart" /> */}
                        {/* <FavoriteIcon/>
                        <i class="fa fa-heart" aria-hidden="true"></i> */}
                        
                        <div className="compo12card_row">
                        <img className="compo12card_img" onClick={() => this.gotoproductview(item)} src={Image_Http_URL} alt="Image"/>
                        {this.state.loggedIn?(
                            <>
                            {item.Wishlist ? 
                            <img className="compo12card_likeindex" onClick={()=>this.removefromwishlist(item,i,'Product')} src={require("../assets/icons/likeSelected.png")} alt="Image" /> 
                            : 
                            <img className="compo12card_likeindex" onClick={()=>this.addtowishlist(item,i,'Product')} src={require("../assets/icons/like.png")} alt="Image" />
                            }
                            </>
                          ):(<></>)}
                        </div>
                            <div className="compo12card_contentContainer">             
                            <StarRatings
                                rating={ratings}
                                starRatedColor="#FFC049"
                                numberOfStars={5}
                                name='rating'
                                starDimension="16px"
                                starSpacing="2px"
                                className="productstarsindex"
                              />
                            {/*<Rating size={16} className="productstars" readonly initialValue={0} ratingValue={parseInt(item.Ratings)} />*/}
                              <p className="compo12card_text" onClick={() => this.gotoproductview(item)}>{item.ProductName}</p>
                              <div className="compo12card_row">
                                <p className="compo12card_oldPrice">Rs. {oldPrice}</p>
                                <p className="compo12card_discount">{discount}</p>
                              </div>
                              <p className="compo12card_price">Rs. {item.ProductPrice}</p>
                              <button className="homecatspbtn" onClick={() => this.gotoproductview(item)}>Shop Now</button>
                            </div>
                        </div>
    
                  </>
              );
      }
    }
    });


    let RentalArray = this.state.rentalproducts.map((item, i) => {
      
      if (item.ProductStatus =="Active") {
            let Image_Http_URL = `https://rehamobucket.s3.ap-south-1.amazonaws.com/RehamoProducts/`+item.ProductID+`/Images/1_Image.jpg`
            count += 1;
            
            var discount = '10%';
            var oldPrice = parseInt(item.ProductPrice)/10;
            var oldPrice = parseInt(item.ProductPrice) - oldPrice;
              return (
                <>

                <div key={i} className="compo12card_wrapper" key={i}>
                        {/* <FontAwesomeIcon icon="fa fa-heart" /> */}
                        {/* <FavoriteIcon/>
                        <i class="fa fa-heart" aria-hidden="true"></i> */}
                        <div className="compo12card_row">
                        <img className="compo12card_img" onClick={() => this.gotorentalview(item)} src={Image_Http_URL} alt="Image"/>
                        {this.state.loggedIn?(
                            <>
                            {item.Wishlist ? 
                            <img className="compo12card_likeindex" onClick={()=>this.removefromwishlist(item,i,'Rental')} src={require("../assets/icons/likeSelected.png")} alt="Image" /> 
                            : 
                            <img className="compo12card_likeindex" onClick={()=>this.addtowishlist(item,i,'Rental')} src={require("../assets/icons/like.png")} alt="Image" />
                            }
                            </>
                          ):(<></>)}
                        </div>
                            <div className="compo12card_contentContainer">        
                              <p className="compo12card_text" onClick={() => this.gotorentalview(item)}>{item.ProductName}</p>
                              <div className="compo12card_row">
                                <p className="compo12card_discount"></p>
                              </div>
                              <p className="compo12card_price"></p>
                              <button className="homecatspbtn" onClick={() => this.gotorentalview(item)}>Enquire Now</button>
                            </div>
                        </div>
    
                  </>
              );
      
    }
    });

    let CustomiseArray = this.state.customiseproducts.map((item, i) => {
      
      if (item.ProductStatus =="Active") {
       
            let Image_Http_URL = `https://rehamobucket.s3.ap-south-1.amazonaws.com/RehamoProducts/`+item.ProductID+`/Images/1_Image.jpg`
            count += 1;
            
            var discount = '10%';
            var oldPrice = parseInt(item.ProductPrice)/10;
            var oldPrice = parseInt(item.ProductPrice) - oldPrice;
              return (
                <>

                <div key={i} className="compo12card_wrapper" key={i}>
                        {/* <FontAwesomeIcon icon="fa fa-heart" /> */}
                        {/* <FavoriteIcon/>
                        <i class="fa fa-heart" aria-hidden="true"></i> */}
                        <div className="compo12card_row">
                        <img className="compo12card_img" onClick={() => this.gotocustomiseview(item)} src={Image_Http_URL} alt="Image"/>
                        {this.state.loggedIn?(
                            <>
                            {item.Wishlist ? 
                            <img className="compo12card_likeindex" onClick={()=>this.removefromwishlist(item,i,'Custom')} src={require("../assets/icons/likeSelected.png")} alt="Image" /> 
                            : 
                            <img className="compo12card_likeindex" onClick={()=>this.addtowishlist(item,i,'Custom')} src={require("../assets/icons/like.png")} alt="Image" />
                            }
                            </>
                          ):(<></>)}
                        </div>
                            <div className="compo12card_contentContainer">            
                              <p className="compo12card_text" onClick={() => this.gotocustomiseview(item)}>{item.ProductName}</p>
                              <div className="compo12card_row">
                                <p className="compo12card_discount"></p>
                              </div>
                              <p className="compo12card_price"></p>
                              <button className="homecatspbtn" onClick={() => this.gotocustomiseview(item)}>Enquire Now</button>
                            </div>
                        </div>
    
                  </>
              );
      
    }
    });

    return (
      <>
        <Navbar/>
        <Compo2/>
        <Compo3/>
        <Compo4/>
        <h2 className="landing_heading1" >Wide Range Of Support Systems</h2>
        <Compo5/>
        <Compo6/>
        <Compo7/>
        <div className="compo12_wrapper">
          <h2 className="compo12_heading">Product Range</h2>
          <div className="compo12card_colorWrapper" style={{backgroundColor:'#FFECC5'}}>
          
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
              customButtonGroup={<ButtonGroup />}
              renderButtonGroupOutside={true}
              customLeftArrow={<CustomLeft/>}
              customRightArrow={<CustomRight/>}
              className="productlist"
              deviceType={this.props.deviceType}
              dotListClass="custom-dot-list-style"
              itemClass="productlistitem"
              >
                
          {ProductArray}
          </Carousel>
          </div>
          </div>


          <div className="compo12_wrapper">
          <h2 className="compo12_heading">Customised Products</h2>
          <div className="compo12card_colorWrapper" style={{backgroundColor:'#E0FAFF'}}>
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
              customButtonGroup={<ButtonGroup />}
              renderButtonGroupOutside={true}
              customLeftArrow={<CustomLeft/>}
              customRightArrow={<CustomRight/>}
              className="productlist"
              deviceType={this.props.deviceType}
              dotListClass="custom-dot-list-style"
              itemClass="productlistitem"
              >
          {CustomiseArray}
          </Carousel>
          </div>
          </div>



          <div className="compo12_wrapper">
          <h2 className="compo12_heading">Rental Products</h2>
          <div className="compo12card_colorWrapper" style={{backgroundColor:'#FFD8CD'}}>
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
              customButtonGroup={<ButtonGroup />}
              renderButtonGroupOutside={true}
              customLeftArrow={<CustomLeft/>}
              customRightArrow={<CustomRight/>}
              className="productlist"
              deviceType={this.props.deviceType}
              dotListClass="custom-dot-list-style"
              itemClass="productlistitem"
              >
          {RentalArray}
          </Carousel>
          </div>
          </div>


        {/*<Compo12 title="Product Range" color="#FFECC5" 
              image={image1}           
              name={name1}
              oldPrice={oldPrice1}
              discount={discount1}
              price={price1}
              like={like1}/>
        <Compo12 title="Customised Products" color="#E0FAFF"
        image={image2}           
        name={name2}
        oldPrice={oldPrice2}
        discount={discount2}
        price={price2}
        like={like2}/>
        <Compo12 title="Rental Products" color="#FFD8CD"
        image={image3}           
        name={name3}
        oldPrice={oldPrice3}
        discount={discount3}
        price={price3}
    like={like3}/>*/}
        <Compo11/>        
        <Compo10/>
        <Compo9/>
        <Compo8/>
        <Footer/>
      </>
    );
  }
}

export default Index;
