import "../styles/ProductCard.css";

import { useNavigate, Link } from "react-router-dom";
import NumberFormatter from "../utils/NumberFormatter";

// Importing cart placeholder functions (THIS MUST BE CHANGED TO REAL CART LOGIC LATER)
import { addToCart } from "../placeholders/cart";

export default function ProductCard({ product }) {
  const handleAddToCart = () => {
    addToCart(product.id, 1);
    // Show a success message
    alert(`Produto '${product.name}' adicionado ao carrinho!`);
  };

  console.log("Produto recebido no ProductCard: ", product);

  return (
    <div className="product-card">
      <Link to={`/produto/${product.id}`} className="unstyled-link">
        {product.images && product.images.length > 0 ? (
          <img
            src={product.images[0]}
            alt={product.nome}
            className="product-img"
          />
        ) : (
          <div className="product-no-img"></div>
        )}
        <h3>{product.nome}</h3>
      </Link>
      <p>R$ {NumberFormatter.format(product.preco)}</p>
      <p>
        Estoque: <strong>{product.estoque > 0 ? product.estoque : "Indisponível"}</strong>
      </p>
      <button onClick={handleAddToCart}>Adicionar ao carrinho</button>
    </div>
  );
}
