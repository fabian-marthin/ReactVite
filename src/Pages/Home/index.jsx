import React from "react";
import { useParams } from "react-router-dom";
import Layout from "../../Components/Layout";
import Card from "../../Components/Card";
import ProductDescription from "../../Components/ProductDescription";
import CheckOutMenu from "../../Components/CheckOutMenu";

import { ShoppingCartContext } from "../../Context/index.jsx";

function Home() {
  const context = React.useContext(ShoppingCartContext);

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
      {context.resultados?.map((item) => (
        <Card key={item.id} data={item} />
      ))}
        <ProductDescription />
        <CheckOutMenu />
      </Layout>
    </aside>
  );
}

export default Home;
