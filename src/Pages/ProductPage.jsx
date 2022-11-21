import React from "react";
import { useState } from "react";



const urlEndpoint = process.env.REACT_APP_URL_ENDPOINT;


const ProductPage = (props) => {

    const fetchProducts = async ()=> {
        
        const url = `${urlEndpoint}/user/products/all`;

        const response = await fetch(url)

        const products = await response.json()

        console.log(products)

    }
    fetchProducts()

    return (
        <div className="product-page">
            <h2>Product Page</h2>
        </div>
    )
}

export default ProductPage;