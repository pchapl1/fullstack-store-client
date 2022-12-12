import React, { useEffect } from "react";
import { useState } from "react";
import ProductTable from "../Components/ProductTable";
import Table from 'react-bootstrap/Table';


const WishlistPage = (props)=> {

    const { user, urlEndpoint, removeFromWishlist, shouldRefetch } = props

    const [ wishlist, setWishlist ] = useState([])


    useEffect(()=> {

        if (user) {
            const fetchWishlist = async ()=> {

                const response = await fetch(`${urlEndpoint}/user/wishlist/${user.id}`)
        
                const userWishlist = await response.json()

                setWishlist(userWishlist.wishlist)
            }

            fetchWishlist()
        }
    }, [user, shouldRefetch])

    return (
        <div className="wishlist-page">
            <h3>My Wishlist</h3>
            <ProductTable products={wishlist} removeFromWishlist={removeFromWishlist} shouldRetch={shouldRefetch} />            
        </div>
    )
}

export default WishlistPage;