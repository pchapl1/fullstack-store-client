import { useState, useEffect } from 'react';
import { createBrowserRouter, RouterProvider, Redirect} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import GlobalLayout from './Layout/GlobalLayout';
import LoginPage from './Pages/LoginPage';
import RegistrationPage from './Pages/RegistrationPage';
import ProductPage from './Pages/ProductPage';
import CartPage from './Pages/CartPage';
import ProfilePage from './Pages/ProfilePage';
import OrderPage from './Pages/OrderPage';
import WishlistPage from './Pages/WishlistPage';
import { useAuth } from '../src/Hooks/auth';



function App() {

  const urlEndpoint = process.env.REACT_APP_URL_ENDPOINT

  const [user, setUser] = useState('')

  const [shouldRefetch, setShouldRefetch] = useState(false)

  const [cartLength, setCartLength] = useState('')

  const [orders, setOrders] = useState([])


  const auth = useAuth()

  const getCartLength = ()=> {
    setCartLength(user.cart.length)
  }

  useEffect(()=>{
    const getUser = async ()=> {

      const response = await fetch(`${urlEndpoint}/user/get-user/${auth.userEmail}`)
  
      const user = await response.json()
      
      setUser(user.user)

    }
    if (auth.userEmail.length > 0) {
      
      getUser()
    }
  
  },[auth])

  useEffect(()=>{
    if (user.cart) {
      getCartLength(user.cart.length)
    }
  }, [user])




  const addToCart = async (product)=> {
    const response = await fetch(`${urlEndpoint}/user/add-to-cart/${user.id}`, {
      method: 'PUT',
      body: JSON.stringify({
          product
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const resCartLength = await response.json()
    
    setShouldRefetch(true)

    // update the cart length
    setCartLength(resCartLength.userCart)

    setShouldRefetch(false)
  }


  const removeFromCart = async (productIndex)=>{
    console.log('removing product from cart')
    setShouldRefetch(true)

    const response = await fetch(`${urlEndpoint}/user/remove-from-cart/${user.id}`, {
      method: 'PUT',
      body: JSON.stringify({
          productIndex
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const removeResponse = await response.json()

    setCartLength(removeResponse.userCart)

    setShouldRefetch(false)
  }

  const removeFromWishlist = async (productIndex)=>{
    console.log('removing product from wishlist')
    setShouldRefetch(true)

    const response = await fetch(`${urlEndpoint}/user/remove-from-wishlist/${user.id}`, {
      method: 'PUT',
      body: JSON.stringify({
          productIndex
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const removeResponse = await response.json()

    console.log(removeResponse)


    setShouldRefetch(false)
  }



  const router = createBrowserRouter([
    {
      path : '/',
      element : <GlobalLayout auth={auth} urlEndpoint={urlEndpoint} user={user} cartLength={cartLength} shouldRefetch={shouldRefetch} />,
      children : [
        {
          path : '/',
          index : true,
          element : <ProductPage urlEndpoint={urlEndpoint} user={user} addToCart={addToCart} />
        },
        {
          path : '/login',
          element : <LoginPage />
        }, 

        {
          path : 'registration',
          element : <RegistrationPage />
        },
        {
          path : 'cart',
          element : <CartPage auth={auth} urlEndpoint={urlEndpoint} user={user} removeFromCart={removeFromCart} shouldRefetch={shouldRefetch} setShouldRefetch={setShouldRefetch} />
        },
        {
          path : 'profile',
          element : <ProfilePage auth={auth} urlEndpoint={urlEndpoint} user={user} shouldRefetch={shouldRefetch} setShouldRefetch={setShouldRefetch} />
        },
        {
          path : 'orders',
          element : <OrderPage orders={orders} auth={auth} urlEndpoint={urlEndpoint} user={user} shouldRefetch={shouldRefetch} setShouldRefetch={setShouldRefetch} />
        },
        {
          path : 'wishlist',
          element : <WishlistPage removeFromWishlist={removeFromWishlist} auth={auth} urlEndpoint={urlEndpoint} user={user} shouldRefetch={shouldRefetch} setShouldRefetch={setShouldRefetch} />
        },

      ]
    }
  ])

  return (
    <div className="App">
      <header className="App-header">
          <RouterProvider router={router} />
      </header>
    </div>
  );
}

export default App;
