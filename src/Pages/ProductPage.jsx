import React from "react";
import { useState, useEffect } from "react";
import ProductCard from '../Components/ProductCard';
import SearchBar from "../Components/SearchBar";
import Container from 'react-bootstrap/Container';
import CategoriesBar from "../Components/CategoriesBar";




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
            {/* <CategoriesBar /> */}
            <Container>
            <h2 className="text-center m-3">Products</h2>
            <div className="top-section d-flex justify-content-between">
                {/* <SearchBar urlEndpoint={urlEndpoint} /> */}
            </div> 
            <div className="product-container">
            {products.map((product, index)=> {
                return <ProductCard key={index} product={product} addToCart={addToCart} user={user} urlEndpoint={urlEndpoint} />
            })}
            </div>

            </Container>

        </div>
    )
}

export default ProductPage;