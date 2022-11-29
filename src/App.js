import { useState, useEffect } from 'react';
import { createBrowserRouter, RouterProvider, Redirect} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import GlobalLayout from './Layout/GlobalLayout';
import LoginPage from './Pages/LoginPage';
import RegistrationPage from './Pages/RegistrationPage';
import ProductPage from './Pages/ProductPage';


function App() {



  const urlEndpoint = process.env.REACT_APP_URL_ENDPOINT



  const router = createBrowserRouter([
    {
      path : '/',
      element : <GlobalLayout urlEndpoint={urlEndpoint}/>,
      children : [
        {
          path : '/',
          index : true,
          element : <ProductPage urlEndpoint={urlEndpoint}/>
        },
        {
          path : 'login',
          index : true, 
          element : <LoginPage />
        }, 
        {
          path : 'registration',

          index : true,
          element : <RegistrationPage />
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
