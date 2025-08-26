import "../styles/HomePage.css";

import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";

// Importing mock data for products (THIS MUST BE REPLACED WITH REAL DATA LATER)
// import products from '../placeholders/products';

export default function HomePage() {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8080/produtos/listar/10`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Produtos recebidos:", data);
        setProdutos(data);
      })
      .catch(() => setProdutos(null));
  }, []);

  return (
    <main className="home">
      <h1>Exibindo {produtos.length} Produtos</h1>
      <div className="product-grid">
        {produtos.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </main>
  );
}
