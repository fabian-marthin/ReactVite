import { createContext, useState, useEffect } from "react";

export const ShoppingCartContext = createContext()

export const ShoppingCardProvider = ({children}) => {

    /* items */

    const [items, setItems] = useState(null)

    useEffect ( () => {
        fetch('https://api.escuelajs.co/api/v1/products')
          .then(response => response.json())
          .then(data => setItems(data))
    }, [])

    /* Productos adicionados para el menu */
    const [productAddMenuId, setProductAddMenuId] = useState([])

    /* Abrir y cerrar Product Detail */
    const [isProductOpen, setIsProductOpen] = useState(false)
    const opIsProduct = () => setIsProductOpen(true)
    const clIsProduct = () => setIsProductOpen(false)

    /* Abrir y cerrar Checkout menu */
    const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)

    const abrirCerrarChecout = () => {
        if (isCheckoutOpen === false) {
            setIsCheckoutOpen(true)
        }else{
            setIsCheckoutOpen(false)
        }
        setMenuOpen(false)
    }

    const opIsCheckoutMenu = () => setIsCheckoutOpen(true)
    const clIsCheckoutMenu = () => setIsCheckoutOpen(false)
    

    /* Descripción del producto */
    const [producto, setProducto] = useState({
        title: "",
        price: "",
        description: "",
        images: [],    
    })

    /* Listado de ordenes */

    const [order, setOrder] = useState([])

    // Estado para manejar la cantidad de cada producto
    const [cantidades, setCantidades] = useState({});

    /* filtro */

    const [filtro, setFiltro] = useState()

    /* Menu hamburguesa */

    const [menuOpen, setMenuOpen] = useState(false);

    /* Filtro de Categorias */

    const [categorias, setCategorias] = useState()
    const [categoriaBuscar, setCategoriaBuscar] = useState()

    return(
        <ShoppingCartContext.Provider value={{
            items,
            setItems,
            opIsProduct,
            clIsProduct,
            isProductOpen,
            producto,
            setProducto,
            isCheckoutOpen,
            setIsCheckoutOpen,
            abrirCerrarChecout,
            opIsCheckoutMenu,
            clIsCheckoutMenu,
            productAddMenuId,
            setProductAddMenuId,
            order,
            setOrder,
            cantidades,
            setCantidades,
            filtro,
            setFiltro,
            menuOpen,
            setMenuOpen,
            categorias,
            setCategorias,
            categoriaBuscar,
            setCategoriaBuscar
        }}>
            {children}
        </ShoppingCartContext.Provider>
    )
}