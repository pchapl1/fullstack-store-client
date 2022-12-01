import { useState, useEffect } from 'react';
import { createBrowserRouter, RouterProvider, Redirect} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import GlobalLayout from './Layout/GlobalLayout';
import LoginPage from './Pages/LoginPage';
import RegistrationPage from './Pages/RegistrationPage';
import ProductPage from './Pages/ProductPage';
import CartPage from './Pages/CartPage';
import { useAuth } from '../src/Hooks/auth';


function App() {

  const urlEndpoint = process.env.REACT_APP_URL_ENDPOINT

  const [user, setUser] = useState('')

  const [shouldRefetch, setShouldRefetch] = useState(false)

  const auth = useAuth()

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


  const addToCart = ()=> {
    console.log('in app.js addToCart')

  }


  const router = createBrowserRouter([
    {
      path : '/',
      element : <GlobalLayout auth={auth} urlEndpoint={urlEndpoint} user={user}/>,
      children : [
        {
          path : '/',
          index : true,
          element : <ProductPage urlEndpoint={urlEndpoint} user={user} />
        },
        {
          path : 'login',
          index : true, 
          element : <LoginPage />
        }, 
        // {
        //   path : 'logout',
        //   index : true, 
        //   element : <LogoutPage />
        // }, 
        {
          path : 'registration',

          index : true,
          element : <RegistrationPage />
        },
        {
          path : 'cart',

          index : true,
          element : <CartPage auth={auth} urlEndpoint={urlEndpoint} user={user}  />
        }
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
