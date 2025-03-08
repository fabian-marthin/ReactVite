import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  XMarkIcon,
  TrashIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/24/solid";
import { ShoppingCartContext } from "../../Context/index.jsx";
import { totalPrice } from "../Utils/index.jsx";
import "./style.css";

const CheckOutMenu = () => {
  const context = useContext(ShoppingCartContext);
  const fecha = new Date().toLocaleDateString();

  // Inicializar cantidades si no existen
  useEffect(() => {
    const nuevasCantidades = {};
    context.productAddMenuId.forEach((producto) => {
      if (!context.cantidades[producto.id]) {
        nuevasCantidades[producto.id] = 1;
      }
    });

    if (Object.keys(nuevasCantidades).length > 0) {
      context.setCantidades((prev) => ({ ...prev, ...nuevasCantidades }));
    }
  }, [context.productAddMenuId]); // Solo se ejecuta cuando cambia la lista de productos

  const borrarItem = (idEliminar) => {
    const nuevosProductos = context.productAddMenuId.filter(
      (producto) => producto.id !== idEliminar
    );
    context.setProductAddMenuId(nuevosProductos);

    // Elimina la cantidad del producto eliminado
    context.setCantidades((prev) => {
      const updated = { ...prev };
      delete updated[idEliminar];
      return updated;
    });
  };

  const listaCompras = () => {
    const adicionarOrden = {
      fecha: fecha,
      producto: context.productAddMenuId,
      cantidad: context.productAddMenuId.length,
      precioTotal: totalPrice(context.productAddMenuId, context.cantidades),
      cantidades: context.cantidades,
    };
    context.setOrder([...context.order, adicionarOrden]);
    context.setProductAddMenuId([]);
    context.clIsCheckoutMenu();
    context.abrirCerrarChecout();
    context.setCantidades({}); // Resetear cantidades al hacer checkout
  };

  const actualizarCantidad = (id, cantidad) => {
    context.setCantidades((prev) => ({
      ...prev,
      [id]: Math.max(1, cantidad), // Evita valores menores a 1
    }));
  };

  return (
    <aside className={`${context.isCheckoutOpen ? "checkoutMenu" : "closeMenu"} `}>
      <div className="contenedorCheck">
        <p className="cerrar" onClick={() => context.clIsCheckoutMenu()}>
          <XMarkIcon />
        </p>

        <ul>
          {context.productAddMenuId.map((producto, index) => {
            const uniqueKey = producto.id || `producto-${index}`;
            const cantidadActual = context.cantidades[producto.id] ?? 1; // Si no existe, inicia en 1

            return (
              <li key={uniqueKey} className="itemCheck">
                <img src={producto.images} alt={producto.title} />
                <div className="datos">
                  <div className="botones">
                    <ChevronDoubleLeftIcon
                      onClick={() => actualizarCantidad(producto.id, cantidadActual - 1)}
                      className="unidades"
                    />
                    <p>{cantidadActual}</p>
                    <ChevronDoubleRightIcon
                      onClick={() => actualizarCantidad(producto.id, cantidadActual + 1)}
                      className="unidades"
                    />
                    <TrashIcon onClick={() => borrarItem(producto.id)} className="borrar" />
                  </div>

                  <h2>{producto.title}</h2>
                  <p className="precio">${producto.price * cantidadActual}</p>
                </div>
              </li>
            );
          })}
        </ul>

        <div className="contenedorTotal">
          <span className="total">Total:</span>
          <span className="totalResult">
            ${totalPrice(context.productAddMenuId, context.cantidades)}
          </span>
        </div>

        <Link to={"/my-orders"}>
          <button
            className="checkOut"
            onClick={() => {
              if (context.productAddMenuId.length > 0) {
                listaCompras();
              } else {
                alert("No hay productos que guardar");
              }
            }}
          >
            Checkout
          </button>
        </Link>
      </div>
    </aside>
  );
};

export default CheckOutMenu;


