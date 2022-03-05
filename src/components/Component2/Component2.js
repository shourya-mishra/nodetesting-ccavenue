
import React from "react";

import './Component2.css'

class Compo2 extends React.Component {
  render() {
    return (
      <>
        <div className="compo2_wrapper">
          <div className="compo2_container" onClick={()=>window.location.href='/shopnow/Wheelchairs/All'}>
             <div className="compo2_imageWrapper">
               <img className="compo2_img" src={require('../../assets/img/compo2/wheelChair.png')} /> 
             </div>
             <p className="compo2_text">Wheelchairs</p>
          </div>
          <div className="compo2_container" onClick={()=>window.location.href='/shopnow/Mobility/All'}>
             <div className="compo2_imageWrapper">
               <img className="compo2_img" src={require('../../assets/img/compo2/mobility.png')} /> 
             </div>
             <p className="compo2_text">Mobility</p>
          </div>
          <div className="compo2_container" onClick={()=>window.location.href='/shopnow/Beds-&-Transfers/All'}>
             <div className="compo2_imageWrapper">
               <img className="compo2_img" src={require('../../assets/img/compo2/bedsAndTransfers.png')} /> 
             </div>
             <p className="compo2_text">Beds & Transfers</p>
          </div>
          <div className="compo2_container" onClick={()=>window.location.href='/shopnow/Pediatric/All'}>
             <div className="compo2_imageWrapper">
               <img className="compo2_img" src={require('../../assets/img/compo2/pediatric.png')} /> 
             </div>
             <p className="compo2_text">Pediatric</p>
          </div>
          <div className="compo2_container" onClick={()=>window.location.href='/shopnow/Assisted-Living/All'}>
             <div className="compo2_imageWrapper">
               <img className="compo2_img" src={require('../../assets/img/compo2/assistedLiving.png')} /> 
             </div>
             <p className="compo2_text">Assisted Living</p>
          </div>
          <div className="compo2_container" onClick={()=>window.location.href='/shopnow/Orthotics/All'}>
             <div className="compo2_imageWrapper">
               <img className="compo2_img" src={require('../../assets/img/compo2/orthotics.png')} /> 
             </div>
             <p className="compo2_text">Orthotics</p>
          </div>
        </div>
      </>
    );
  }
}

export default Compo2;
