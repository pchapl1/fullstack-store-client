import React from "react";
import { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';



const ProductCard = (props) => {
    console.log('hadfkjaklsdfjasjdfljasldfj')
    const { product } = props
    console.log(product)

    const { title, rating, price, image, id, description, category} = product

    return (
        <div className="product-card">
            <Card style={{ width: '18rem' }}>
            <Card.Img variant="top"  />
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>
                    {description}
                </Card.Text>

            </Card.Body>
            </Card>
        </div>
    )
}

export default ProductCard;