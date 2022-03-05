import React, { Component } from 'react'
import {DataContext} from '../components/Context'
import {Link} from 'react-router-dom'


import { Card,Col,Row, Container, CardHeader } from "reactstrap";

export class Cart extends Component {
    static contextType = DataContext;

    componentDidMount(){
        this.context.getTotal();
    }
    
    render() {
        
        const {cart,increase,reduction,removeProduct,total} = this.context;
        
        if(cart.length === 0){
            return <h6 className="cartnone">No Products added</h6>
        }else{
            return (
                <>
                    {
                        cart.map(item =>{
                            var img = `https://rehamobucket.s3.ap-south-1.amazonaws.com/RehamoProducts/`+item.data.ProductID+`/Images/1_Image.jpg`

                            return(
                            <Col lg="12" className="cartproduct" key={item.uid}>
                                <Row className="mobilerow">
                                    <Col lg="5" className="mobilefive">
                                    <img onClick={()=> {window.location.href = '/shopnow/'+item.data.ProductName+'/'+item.data.ProductID+''}}
                                    className="cartproductimg" 
                                    src={img} alt=""/>
                                    </Col>
                                    <Col lg="7" className="mobileseven">
                                    <div className="cartproductdiv">
                                            <div className="cartproductrow">
                                                <h6 className="cartname"
                                                onClick={()=> {window.location.href = '/shopnow/'+item.data.ProductName+'/'+item.data.ProductID+''}}
                                                >{item.data.ProductName}</h6>
                                                <h6 className="cartprice">₹ {item.price * item.count}</h6>
                                                <h6 className="cartsize">{item.psize.size}</h6>
                                                <h6 className="cartcolor">Color: <div className='cartcolorinside' style={{backgroundColor:item.pcolor.color}}></div></h6>
                                           </div>
                                            <div className="cartproductamount">
                                                <button className="cartproductqty cartproductqtyleft" onClick={() => reduction(item.uid)}> - </button>
                                                <span className="cartproductcount">{item.count}</span>
                                                <button className="cartproductqty cartproductqtyright" onClick={() => increase(item.uid)}> + </button>
                                            </div>
                                        </div>
                                        <div className="cartproductdelete" onClick={() => removeProduct()}>X</div>
                                    </Col>
                                </Row>
                                
                            </Col>
                            )
                            })
                    }
                    <Col lg="12" className="carttotaldiv">
                        <h5 className="cartproducttotal">Shipping: <span className="cartbold">{total>1000?('FREE'):('₹ 50')}</span></h5>
                        <h5 className="cartproducttotal">Total: <span className="cartbold">₹ {total}</span></h5>
                    </Col>
                </>
                )
            }
        }
}

export default Cart