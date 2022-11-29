import NavBar from "../Components/NavBar";
import { Outlet } from "react-router";
import { useAuth } from "../Hooks/auth";
import { useEffect, useState } from "react";


const GlobalLayout = (props) => {

    const {urlEndpoint} = props

    const auth = useAuth()

    console.log(auth.userEmail)

    const url = `${urlEndpoint}/user/get-cart/${auth.userEmail}`;
    
    const [cartLength, setCartLength] = useState('')
    
    
    const getUserCart = async ()=> {
        

      const response = await fetch(url)
    

      const userCart = await response.json()
        
      setCartLength(userCart.user.cart.length)
      console.log(cartLength)
      return cartLength
    }

    useEffect(()=>{
        getUserCart()
    }, [])

    return (
        <div className="global-layout">
            <NavBar urlEndpoint={urlEndpoint} userCartLength={cartLength} />
            <Outlet />
        </div>
    )
}

export default GlobalLayout;