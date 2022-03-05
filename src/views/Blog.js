import React from "react";
import { Container, Row, Col } from "reactstrap";

import Navbar from "../components/Navbars/Navbar";

import Footer from "../components/Footer/Footer";
import { Carousel } from "react-responsive-carousel";

import "../assets/css/blog.css";

const axios = require('axios').default

class Blogs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      blogs:[],
      blogid:'',
      blogname:'',
      blogdate:'',
      blogauthor:'',
      blogcontent:'',
      blogimg1:require("../assets/img/blog/blogBanner.png"),
      blogimg2:require("../assets/img/blog/blogImage1.png"),
      blogimg3:require("../assets/img/blog/blogImage2.png"),
    };
  }

  componentDidMount(){

    var globalthis = this

    try {
      var mainurl = document.location.href,
        params = mainurl.split('?')[1].split('&'),
        data = {},
        tmp
      for (var i = 0, l = params.length; i < l; i++) {
        tmp = params[i].split('=')
        data[tmp[0]] = tmp[1]
      }
      var id = data.id
      globalthis.setState ({ blogid: id });

            axios
              .post('https://admin.rehamo.com/api/getblogdata', {
                BlogID:id,
              })
              .then(function (response) {
                ////console.log(response)
                if (response.data.Status === 'blog found') {
                  var Blog = response.data.blog

                  globalthis.setState ({ blogname: Blog.FirstName });
                  globalthis.setState ({ blogauthor: Blog.BlogAuthor });
                  globalthis.setState ({ blogdate: Blog.BlogDate });
                  globalthis.setState ({ blogcontent: Blog.BlogContent });
                  globalthis.setState ({ blogimg1: `https://rehamobucket.s3.ap-south-1.amazonaws.com/Blogs/`+Blog.BlogID+`_Image1.jpg` });
                  globalthis.setState ({ blogimg2: `https://rehamobucket.s3.ap-south-1.amazonaws.com/Blogs/`+Blog.BlogID+`_Image2.jpg` });
                  globalthis.setState ({ blogimg3: `https://rehamobucket.s3.ap-south-1.amazonaws.com/Blogs/`+Blog.BlogID+`_Image3.jpg` });
                }
              
              
            })
            .catch(function (error) {
              ////console.log(error)
            })
      } catch (error) {
        
      }

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

    let blogid = this.state.blogid

    let BlogArray = this.state.blogs.map((item, i) => {
        if(item.BlogID !== blogid){
          if(count<=2){
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
          }
          
        }
            
         
    });

   

    return (
      <>
        <Navbar />

        <div className="compo3_wrapper">
        <div className="compo3_imgWrapper">
            <img
              className="blogCompo_img"
              src={this.state.blogimg1}
            />
          </div>
        </div>
        <div className="blog_postContainer">
          <div className="blog_leftDiv">
            <p className="blog_date">{this.state.blogdate}</p>
          </div>
          <div className="blog_rightDiv">
            <p className="blog_postText"  dangerouslySetInnerHTML={{ __html: this.state.blogcontent }}>
              
            </p>

            <div className="blog_postImgContainer">
              <img
                className="blog_postImg"
                src={this.state.blogimg2}
              />
              <img
                className="blog_postImg"
                src={this.state.blogimg3}
              />
            </div>
            <div className="products_hrLine"></div>
            <br />
            <br />
            <div className="blog_user">
              <img
                className="blog_userIcon"
                src={require("../assets/img/blog/userIcon.png")}
              />
              <div>
                <h3 className="blog_userName">{this.state.blogauthor}</h3>
                <p className="blog_userDesignation">Content Writer</p>
              </div>
            </div>
          </div>
        </div>
        <h4 className="blog_heading">Related Posts</h4>
        <div className="b1_cardsWrapper">
          {BlogArray}
        </div>  
        <Footer />
      </>
    );
  }
}

class BlogCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <>
        <div className="blogCard_Container">
          <img className="blogCard_img" src={this.props.img} />
          <div className="blogCard_type">
            {this.props.type}
          </div>
          <p className="blogCard_date">{this.props.date}</p>
          <h3 className="blogCard_heading">{this.props.heading}</h3>
          <p className="blogCard_content">{this.props.content}</p>
        </div>
      </>
    );
  }
}

export default Blogs;
