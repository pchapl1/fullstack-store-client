import { useState } from "react";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Container from "react-bootstrap/esm/Container";


const ProductTable = (props)=> {

    const { products, removeFromWishlist } = props;

    
    const handleRemoveProduct = (e, index)=> {
        removeFromWishlist(index)
    }

    return (
        <div>
            <Container>
                <Table striped bordered hover>
                    <tbody>
                        {products.map((product, index)=>{
                            return <tr className="cart-row" key={index}>
                                <td className="cart-row-1">
                                    <img src={product.image} alt="" />
                                    <p>{product.title}</p>
                                </td>
                                <td>
                                    <p className="cart-description">{product.description}</p>
                                    <p>category: {product.category}</p>
                                </td>
                                <td>
                                    <p>${product.price}</p>
                                    <Button onClick={e=>handleRemoveProduct(e,index)} value={product.id} >Remove from Wishlist</Button>
                                </td>
                            </tr>
                        })}
                    </tbody>
                </Table>
            </Container>
        </div>
    )
    
}

export default ProductTable;