
import React from "react";

import './Navbar.css'


class Navbar extends React.Component {
  
  constructor(){
    super()
    this.myRef = React.createRef()
    this.openNav = this.openNav.bind(this)
    this.closeNav = this.closeNav.bind(this)
  }
  
  openNav() {
    this.myRef.current.className = 'sideNavOpen'
    console.log(this.myRef);
  }
  
  closeNav() {
    this.myRef.current.className = 'sideNavClose'
    console.log(this.myRef);
  }

  render() {
    return (
      <>
        <div className="navbar_container">
          <div className="navbar_wrapperUpper">
            <img src={require('../../assets/img/logo.png')} className="navbar_logo" />
            
            <div className="navbar_searchWrapper navbar_mobHidden">
              <input type="text" className="navbar_searchInput" />
              <button className="navbar_searchButton"><img src={require('../../assets/icons/search.png')} className="navbar_searchImg"/></button>
            </div>

            <div className="navbar_actionContainer">
              <span className="navbar_actionWrapper navbar_mobHidden">
                <img className="navbar_actionIcon" src={require('../../assets/icons/heart.png')} />
              </span>
              <span className="navbar_actionWrapper">
                <img className="navbar_actionIcon" src={require('../../assets/icons/cart.png')} />
              </span>
              <span className="navbar_actionWrapper navbar_mobHidden">
                <img className="navbar_actionIcon" src={require('../../assets/icons/bell.png')} />
              </span>
              <span className="navbar_actionWrapper">
                <img className="navbar_actionIcon" src={require('../../assets/icons/user.png')} />
              </span>
            </div>

            <div className="navbar_desktopHidden navbar_mobShow navBar_sidebarWrapper">
              <span className="navbar_sideMenuSpan" onClick={this.openNav}>&#9776;</span>
              <div id="mySidenav" className="sideNavClose" ref={this.myRef}>
                <span className="closebtn" onClick={this.closeNav}>&times;</span>
                <a href="#">About</a>
                <a href="#">Services</a>
                <a href="#">Clients</a>
                <a href="#">Contact</a>
              </div>
            </div>
          </div>
          <div className="navbar_wrapperLower navbar_mobHidden">
            <div className="navbar_linkContainer">
              <a className="navbar_link" href="/about" >About</a>  
            </div>
            <div className="navbar_linkContainer">
              <a className="navbar_link" href="/shopnow" >Products</a>  
            </div>
            <div className="navbar_linkContainer">
              <a className="navbar_link" href="/customised_products" >Customised Products</a>  
            </div>
            <div className="navbar_linkContainer">
              <a className="navbar_link" href="/rental" >Rental</a>  
            </div>
            <div className="navbar_linkContainer">
              <a className="navbar_link" href="/warranty" >Warranty</a>  
            </div>
            <div className="navbar_linkContainer">
              <a className="navbar_link" href="/blogs" >Blogs</a>  
            </div>
            <div className="navbar_linkContainer">
              <a className="navbar_link" href="/contacts" >Contacts</a>  
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Navbar;
