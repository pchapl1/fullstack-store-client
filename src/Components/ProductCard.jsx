import React from "react";
import { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import QtyPicker from "./QtyPicker";
import WishlistButton from "./WishlistButton";



const ProductCard = (props) => {
    
    const { product, user, urlEndpoint, addToCart } = props
    
    const { title, rating, price, image, id, description, category} = product

    const [desc, setDesc] = useState(description)
    
    // const [ productToAdd, setProductToAdd] = useState('')
    
    const handleAddToCart = async ()=> {
        addToCart(product)
    }

    // truncate description
    useEffect(()=>{
        const truncateDescription = () => {
            let len = 75
            let truncatedDescription = description.slice(0, len) + ' ...'
            setDesc(truncatedDescription)
        }

        truncateDescription()
    }, [])



    

    return (
        <div className="product-card">
            <Card style={{ width: '18rem', height: '25' }}>
            <Card.Img variant="top" src={image} />
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Subtitle className="text-muted">category: {category}</Card.Subtitle>
                <Card.Text>{desc}</Card.Text>   
                <div className="price-and-rating">
                    <p>${price}</p>
                    <p>Rating: {rating.rate} <span className="ratings text-muted">{rating.count} ratings</span></p>
                </div>
                <div className="buttons">
                    <Button onClick={handleAddToCart} className="btn btn-sm btn-dark">Add to Cart</Button>
                    <WishlistButton product={product} urlEndpoint={urlEndpoint} user={user} />
                </div>
            
            </Card.Body>
            <Card.Footer>
            </Card.Footer>
            </Card>
        </div>
    )
}

export default ProductCard;