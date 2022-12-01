import React from "react";
import { useState, useEffect } from "react";
import ProductCard from '../Components/ProductCard';



const ProductPage = (props) => {


    const [products, setProducts] = useState([])
    const {urlEndpoint, user, addToCart } = props

    useEffect(()=>{
        const fetchProducts = async ()=> {
        
            const url = `${urlEndpoint}/user/products/all`;
    
            const response = await fetch(url)
    
            const productsResult = await response.json()
    
            const products = productsResult.products
    
            setProducts(products)
        }
    
        fetchProducts()
    }, [])


    return (
        <div className="product-page">
            <h2 className="text-center">Product Page</h2>
            <div className="product-container">
            {products.map((product, index)=> {
                return <ProductCard key={index} product={product} addToCart={addToCart} user={user} urlEndpoint={urlEndpoint} />
            })}
            </div>

        </div>
    )
}

export default ProductPage;