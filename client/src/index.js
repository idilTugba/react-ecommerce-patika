import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter,RouterProvider} from "react-router-dom";
import ErrorPage from "./error-page";
import Products from "./pages/products/";
import ProductDetail from "./pages/products/detail.js";
import Signin from "./pages/signin/";
import Signup from "./pages/signup/";
import Profile from "./pages/profile/";
import Admin from "./pages/admin/";
import AdminProfile from "./pages/admin/profile.js";
import AdminProduct from "./pages/admin/products.js";
import ProductEdit from "./pages/admin/productedit.js";
import ProductNew from "./pages/admin/newproduct.js";
import AdminOrder from "./pages/admin/orders.js";
import Basket from "./pages/basket/";
import Error from "./pages/Error/";
import Order from "./pages/basket/order";
import Complated from "./pages/basket/done";
import ProtectedRoutes from "./components/utils/protectedRoutes";
import { ChakraProvider } from '@chakra-ui/react'
import { ReactQueryDevtools } from 'react-query/devtools'

import {
  QueryClient,
  QueryClientProvider,
} from 'react-query'


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "products",
        element: <Products/>,
      },
      {
        path: "products/:productId",
        element: <ProductDetail/>,
      },
      {
        path: "signin",
        element: <Signin/>,
      },
      {
        path: "profile",
        // element: <Profile/>,
        element: <ProtectedRoutes> <Profile/> </ProtectedRoutes>,
      },
      {
        path: "admin",
        // element: <Profile/>,
        element: <ProtectedRoutes admin={true}> <Admin/> </ProtectedRoutes>,
        children: [
          {
            path: "profile",
            element: <AdminProfile/>,
          },
          {
            path: "product",
            element: <AdminProduct/>,
          },
          {
            path: "product/:productId",
            element: <ProductEdit/>
          },
          {
            path: "product/new",
            element: <ProductNew/>
          },
          {
            path: "order",
            element: <AdminOrder/>,
          },
        ]
      },
      {
        path: "signup",
        element: <Signup/>,
      },
      {
        path: "basket",
        element: <Basket/>,
        children: [
          {
            path: "order",
            element: <Order/>
          },
          {
            path: "done",
            element: <Complated/>
          },
        ],
      },
      {
        path: "*",
        element: <Error/>,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: false,
      refetchOnWindowFocus: false
    }
  }
})

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <RouterProvider router={router}/>
      </ChakraProvider>
      <ReactQueryDevtools initialIsOpen={false} />
     </QueryClientProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
