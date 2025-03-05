import React from "react"
import { ShoppingCartContext } from "../../Context/index.jsx"
import { XMarkIcon, CheckIcon } from '@heroicons/react/24/solid'
import "./card.css"

const Card = ( {data} ) => {
    const context = React.useContext(ShoppingCartContext)

    const mostrarProducto = () => {
        context.opIsProduct()
        context.setProducto(data)
        context.clIsCheckoutMenu()
    }

    const addProduct = () => {
       
        const newProducts = [...context.productAddMenuId]
        newProducts.push(
            {
                id:data.id,
                title:data.title,
                images:data.images[0],
                descripction:data.descripction,
                price:data.price
            }
        )
        context.setProductAddMenuId(newProducts)
        context.clIsProduct()
    }

    const renderIcon = (id) => {

        const isInCard = context.productAddMenuId.filter(product => product.id === id).length > 0

        if (!isInCard) {
            return(
                <XMarkIcon  
                        className="add-button"
                        onClick={ () => addProduct() }  
                    >
                </XMarkIcon>
            )
        }else{
            return(
                <CheckIcon className="check"></CheckIcon>
            )
        }
    }

    return ( 
        <div className='card'>
            <div className="card-img-container">

                {renderIcon(data.id)}
                
                <img 
                    src={data.images[0]} 
                    className="card-img"
                    onClick={() => mostrarProducto()}
                />
            </div>
            <div className="card-info">
                <span className="card-category">Categoría: {data.category.name}</span>
                <h6 className="card-title">{data.title}</h6>
                <p className="card-description">
                    {data.descripction}
                </p>
                <span className="card-price">${data.price}</span>
            </div>
        </div>
    )
}
export default Card