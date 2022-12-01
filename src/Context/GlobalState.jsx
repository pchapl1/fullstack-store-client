import { useState, useEffect } from "react";
import Store from "./StoreContext";

const GlobalState = (props) => {
    const [cart, setCart] = useState([])
    const [loggedUser, setLoggedUser] = useState()

    const {user} = props
    console.log(user)
    useEffect(()=> {

    }, [user])

    console.log(loggedUser)
    return (
        // <div className="global-state"></div>
        <Store.Provider value={{
            cart: cart,
        }}

        >{props.children}
        </Store.Provider>

    )
}

export default GlobalState;