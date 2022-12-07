import { useEffect, useState } from "react";
import Table from 'react-bootstrap/Table';
import Container from "react-bootstrap/esm/Container";




const OrderFigure = (props) => {

    const {order} = props

    // console.log(order)



    return (
        <div className="order-figure">
            <Container>
                <div className="my-orders m-5">

                    <div className="order-header">
                        <h6>Order Date: {order.orderDate}</h6>
                        <p>Order Total: ${order.total}</p>
                    </div>
                    {
                        order.items.map((product, index)=>{
                            return (
                                <div key={index} className="order-info border border-outline-white m-2 ">
                                    <div className="image-and-title d-flex ">
                                        <img className="order-image" src={product.image}  alt="" />
                                        <p className="m-auto p-2">- {product.title}</p>
                                    </div>
                                    <div className="price">
                                        <p className="m-auto p-2">Price: ${product.price}</p>
                                    </div>
                                </div>
                            )

                        })
                    }

                </div>
            </Container>
        </div>
    )
} 

export default OrderFigure;