import React from "react";
import { NavLink } from "react-router-dom";
import { ShoppingBagIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";

import { ShoppingCartContext } from "../../Context";
import "./navbar.css";

const Navbar = () => {
  const context = React.useContext(ShoppingCartContext);

  const toggleMenu = () => {
    context.setMenuOpen(!context.menuOpen);
  };

  return (
    <header className="navbar-container">
      <nav className="navbar">
        <div className="logo">Martin</div>

        {/* Categorías visibles en pantallas grandes */}
        <ul className="nav-links">
          {(context.categorias ?? []).map((item, index) => (
            <li 
                key={index}
                onClick={()=> console.log("hola ", item)}  
            >
              {item}
            </li>
          ))}
        </ul>

        {/* Enlaces de navegación */}
        <ul className="nav-links">
          <li><NavLink to="/">Home</NavLink></li>
          <li><NavLink to="/my-orders">My Orders</NavLink></li>
          <li onClick={context.abrirCerrarChecout} className="cart">
            <ShoppingBagIcon className="icon" /> {context.productAddMenuId.length}
          </li>
        </ul>

        {/* Icono del menú hamburguesa (solo visible en pantallas pequeñas) */}
        <button className="menu-icon" onClick={toggleMenu}>
          {context.menuOpen ? <XMarkIcon className="icon" /> : <Bars3Icon className="icon" />}
        </button>
      </nav>

      {/* Menú móvil desplegable */}
      <div className={`mobile-menu ${context.menuOpen ? "open" : ""}`}>
        <ul>
          {/* Categorías en menú móvil */}
          <div>
            <ul className="nav-links-hamb">
                {(context.categorias ?? []).map((item, index) => (
                    <li 
                        key={index}
                        onClick={()=> console.log("hola ", item)}    
                    >
                    {item}
                    </li>
                ))}
            </ul>
          </div>

          {/* Enlaces de navegación en menú móvil */}
          <div>
            <li><NavLink to="/" onClick={toggleMenu}>Home</NavLink></li>
            <li><NavLink to="/my-orders" onClick={toggleMenu}>My Orders</NavLink></li>
            <li onClick={context.abrirCerrarChecout} className="cart">
              <ShoppingBagIcon className="icon" /> {context.productAddMenuId.length}
            </li>
          </div>
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
