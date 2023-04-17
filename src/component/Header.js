import React from 'react'
import { Link } from "react-router-dom"
import { Badge, Button, Container, Dropdown, FormControl, Nav, Navbar } from 'react-bootstrap'
import { FaShoppingCart } from "react-icons/fa"
import { CartState } from '../context/context'
import { AiFillDelete } from 'react-icons/ai'

function Header() {

    let {
        state: { cart },
        dispatch,
        productDispatch,
    } = CartState()



    return (
        <Navbar bg='dark' variant='dark' style={{ height: 80 }}>
            <Container>
                <Navbar.Brand> <Link to="/">Shopping Cart</Link> </Navbar.Brand>
                <Navbar.Text className='search'>
                    <FormControl style={{ width: 500 }} placeholder="Search a Product" className='m-auto' onChange={(e) => {
                        productDispatch({
                            type: "FILTER_BY_SEARCH",
                            payload: e.target.value,
                        })
                    }} />
                </Navbar.Text>
                <Nav>
                    <Dropdown align={"end"}>
                        <Dropdown.Toggle>
                            <FaShoppingCart color="White" fontSize="25px" />
                            <Badge>{cart.length}</Badge>
                        </Dropdown.Toggle>

                        <Dropdown.Menu style={{ minWidth: 370 }}>

                            {
                                cart.length > 0 ? (
                                    <>
                                        {
                                            cart.map((prod, i) => (
                                                <span className='cartitem' key={prod.id}>
                                                    <img src={prod.image} alt={prod.image} className="cartItemImg" />
                                                    <div className='cartIemDetail'>
                                                        <span>{prod.name}</span>
                                                        <span>₹ {prod.price.split(".")[0]}</span>
                                                    </div>
                                                    <AiFillDelete fontSize={"20px"} style={{ cursor: "pointer" }}
                                                        onClick={() => {
                                                            dispatch({
                                                                type: "REMOVE_TO_CART",
                                                                payload: prod
                                                            })
                                                        }} />
                                                </span>
                                            ))
                                        }
                                        <Link to="/cart"><Button style={{ width: "95%", margin: "0 10px" }}>Go To Cart</Button></Link>
                                    </>
                                ) : (
                                    <>
                                        <span style={{ padding: 10 }}>Card is Empty..!</span>
                                    </>
                                )
                            }




                        </Dropdown.Menu>
                    </Dropdown>
                </Nav>
            </Container>
        </Navbar>
    )
}

export default Header