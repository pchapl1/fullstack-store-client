import React from "react";
import { useEffect, useState } from "react";
import { useAuth } from "../Hooks/auth";
import Table from 'react-bootstrap/Table';
import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';



const CartPage = (props)=> {

    const auth = useAuth()

    const { urlEndpoint, user } = props

    const [shouldRefetch, setShouldRefetch] = useState(false)

    const [cart, setCart] = useState([])

    const [email, setEmail] = useState("")


    // console.log(cart)

    // const handleRemoveFromCart = async ()=> {
    //     const response = await fetch(`${urlEndpoint}/todos/create-one`, {
    //         method: 'PUT',
    //         body: JSON.stringify({

    //         }),
    //         headers: {
	// 			'Content-Type': 'application/json'
	// 		}
    //     })

    // }

    // const url = `${urlEndpoint}/user/cart-page/${auth.userEmail}`;




    useEffect(()=>{
            
            setShouldRefetch(true)

            if (auth.userEmail.length > 0) {
                const fetchUserCart = async ()=> {

                    const result = await fetch(`${urlEndpoint}/user/cart-page/${auth.userEmail}`)
                
                    const userCartLoad = await result.json()
        
                    setCart(userCartLoad.user.cart)
                
                }
                
                fetchUserCart()
            }
            setShouldRefetch(false)

    
      }, [auth])

      console.log(cart)

    return (

        <div className="cart-page">
            <h3 className="cart-page">My Cart</h3>
            <Table striped bordered hover>
                <tbody>
                {cart.map((product, index)=>{
                    return <tr className="cart-row" key={index}>
                        <td className="cart-row-1">
                            <img src={product.image} alt="" />
                            <p>{product.title}</p>
                        </td>
                        <td>
                            <p className="cart-description">{product.description}</p>
                            <p>category: {product.category}</p>
                        </td>
                        <td><p>${product.price}</p></td>
                        <td><p></p></td>
                    </tr>
                
                })}
                </tbody>
            </Table>
            
        </div>
    )
}

export default CartPage;