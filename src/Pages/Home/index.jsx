import React from "react";
import { useParams } from "react-router-dom";
import Layout from "../../Components/Layout";
import Card from "../../Components/Card";
import ProductDescription from "../../Components/ProductDescription";
import CheckOutMenu from "../../Components/CheckOutMenu";

import { ShoppingCartContext } from "../../Context/index.jsx";

function Home() {
  const context = React.useContext(ShoppingCartContext);
  const { category } = useParams(); // Obtener la categoría desde la URL

  // Aplicar filtro por categoría
  const productosFiltrados = category
    ? (context.items ?? []).filter((item) => item.category === category)
    : context.items ?? [];

  // Aplicar filtro por búsqueda de texto
  const valorFiltro = context.filtro?.toLowerCase() ?? ""; 

  const buscadorItems = productosFiltrados.filter((item) => 
    item.title.toLowerCase().includes(valorFiltro)
  );

  /* categorias disponibles */

  const obtenerValoresUnicos = (array, clave) => {
    if (!array || !Array.isArray(array)) return []; // Validar que sea un array válido
    return [...new Set(array.map(item => item[clave]?.name).filter(Boolean))];
  };
  
  const categoriasUnicas = obtenerValoresUnicos(context.items, "category");

  if (context.categorias === undefined) {
    context.setCategorias(categoriasUnicas)
  }else if(context.categorias.length === 0){
    context.setCategorias(categoriasUnicas)
  }

  return (
    <aside>

      <div className="contenedorFiltro">
        <input
          className="filtro"
          placeholder="Busca tu producto"
          value={context.filtro}
          onChange={(event) => {
            context.setFiltro(event.target.value);
          }}
        />
      </div>

      <Layout>
        {buscadorItems.map((item) => (
          <Card key={item.id} data={item} />
        ))}
        <ProductDescription />
        <CheckOutMenu />
      </Layout>
    </aside>
  );
}

export default Home;
