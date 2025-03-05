import React from "react";
import Layout from "../../Components/Layout";
import { ShoppingCartContext } from "../../Context/index.jsx";
import CheckOutMenu from "../../Components/CheckOutMenu";
import { useParams } from "react-router-dom";

import "./myOrder.css";

const MyOrder = () => {
  const context = React.useContext(ShoppingCartContext);
  const { orderId } = useParams();
  const orderIndex = parseInt(orderId, 10);
  const selectOrder = context.order[orderIndex];

  const productosAMostrar = () => {
    if (!selectOrder) {
      return <p>No se encontró la orden</p>;
    }

    return (
      <div className="containedorDeProductos">
        {selectOrder.producto.map((producto) => (
          <div className="productoCheck" key={producto.id}>
            {console.log(producto)}
            <img className="imagenProducto" src={producto.images} alt={producto.title} />
            <h2 className="titulo">{producto.title}</h2>
            <p>Unidades: {selectOrder.cantidades[producto.id]}</p>
            <p>C/U: ${producto.price}</p>
            <p className="precio">${producto.price*selectOrder.cantidades[producto.id]}</p>
          </div>
        ))}
      </div>
    );
  };

  return (
    <Layout>
      <div>{productosAMostrar()}</div>
      <CheckOutMenu />
    </Layout>
  );
};

export default MyOrder;


