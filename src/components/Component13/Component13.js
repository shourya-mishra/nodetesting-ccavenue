import React from "react";
import ReactDOM from 'react-dom';
import InputRange from 'react-input-range';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import FavoriteIcon from '@mui/icons-material/Favorite';
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from 'react-accessible-accordion';

import 'react-accessible-accordion/dist/fancy-example.css';
import './Component13.css'

class compo13 extends React.Component {
  constructor(props) {
    super(props);
 
    this.state = {
      value: { min: 0, max: 60000 }
    };

    this.changeMin = this.changeMin.bind(this)
  }

  changeMin(evt){
    let val = evt.target.value
    this.setState({
      value : {
        min : val, 
        max : this.state.value.max
      }
    })
  }

  changeMax(evt){
    let val = evt.target.value
    this.setState({
      value : {
        max : val, 
        min : this.state.value.min
      }
    })
  }

  render() {
    return (
      <>
        <div className="compo13_wrapper">
          <h4 className="compo13_heading">All Products</h4>
          <h4 className="compo13_heading">WheelChairs</h4>
          <h4 className="compo13_heading">Pediatric</h4>
          <h4 className="compo13_heading">Orthotics</h4>
          <h4 className="compo13_heading">Beds & Transfers</h4>
          <h4 className="compo13_heading">Assisted Living</h4>
          <h4 className="compo13_heading">Mobility</h4>


          <Accordion preExpanded={[0]} allowMultipleExpanded={true} className="sidebaraccordIan">
            
            <AccordionItem>
                <AccordionItemHeading className="sidebaraccordIanhead">
                <AccordionItemButton className="sidebaraccordIanbtn">
                    Seat Width
                    <i class="material-icons sidebaraccordianbtnicon">expand_more</i>
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel className="sidebaraccordIanpanel">
                <div className="sidebaraccordIanpanelinside">
                  <a className="compo13_link" href="#">Link 1</a>
                  <a className="compo13_link" href="#">Link 2</a>
                  <a className="compo13_link" href="#">Link 3</a>
                  </div>
                </AccordionItemPanel>
            </AccordionItem>


            <AccordionItem>
                <AccordionItemHeading className="sidebaraccordIanhead">
                <AccordionItemButton className="sidebaraccordIanbtn">
                    Frame Material
                    <i class="material-icons sidebaraccordianbtnicon">expand_more</i>
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel className="sidebaraccordIanpanel">
                <div className="sidebaraccordIanpanelinside">
                  <a className="compo13_link" href="#">Link 1</a>
                  <a className="compo13_link" href="#">Link 2</a>
                  <a className="compo13_link" href="#">Link 3</a>
                  </div>
                </AccordionItemPanel>
            </AccordionItem>

            <AccordionItem>
                <AccordionItemHeading className="sidebaraccordIanhead">
                <AccordionItemButton className="sidebaraccordIanbtn">
                    Transit
                    <i class="material-icons sidebaraccordianbtnicon">expand_more</i>
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel className="sidebaraccordIanpanel">
                <div className="sidebaraccordIanpanelinside">
                  <a className="compo13_link" href="#">Transit</a>
                  <a className="compo13_link" href="#">Manual</a>
                  <a className="compo13_link" href="#">Power</a>
                  </div>
                </AccordionItemPanel>
            </AccordionItem>

            
        </Accordion>
          

        
          
          {/*<div className="compo13_dropdown">
            <h4 className="compo13_heading">Price<img className="compo13_gt" src={require('../../assets/icons/gt.png')} /></h4>
            <div className="compo13_dropdownContent">
              <div className="compo13_sliderContainer">
                <InputRange
                  maxValue={400000}
                  minValue={0}
                  step={100}
                  formatLabel={value => `Rs.${value}`}
                  value={this.state.value}
                  onChange={value => this.setState({ value })}
                />
              </div>
              <div className="compo13_sliderValuesWrapper">
                <p className="compo13_sliderText">Min</p>
                <input className="compo13_sliderValues" type="text" onChange={evt => this.changeMin(evt)} value={this.state.value.min}/>
                <p className="compo13_sliderText">Max</p>
                <input className="compo13_sliderValues" type="text" onChange={evt => this.changeMax(evt)} value={this.state.value.max} />
              </div>
            </div>
            </div>*/}

        </div>
      </>
    );
  }
}

export default compo13;
