import React from 'react'
import Layout from "../../Components/Layout"
import { ShoppingCartContext } from "../../Context/index.jsx"
import CheckOutMenu from "../../Components/CheckOutMenu"

import { CalendarDaysIcon, ShoppingBagIcon, CurrencyDollarIcon } from '@heroicons/react/24/solid'

import { Link } from 'react-router-dom'

import "./myOrders.css"

const MyOrders = () => {
  const context = React.useContext(ShoppingCartContext)

  console.log(context.order)

  const productosAMostrar = () => {
    if (context.order.length > 0) {
      return (
        <div className='contenedorDeProductos'>
          {context.order.map((orden, index) => (
            
            <Link key={index} to={`/my-order/${index}`}>
              <div  className='ordenCheck'>
                <div className='botonOrden'>
                  <h2>Orden {index + 1 }</h2>
                  <div>
                    <p> <CalendarDaysIcon/> {orden.fecha}</p>
                    <p> <ShoppingBagIcon/> {orden.cantidad}</p>
                    <p> <CurrencyDollarIcon/> {orden.precioTotal} </p>
                  </div>
                </div>
              </div>
            </Link>

          ))}
        </div>
      );
    } else {
      return (
        <div>
          <p>No tenemos órdenes</p>;
          <div className="spinner-container">
            <div className="spinner"></div>
            <p className="loading-text">Esperando órdenes...</p>
          </div>
        </div>
        
      )
    }
  }

  return (
    <Layout>
      <div >
        {productosAMostrar()}
      </div>
      <CheckOutMenu/> 
    </Layout>
  )
}

export default MyOrders

  