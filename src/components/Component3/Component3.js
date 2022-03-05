import React from "react";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

import './Component3.css'


const axios = require('axios').default

class Compo3 extends React.Component {

  constructor(props) {
    super(props);
    
    this.state = {
      banners:[],
    };

  }

  componentDidMount(){

    var globalthis = this
      //modal[0].style.display = 'block'
      //$('#loading-circle').show();

      

      axios
      .post('https://admin.rehamo.com/api/getbannerlist', {
      })
      .then(function (response) {
        //console.log(response)

          var Banners = response.data
          var allcontent = ''

          Banners.sort(function(a, b) {
            var keyA = new Date(a.Timestamp),
              keyB = new Date(b.Timestamp);
            // Compare the 2 dates
            if (keyA < keyB) return -1;
            if (keyA > keyB) return 1;
            return 0;
          });

          Banners = Banners.reverse()
          globalthis.setState({ banners: Banners });

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
    

        this.gotourl = async (item) => {
          console.log(item)
          window.location.href = item.BannerURL
              
        };

  }

  render() {

    let count = 0 

    let BannerArray = this.state.banners.map((item, i) => {
      
        
            let Image_Http_URL = `https://rehamobucket.s3.ap-south-1.amazonaws.com/Banners/`+item.BannerID+`_Image.jpg`
            count += 1;
              return (
                <>
    
                <div key={i}  onClick={() => this.gotourl(item)} className="compo3_imgWrapper" >
                  <img className="compo3_img" src={Image_Http_URL} />
                </div>
                  </>
              );
          
    });



    return (
      <>
        <div className="compo3_wrapper">
          <Carousel 
            autoPlay={true} 
            infiniteLoop={true} 
            interval={3000} 
            showArrows={false}
            partialVisible={false}
            className="bannercarousal"
            >
            {BannerArray}
          </Carousel>
        </div>
      </>
    );
  }
}

export default Compo3;
