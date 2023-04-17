import React, { createContext, useContext, useReducer } from 'react'
import { faker } from "@faker-js/faker"
import { cartReducer, productReducer } from "./reducers"


let Cart = createContext();
faker.seed(99)

function Context({ children }) {
    const products = [...Array(20)].map(()=> ({
        id : faker.datatype.uuid(),
        name : faker.commerce.productName(),
        price : faker.commerce.price(),
        image : faker.image.image(),
        inStock : faker.helpers.arrayElement([0,3,5,6,7]),
        fastDelivery : faker.datatype.boolean(),
        ratings : faker.helpers.arrayElement([1,2,3,4,5]),
    }))

    let [state, dispatch] = useReducer(cartReducer, {
      products : products,
      cart : [],
    })

    let [productstate, productDispatch] = useReducer(productReducer, {
      byStock : false,
      byFastDelivery : false,
      byRating : 0,
      searchQuery : "",
    })

  return <Cart.Provider value={{ state, dispatch, productstate, productDispatch }}>
    {children}
  </Cart.Provider>
}

export default Context


export let CartState = () => {
    return useContext(Cart)
}