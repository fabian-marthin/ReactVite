import { createContext, useState, useEffect } from "react";

export const ShoppingCartContext = createContext();

export const ShoppingCardProvider = ({ children }) => {
    /* Items */
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetch("https://api.escuelajs.co/api/v1/products")
            .then((response) => response.json())
            .then((data) => setItems(data));
    }, []);

    /* Productos adicionados para el menú */
    const [productAddMenuId, setProductAddMenuId] = useState([]);

    /* Abrir y cerrar Product Detail */
    const [isProductOpen, setIsProductOpen] = useState(false);
    const opIsProduct = () => setIsProductOpen(true);
    const clIsProduct = () => setIsProductOpen(false);

    /* Abrir y cerrar Checkout menu */
    const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
    const abrirCerrarChecout = () => {
        setIsCheckoutOpen((prev) => !prev);
        setMenuOpen(false);
    };

    const opIsCheckoutMenu = () => setIsCheckoutOpen(true);
    const clIsCheckoutMenu = () => setIsCheckoutOpen(false);

    /* Descripción del producto */
    const [producto, setProducto] = useState({
        title: "",
        price: "",
        description: "",
        images: [],
    });

    /* Listado de órdenes */
    const [order, setOrder] = useState([]);

    /* Estado para manejar la cantidad de cada producto */
    const [cantidades, setCantidades] = useState({});

    /* Menú hamburguesa */
    const [menuOpen, setMenuOpen] = useState(false);

    /* Filtro de Categorías */
    const [categorias, setCategorias] = useState([]);

    useEffect(() => {
        const incluirCategorias = [
            ...new Set(items.map((producto) => producto.category?.name)),
        ];
        setCategorias(incluirCategorias);
    }, [items]);

    const [categoriaBuscar, setCategoriaBuscar] = useState(""); 
    const [categoriasYaFiltradas, setCategoriasYaFiltradas] = useState([]);

    useEffect(() => {
        if (!items || items.length === 0) return;

        const incluirCategoriasYaFiltradas =
            categoriaBuscar === ""
                ? items
                : items.filter((producto) => producto.category.name === categoriaBuscar);

        setCategoriasYaFiltradas(incluirCategoriasYaFiltradas);
    }, [categoriaBuscar, items]);

    /* Filtro de productos */
    const [filtro, setFiltro] = useState(""); 
    const [resultados, setResultados] = useState([]);

    useEffect(() => {
        if (!categoriasYaFiltradas || categoriasYaFiltradas.length === 0) return;

        const buscadorItems = categoriasYaFiltradas.filter((item) => {
            const itemText = item.title.toLowerCase() || "";
            const buscarFiltro = filtro.toLowerCase();
            return itemText.includes(buscarFiltro);
        });

        setResultados(buscadorItems);
    }, [filtro, categoriasYaFiltradas]); 

    return (
        <ShoppingCartContext.Provider
            value={{
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
                setCategoriaBuscar,
                categoriasYaFiltradas,
                setCategoriasYaFiltradas,
                resultados, // ✅ Ahora el filtro es accesible en el contexto
            }}
        >
            {children}
        </ShoppingCartContext.Provider>
    );
};