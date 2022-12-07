import { useEffect } from "react";
import { useState } from "react";
import Button from 'react-bootstrap/Button';
import { Navigate, useNavigate } from "react-router";


const CheckoutCart = (props) => {

    const {user, cart, urlEndpoint, shouldRefetch, setShouldRefetch } = props

    const [total, setTotal] = useState(0)

    const navigate = useNavigate()

    useEffect(()=> {
        const getTotal = ()=> {
            let cartTotal = 0
            cart.map((item, index)=> {
                cartTotal += item.price
            })
            cartTotal = cartTotal.toFixed(2)
            setTotal(cartTotal)
        }

        getTotal()
    }, [cart])


    const handleCheckout = async () => {
        console.log('checking out')

        const reponse = await fetch(`${urlEndpoint}/user/checkout/${user.id}/${total}` )

        setShouldRefetch(true)
        const result = await reponse.json()
        setShouldRefetch(false)
        console.log(result)



        navigate('/')
    }

    return (
        <div className="checkout-cart border border-dark m-2">
            <h6>Total: ${total}</h6>
            <Button onClick={handleCheckout} className="btn btn-sm btn-outline-light ">Checkout</Button>
        </div>
    )
}


export default CheckoutCart;