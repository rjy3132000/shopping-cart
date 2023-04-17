import React from 'react'
import { CartState } from "../context/context"
import SingleProducts from './SingleProducts';
import "../assets/css/Home.css";
import Filters from './Filters';

function Home() {

  let { state: { products } } = CartState();

  let { productstate : { byStock, byFastDelivery, sort, byRating, searchQuery } } = CartState();

  let transformProducts = () => {
    let sortedProducts = products;

    if(sort) {
      sortedProducts = sortedProducts.sort((a,b) =>
        sort === "lowToHigh" ? a.price - b.price : b.price - a.price      
      )
    }

    if(!byStock) {
      sortedProducts = sortedProducts.filter((prod) => prod.inStock);
    }

    if(byFastDelivery) {
      sortedProducts = sortedProducts.filter((prod) => prod.fastDelivery);
    }

    if(byRating) {
      sortedProducts = sortedProducts.filter((prod) => prod.ratings >= byRating);
    }


    if(searchQuery) {
      sortedProducts = sortedProducts.filter((prod) => prod.name.toLowerCase().includes(searchQuery));
    }

    return sortedProducts;
  }

  return (
    <div className='home'>
      <Filters />
      <div className="productContainer">
        {
          transformProducts().map((prod, i) => {
            return <SingleProducts prod = {prod} key={prod.id}/>
          })
        }
      </div>
    </div>
  )
}

export default Home