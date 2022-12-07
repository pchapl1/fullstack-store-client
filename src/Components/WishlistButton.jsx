import Button from 'react-bootstrap/Button';

import { useState } from "react";



const WishlistButton = (props) => {

    const { product, urlEndpoint, user } = props

    const [wishlist, setWishlists] = useState([])

    const handleAddToWishlist = async () => {
        console.log('adding to wishlist')
        // console.log(product)

        const response = await fetch(`${urlEndpoint}/user/add-to-wishlist/${user.id}`, {
            method: 'PUT',
            body: JSON.stringify({
                product
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const result = await response.json()
        console.log(result)
        
        
    }
    return (

        <div className="wishlist-button">
            <Button onClick={handleAddToWishlist} className='btn btn-sm'>Add to wishlist</Button>
        </div>
    )
}


export default WishlistButton;