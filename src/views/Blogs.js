import React from "react";
import { Container, Row, Col } from "reactstrap";

import Navbar from "../components/Navbars/Navbar";

import Footer from "../components/Footer/Footer";
import { Carousel } from 'react-responsive-carousel';

import "../assets/css/blog1.css";

const axios = require('axios').default

class Blog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      blogs:[],
    };
  }


  componentDidMount(){

    var globalthis = this

    axios
    .post('https://admin.rehamo.com/api/getbloglist', {
    })
    .then(function (response) {
      console.log(response)

        var Blog = response.data
        var allcontent = ''

        Blog.sort(function(a, b) {
          var keyA = new Date(a.BlogDate),
            keyB = new Date(b.BlogDate);
          // Compare the 2 dates
          if (keyA < keyB) return -1;
          if (keyA > keyB) return 1;
          return 0;
        });

        Blog = Blog.reverse()
        globalthis.setState({ blogs: Blog });

       
              
        
      })
      .catch(function (error) {
        console.log(error)
        //modal[0].style.display = 'none'
        //$('#loading-circle').hide();
      })

      this.gotoblog = async (item) => {
        console.log(item)
        window.location.href = '/blog?n='+item.BlogName+'&id='+item.BlogID+''
            
      };

  }

  render() {

    let count = 0;

    let BlogArray = this.state.blogs.map((item, i) => {
          let Image_Http_URL = `https://rehamobucket.s3.ap-south-1.amazonaws.com/Blogs/`+item.BlogID+`_Image1.jpg`
          count += 1;
            return (
              <>

             <div key={i} className="blogCard_Container" onClick={()=>this.gotoblog(item)}>
                  <img className="blogCard_img" onClick={()=>this.gotoblog(item)} src={Image_Http_URL}  />
                  <div className="blogCard_type">
                    Blog
                  </div>
                  <div className="blogpcontain">
                  <p className="blogCard_date">{item.BlogDate}</p>
                  <h3 className="blogCard_heading">{item.BlogName}</h3>
                  <p className="blogCard_content" dangerouslySetInnerHTML={{ __html: item.BlogContent }}></p>
                  </div>
                </div>
                </>
            );
        
  });

  let BlogArrayCarousal = this.state.blogs.map((item, i) => {
    let Image_Http_URL = `https://rehamobucket.s3.ap-south-1.amazonaws.com/Blogs/`+item.BlogID+`_Image1.jpg`
    count += 1;
      return (
        <>
            <div key={i} className="compo3_imgWrapperblog"  onClick={()=>this.gotoblog(item)}>
              <img className="blogCompo_img2" src={Image_Http_URL} />
              <p className="bloginnerdate">{item.BlogDate}</p>
              <p className="bloginnername">{item.BlogName}</p>
            </div>
          </>
      );
  
});



    return (
      <>
        <Navbar />
        <div className="blg_wrapper">
          <Carousel 
            autoPlay={true} 
            infiniteLoop={true} 
            interval={3000} 
            showArrows={false}
            partialVisible={false}
            className="blogcarousal2"
            >
           {BlogArrayCarousal}
          </Carousel>
        </div>
        <h2 className="b1_heading2">Popular topics</h2>
        <div className="b1_cardsWrapper">
          {BlogArray}
        </div>
       <Footer />
      </>
    );
  }
}

class BlogCard extends React.Component{
  constructor(props){
    super(props)

    this.state = {

    }
  }

  render(){
    return(
      <>
        <div className="bCard_Container">
          <img className="bCard_img" src={this.props.img} />
          <p className="bCard_date">{this.props.date}</p>
          <h3 className="bCard_heading">{this.props.heading}</h3>
          <p className="bCard_content">{this.props.content}</p>
          <span className="bCard_hr"></span>
          <h5 className="bCard_author">By {this.props.author}</h5>
          <p className="bCard_designation">{this.props.designation}</p>
        </div>
      </>
    )
  }
}

export default Blog;
