import React from "react";
import { useState } from "react";
import ProductCard from "../Components/ProductCard";


const urlEndpoint = process.env.REACT_APP_URL_ENDPOINT;


const ProductPage = (props) => {

    const fetchProducts = async ()=> {
        
        const url = `${urlEndpoint}/user/products/all`;

        const response = await fetch(url)

        const productsResult = await response.json()

        const products = productsResult.products

        console.log(products)

        

    }
    const products = fetchProducts()

    return (
        <div className="product-page">
            <h2>Product Page</h2>
            {products.map((product, index)=> {
                <ProductCard key={index} product={product} />
            })}
        </div>
    )
}

export default ProductPage;