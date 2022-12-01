import React from "react";
import { useEffect, useState } from "react";
import { useAuth } from "../Hooks/auth";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';


const CartPage = (props)=> {

    const auth = useAuth()

    const { urlEndpoint, user, removeFromCart, shouldRefetch, setShouldRefetch } = props

    // const [shouldRefetch, setShouldRefetch] = useState(false)

    const [cart, setCart] = useState([])





    const handleRemoveProduct = (e, index)=> {
        removeFromCart(index)
    }


    useEffect(()=>{
        if (auth.userEmail.length > 0) {
            const fetchUserCart = async ()=> {

                const result = await fetch(`${urlEndpoint}/user/cart-page/${auth.userEmail}`)
            
                const userCartLoad = await result.json()
    
                setCart(userCartLoad.user.cart)
            
            }
            
            fetchUserCart()
        }


    
      }, [auth, shouldRefetch])



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
                        <td>
                            <p>${product.price}</p>

                            <Button onClick={e=>handleRemoveProduct(e,index)} value={product.id} >Remove from Cart</Button>
                            {/* <Button></Button> */}
                        </td>

                    </tr>
                
                })}
                </tbody>
            </Table>
            
        </div>
    )
}

export default CartPage;