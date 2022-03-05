import React from "react";

import './Component8.css'

const axios = require('axios').default

class compo8 extends React.Component {
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
      if(count<=2){
            let Image_Http_URL = `https://rehamobucket.s3.ap-south-1.amazonaws.com/Blogs/`+item.BlogID+`_Image1.jpg`
            count += 1;
              return (
                <>
                <div key={i} className="compo8card_wrapper">
                    <img className="compo8card_img" onClick={()=>this.gotoblog(item)} src={Image_Http_URL} alt="Image"/>
                    <div className="compo8card_contentWrapper">
                      <h3 className="compo8card_heading">{item.BlogName}</h3>
                      <p className="compo8card_text" dangerouslySetInnerHTML={{ __html: item.BlogContent }}></p>
                      <div className="compo8card_row">
                      <p className="compo8card_date">{item.BlogDate}</p>
                      <p className="compo8card_readMore" onClick={()=>this.gotoblog(item)}>Read more</p>
                    </div>
                    </div>
                  </div>
                  </>
              );
      }
         
    });

   

    return (
      <>
        <div className="compo8_wrapper">
          <div className="compo8_greyWrapper">
          <h2 className="compo8_heading">Blogs</h2>
          <div className="compo8_row">
            {BlogArray}          
          </div>
        </div>
        </div>
      </>
    );
  }
}

class Compo8Card extends React.Component{
  constructor(props){
    super(props)
  }

  render(){
    return(
      <>
        <div className="compo8card_wrapper">
          <img className="compo8card_img" src={this.props.image} alt="Image"/>
          <div className="compo8card_contentWrapper">
            <h3 className="compo8card_heading">{this.props.heading}</h3>
            <p className="compo8card_text">{this.props.text}</p>
            <div className="compo8card_row">
            <p className="compo8card_date">{this.props.date}</p>
            <p className="compo8card_readMore">Read more</p>
          </div>
          </div>
        </div>
      </>
    );
  }
}

export default compo8;
