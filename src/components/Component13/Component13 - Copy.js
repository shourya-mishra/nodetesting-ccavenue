import React from "react";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import FavoriteIcon from '@mui/icons-material/Favorite';

import './Component13.css'

class compo13 extends React.Component {
  constructor(props){
    super(props);
    }
  render() {
    return (
      <>
        <div className="compo13_wrapper">
          <h5 className="compo13_heading">All Products</h5>

          <select className="compo13_select">
            <option className="compo13_option">wheelchairs</option>
            <option className="compo13_option">wh2</option>
          </select><br/>

          <select className="compo13_select">
            <option className="compo13_option">Pediatric</option>
            <option className="compo13_option">wh2</option>
          </select><br/>

          <select className="compo13_select">
            <option className="compo13_option">Orthotics</option>
            <option className="compo13_option">wh2</option>
          </select><br/>

          <select className="compo13_select">
            <option className="compo13_option">Beds & Transfers</option>
            <option className="compo13_option">wh2</option>
          </select><br/>

          <select className="compo13_select">
            <option className="compo13_option">Assisted Living</option>
            <option className="compo13_option">wh2</option>
          </select><br/>

          <select className="compo13_select">
            <option className="compo13_option">Mobility</option>
            <option className="compo13_option">wh2</option>
          </select><br/>

        </div>
      </>
    );
  }
}

export default compo13;
