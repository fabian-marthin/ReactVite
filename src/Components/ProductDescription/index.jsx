import React from 'react'

import { XMarkIcon } from '@heroicons/react/24/solid'
import { ShoppingCartContext } from "../../Context/index.jsx"

import './style.css'


const ProductDescription = () => {
    const context = React.useContext(ShoppingCartContext)

    return(
        <aside className={`${context.isProductOpen ? 'productDescription' : 'closeDescription'} `}>
           <div>
                <p 
                    className='cerrar'
                    onClick={() => context.clIsProduct()}
                >
                    <XMarkIcon/>
                </p>
                <h1>{context.producto.title}</h1>
                <h3>
                    <img src={context.producto.images[0]}></img>
                    <span>{context.producto.description}</span>
                </h3>
           </div>
        </aside>
    )
}

export default ProductDescription