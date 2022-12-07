import React, { useEffect, useState } from "react";
import { useAuth } from "../Hooks/auth";
import OrderFigure from "../Components/OrderFigure";

const OrderPage = (props)=> {

    const { user,  urlEndpoint,  } = props
    const [orders, setOrders] = useState([])
    // const [shouldRefetch, setShouldRefetch] = useState(false)


    useEffect(()=>{

        if (user.id !== undefined) {
          console.log('hererererer')
    
    
          const fetchOrders = async ()=> {
            
            //   setShouldRefetch(true)
              const response = await fetch(`${urlEndpoint}/user/orders/${user.id}`)
      
              const result = await response.json()
    
              setOrders(result.orders)
    
            //   setShouldRefetch(false)
    
          }
          fetchOrders()
      }
    
      }, [user.id])
    // useEffect(()=> {

    //     if (orders.length !== 0) {

    //         setUserOrders(orders)

    //     }
    // }, [orders])

    return (
        <div className="order-page">
            <h3 className="text-center mt-3">My Orders</h3>
            {
                orders.map((order, index)=> {
                    return <OrderFigure key={index} order={order} />
                })
            }

        </div>
    )
}

export default OrderPage;