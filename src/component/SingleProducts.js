import React from 'react'
import { Button, Card } from 'react-bootstrap'
import { CartState } from '../context/context'
import Rating from './Rating'

function SingleProducts({ prod }) {

    let { 
        state: { cart },
        dispatch,
    } = CartState()

  
  return (
    <div className='products'>
        <Card>
            <Card.Img variant='top' src={prod ? prod.image: "https://images.unsplash.com/photo-1662483763183-25b1b7868682?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=636&q=80"} alt={prod? prod.image : "default img"}/>
            <Card.Body>
                <Card.Title>{prod ? prod.name : "No title found"}</Card.Title>
                <Card.Subtitle style={{ paddingBottom: 10 }}>
                    <span>₹ {prod.price ? prod.price.split(".")[0] : "No price found"}</span>
                    {
                        prod.fastDelivery ? <div>Fast Delivery</div> : <div>4 days Delivery</div>
                    }
                    <Rating rating={prod ? prod.ratings : "No rating found"}/>
                </Card.Subtitle>
                {
                    cart.some((p) => p.id === prod.id) 
                    ?
                    (<Button onClick={()=> {
                        dispatch({
                            type : "REMOVE_TO_CART",
                            payload : prod,
                        })
                    }} variant='danger'>Remove from Cart</Button>) 
                    :
                    (<Button onClick={() => {
                       dispatch({
                        type : "ADD_TO_CART",
                        payload : prod,
                       }) 
                    }} disabled={!prod.inStock}>{ !prod.inStock ? "Out of Stock" : "Add to Cart"  }</Button>)
                }
                
                
            </Card.Body>
        </Card>
    </div>
  )
}

export default SingleProducts