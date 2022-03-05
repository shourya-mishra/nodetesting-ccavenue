import React, { Component } from 'react'

const axios = require('axios').default

export const DataContext = React.createContext();

export class DataProvider extends Component {

    state = {
        products: [],
        cart: [],
        urlid:'',
        urlname:'',
        total: 0
        
    };



    addCart = (uid) =>{
        const {products, cart} = this.state;
        const check = cart.every(item =>{
            return item.uid !== uid
        })
        if(check){
            const data = products.filter(product =>{
                return product.uid === uid
            })
            this.setState({cart: [...cart,...data]})
        }else{
            console.log("The product has been added to cart.")
        }
    };

    addCartQty = (uid,qty,size,color) =>{
        console.log(uid,qty,size,color)
        const {products, cart} = this.state;
        const check = cart.every(item =>{
            return item.uid !== uid
        })
        if(check){
            console.log('into check')
            const data = products.filter(product =>{
                if(product.uid === uid){
                    if(product.count === 1 && qty === 1){
                        product.count += 0;
                        product.psize = size;
                        product.pcolor = color;
                    }else{
                        product.count += qty - 1;
                        product.psize = size;
                        product.pcolor = color;
                    }
                    return product
                }
                
            })
            this.setState({cart: [...cart,...data]})
            
        }else{
            cart.forEach(item =>{
                if(item.uid === uid){
                    if(item.count === 1 && qty === 1){
                        item.count += 0;
                        item.psize = size;
                        item.pcolor = color;
                    }else{
                        item.count += qty - 1;
                        item.psize = size;
                        item.pcolor = color;
                    }
                }
            })
            this.setState({cart: cart});
            this.getTotal();
            console.log('no check')
            console.log("The product has been added to cart.")
            
        }
    };

    reduction = (uid) =>{
        const { cart } = this.state;
        cart.forEach(item =>{
            if(item.uid === uid){
                item.count === 1 ? item.count = 1 : item.count -=1;
            }
        })
        this.setState({cart: cart});
        this.getTotal();
    };

    addproductdataurl = (id,name) =>{
        this.setState({urlid: id});
        this.setState({urlname: name});
    };

    increase = (uid) =>{
        const { cart } = this.state;
        cart.forEach(item =>{
            if(item.uid === uid){
                item.count += 1;
            }
        })
        this.setState({cart: cart});
        this.getTotal();
    };
    

    removeProduct = (uid) =>{
            const {cart} = this.state;
            cart.forEach((item, iindex) =>{
                if(item.uid === uid){
                    cart.splice(iindex, 1)
                }
            })
            this.setState({cart: cart});
            this.getTotal();
        
       
    };

    removeAll = () =>{
        const {cart} = this.state;
        cart.forEach((item, iindex) =>{
                cart.splice(iindex, 1)
        })
        this.setState({cart: []});
   
};

    getTotal = ()=>{
        const{cart} = this.state;
        const res = cart.reduce((prev, item) => {
            return prev + (item.price * item.count);
        },0)
        this.setState({total: res})
    };
    
    componentDidUpdate(){
        localStorage.setItem('dataCart', JSON.stringify(this.state.cart))
        localStorage.setItem('dataTotal', JSON.stringify(this.state.total))
    };

    componentDidMount(){
        axios
        .post('https://admin.rehamo.com/api/getproductlist', {
        })
        .then((response) => {
          //console.log(response)
  
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

            var prlist = []
  
            Product = Product.reverse()

            Product.forEach((data,index) => {
                var sizes = data.Sizes
                var sizeprices = data.Prices
                sizes.forEach((item,i) => {
                    prlist.push({data:data,id:data.ProductID,price:parseInt(sizeprices[i].price),uid:data.ProductID+item.size,count:1,psize:'normal',pcolor:'#000'})
                });
                
            });

            console.log(Product)
            console.log(prlist)
            this.setState({products:prlist})

        })
        .catch((error) => {
          console.log(error)
          //modal[0].style.display = 'none'
          //$('#loading-circle').hide();
        })
        const dataCart = JSON.parse(localStorage.getItem('dataCart'));
        if(dataCart !== null){
            this.setState({cart: dataCart});
        }
        const dataTotal = JSON.parse(localStorage.getItem('dataTotal'));
        if(dataTotal !== null){
            this.setState({total: dataTotal});
        }
    }
   

    render() {
        const {products, cart,total, urlid,urlname} = this.state;
        const {addCart,addCartQty,reduction,increase,removeProduct,addproductdataurl, removeAll,getTotal} = this;
        return (
            <DataContext.Provider 
            value={{products, addCart,addCartQty, cart,urlid,urlname, reduction,increase,removeProduct,addproductdataurl, removeAll,total,getTotal}}>
                {this.props.children}
            </DataContext.Provider>
        )
    }
}
