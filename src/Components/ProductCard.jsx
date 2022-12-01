import React from "react";
import { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import QtyPicker from "./QtyPicker";



const ProductCard = (props) => {
    
    const { product, user, urlEndpoint, addToCart } = props
    
    const { title, rating, price, image, id, description, category} = product
    
    // const [ productToAdd, setProductToAdd] = useState('')
    
    const handleAddToCart = async ()=> {
        console.log('in product card add to cart')
        
        addToCart(product)


    }

    

    return (
        <div className="product-card">
            <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={image} />
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Subtitle className="text-muted">category: {category}</Card.Subtitle>
                <Card.Text>{description}</Card.Text>   
                <div className="price-and-rating">
                    <p>${price}</p>
                    <p>Rating: {rating.rate} <span className="ratings text-muted">{rating.count} ratings</span></p>
                </div>
                
            <Button onClick={handleAddToCart} className="btn btn-sm btn-dark">Add to Cart</Button>
            </Card.Body>
            <Card.Footer>
            </Card.Footer>
            </Card>
        </div>
    )
}

export default ProductCard;