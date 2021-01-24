import {useState, useEffect} from "react";
import './App.css';
import Topbar from './components/Topbar';
import Navbar from './components/Navbar';
import Category from './components/Catagory';
import Product from "./components/Product";
import {Switch, Route, useHistory} from "react-router-dom";
function App() {
  const [data, setData] = useState({categories:[], imagePath:{}});
  const [isNavbarOpen, setNavbar] = useState(false);
  const [cartData, setCartData] = useState([]);
  const [productPage, setProductPage] = useState({isAvailable:false, products:[]});
  const history = useHistory();
  useEffect(()=>{
    fetch('https://stg.app2food.com/menu/')
    .then(response => response.json())
    .then((jsonData)=>{
        if(jsonData.msg==="success") {
          console.log(jsonData.data)
            setData(jsonData.data);
        } else {
            console.log(jsonData);
          }
      })
      .catch((err)=>{console.log(err)});

  }, [])
  function switchNavbar(){
    setNavbar(!isNavbarOpen);
  }
  function addItemToCart(product) {
    setCartData((prev)=>{
      let productIndex = checkProductExit(product);
      if(productIndex==undefined) {
        product.addedItem = 1; 
        let data = [...prev, product];
        return data;
      } else {
        let data = [...prev];
        data[productIndex].addedItem += 1;
        return data; 
      }
    })
  }
  function changeItemCount(product, num) {
    setCartData((prev)=>{
      let productIndex = checkProductExit(product);
      if(productIndex==undefined) {
        console.log("item dose not exist");
      } else {
        let data = [...prev];
        data[productIndex].addedItem = num;
        return data; 
      }
    })
  }
  function checkProductExit (product) {
    let products = cartData;
    for(let p=0; p<products.length; p++) {
      if(products[p].store_product_id==product.store_product_id) {
          return p;
      }
    }
    return undefined;
  }
  function removeItemFromCart(product) {
    setCartData((prev)=>{
      let productIndex = checkProductExit(product);
      if(productIndex==undefined) {
        console.log("item dose not exist");
      } else {
        let data = [...prev];
        data.splice(productIndex, 1);
        return data; 
      }
    })
  }
  function gotToProduct(productData) {
    console.log(productData)
    setProductPage({isAvailable:true, products:productData});
    history.push('/product');
  }
  return (
    <div className="App">
        <div style={{flex:1}}>
          <Topbar switchNavbar={switchNavbar} isNavbarOpen={isNavbarOpen}/>
          <Switch>
          <Route path="/" exact>
            <Category isNavbarOpen={isNavbarOpen} gotToProduct={gotToProduct} categories={data.categories} imagePath={data.imagePath}/>
          </Route>
          <Route path="/product">
            <Product products={productPage.products} addItemToCart={addItemToCart}/>
          </Route>
          </Switch>
        </div>
        <div>
          <Navbar removeItemFromCart={removeItemFromCart} isNavbarOpen={isNavbarOpen} cartData={cartData} changeItemCount={changeItemCount}/>
        </div>
    </div>
  );
}

export default App;
