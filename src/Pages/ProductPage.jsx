import React from "react";
import { useState, useEffect } from "react";
import ProductCard from '../Components/ProductCard';



const ProductPage = (props) => {

    const [products, setProducts] = useState([])
    const {urlEndpoint} = props

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
            <h2>Product Page</h2>
            {products.map((product, index)=> {
                return <ProductCard key={index} product={product}/>
            })}
        </div>
    )
}

export default ProductPage;