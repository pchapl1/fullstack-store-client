import React, { useEffect } from "react";
import { useState } from "react";

const WishlistPage = (props)=> {

    const { user, urlEndpoint } = props

    const [ wishlist, setWishlist ] = useState([])

    useEffect(()=> {

        if (user) {
            const fetchWishlist = async ()=> {

                const response = await fetch(`${urlEndpoint}/user/wishlist/${user.id}`)
        
                const userWishlist = await response.json()
        
                // console.log(userWishlist.wishlist)
            }

            fetchWishlist()
        }
    }, [user])

    return (
        <div className="wishlist-page">
            <h3>My Wishlist</h3>
        </div>
    )
}

export default WishlistPage;