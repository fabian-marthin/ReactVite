import { useRoutes, BrowserRouter } from 'react-router-dom';

import Navbar from "../../Components/Navbar/index.jsx";
import { ShoppingCardProvider } from '../../Context/index.jsx';

import Home from "../Home/index.jsx";
import MyOrder from "../MyOrder/index.jsx";
import MyOrders from "../MyOrders/index.jsx";
import NotFound from "../NotFound/index.jsx";
import "./App.css";

const AppRoutes = () => {
  let routes = useRoutes([
    { path: "/", element: <Home /> },
    { path: "/:category", element: <Home /> }, // 🔹 Ruta dinámica para categorías
    { path: "/my-orders", element: <MyOrders /> },
    { path: "/my-order/:orderId", element: <MyOrder /> },
    { path: "/my-order", element: <MyOrder /> },
    { path: "/not-found", element: <NotFound /> },
  ]);

  return routes;
};

const App = () => {
  return (
    <ShoppingCardProvider>
      <BrowserRouter>
        <AppRoutes />
        <Navbar />
      </BrowserRouter>
    </ShoppingCardProvider>
  );
};

export default App;
