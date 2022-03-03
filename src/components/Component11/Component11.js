import React from "react";

import './Component11.css'

const axios = require('axios').default

class compo11 extends React.Component {



  constructor(props) {
    super(props);
    this.state = {
      trending1:'',
      trending2:'',
      trending3:'',
      trending4:'',
      trending1p:'',
      trending2p:'',
      trending3p:'',
      trending4p:'',
      products:[],
      cart:[],
    };
  }

  componentDidMount(){

    var globalthis = this

    axios
        .post('https://admin.rehamo.com/api/gettrendingdata', {
          TrendingID: 'YRYTU6546KJBKK2Y2',
        })
        .then( function (response) {
          console.log(response)
          if (response.data.Status === 'trending found') {

            var result = response.data.trending

            globalthis.setState({trending1:result.Trending1})
            globalthis.setState({trending2:result.Trending2})
            globalthis.setState({trending3:result.Trending3})
            globalthis.setState({trending4:result.Trending4})

            var trending1 = result.trending1
            var trending2 = result.trending2
            var trending3 = result.trending3
            var trending4 = result.trending4
      
            axios
            .post('https://admin.rehamo.com/api/getproductlist', {
            })
            .then(function (response) {
              console.log(response)

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

               

                Product.forEach((item,i) => {
                  console.log(item.ProductID)
                  if(item.ProductID === trending1){
                    globalthis.setState({trending1p:item})
                  }
                  if(item.ProductID === trending2){
                    globalthis.setState({trending2p:item})
                  }
                  if(item.ProductID === trending3){
                    globalthis.setState({trending3p:item})
                  }
                  if(item.ProductID === trending4){
                    globalthis.setState({trending4p:item})
                  }
                  
                });

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
          }
        })
        .catch(function (error) {
          //alert('Something went wrong')
          console.log(error)
        })

        this.productview = async (item) => {
          console.log(item)
          window.location.href = '/shopnow/'+item.ProductNameURL+'/'+item.ProductID+''
              
        };
    

  }

  render() {

    let count = 0;

    var trending1 = this.state.trending1
    var trending2 = this.state.trending2
    var trending3 = this.state.trending3
    var trending4 = this.state.trending4

    let ProductArray1 = this.state.products.map((item, i) => {
      
      if (item.ProductStatus =="Active") {
        if (item.ProductID ==trending1) {

            let Image_Http_URL = `https://rehamobucket.s3.ap-south-1.amazonaws.com/RehamoProducts/`+item.ProductID+`/Images/1_Image.jpg`
            count += 1;
              return (
                <>
                <div key={i} className="compo11_col">
                    <div className="compo11card_wrapper1">
                    <div className="compo11_contentContainer1">
                        <p className="compo11_tag2">#Trending Now</p>
                        <h3 className="compo11card_heading1">{item.ProductName}</h3>
                        <p className="compo11card_text2" onClick={()=>this.productview(item)}>SHOP NOW</p>
                      </div>
                    <img className="compo11card_img1" src={Image_Http_URL} alt="Image"/>         
                    
                      
                    </div>
                    </div>
                  </>
              );
          }
      }
    });

    let ProductArray2 = this.state.products.map((item, i) => {
      
      if (item.ProductStatus =="Active") {
        if (item.ProductID ==trending2) {

            let Image_Http_URL = `https://rehamobucket.s3.ap-south-1.amazonaws.com/RehamoProducts/`+item.ProductID+`/Images/1_Image.jpg`
            count += 1;
              return (
                <>
                <div key={i} className="compo11_row1">
            <div className="compo11card_wrapper2">            
              <img className="compo11card_img2" src={Image_Http_URL} alt="Image"/>
              <div className="compo11_contentContainer2">
                <p className="compo11_tag2">#Trending Now</p>
                <h3 className="compo11card_heading2">{item.ProductName}</h3>
                <p className="compo11card_text2" onClick={()=>this.productview(item)}>SHOP NOW</p>
              </div>
            </div>
            </div>
                  </>
              );
          }
      }
    });

    let ProductArray3 = this.state.products.map((item, i) => {
      
      if (item.ProductStatus =="Active") {
        if (item.ProductID ==trending3) {

            let Image_Http_URL = `https://rehamobucket.s3.ap-south-1.amazonaws.com/RehamoProducts/`+item.ProductID+`/Images/1_Image.jpg`
            count += 1;
              return (
                <>
                <div key={i} className="compo11_col">
            <div className="compo11card_wrapper3">            
              <img className="compo11card_img3" src={Image_Http_URL} alt="Image"/>
              <div className="compo11_contentContainer3">
                <p className="compo11_tag3">#Trending Now</p>
                <h3 className="compo11card_heading3">{item.ProductName}</h3>
                <p className="compo11card_text3" onClick={()=>this.productview(item)}>SHOP NOW</p>
              </div>
            </div>
            </div>

                  </>
              );
          }
      }
    });

    let ProductArray4 = this.state.products.map((item, i) => {
      
      if (item.ProductStatus =="Active") {
        if (item.ProductID ==trending4) {

            let Image_Http_URL = `https://rehamobucket.s3.ap-south-1.amazonaws.com/RehamoProducts/`+item.ProductID+`/Images/1_Image.jpg`
            count += 1;
              return (
                <>
                <div key={i} className="compo11_col">
            <div className="compo11card_wrapper4">            
              <img className="compo11card_img3" src={Image_Http_URL} alt="Image"/>
              <div className="compo11_contentContainer3">
                <p className="compo11_tag3">#Trending Now</p>
                <h3 className="compo11card_heading3">{item.ProductName}</h3>
                <p className="compo11card_text3" onClick={()=>this.productview(item)}>SHOP NOW</p>
              </div>
            </div>
            </div>
                  </>
              );
          }
      }
    });

    return (
      <>
      <div className="compo11_wrapper">
          <h2 className="compo11_heading">Trending products</h2>
        <div className="compo11_row1">
        
        {ProductArray1}

          <div className="compo11_col">
            {ProductArray2}
            <div className="compo11_row">
            {ProductArray3}
            {ProductArray4}
            </div>
          </div>
        </div>
        </div>
    
      </>
    );
  }
}

export default compo11;
