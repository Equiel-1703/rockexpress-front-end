import '../styles/ProductCard.css';

import { useNavigate, Link } from 'react-router-dom';
import NumberFormatter from '../utils/NumberFormatter';

// Importing cart placeholder functions (THIS MUST BE CHANGED TO REAL CART LOGIC LATER)
import { addToCart } from '../placeholders/cart';

export default function ProductCard({ product }) {
  const handleAddToCart = () => {
    addToCart(product.id, 1);
    // Show a success message
    alert(`Produto '${product.name}' adicionado ao carrinho!`);
  };

  return (
    <div className="product-card">
      <Link to={`/produto/${product.id}`} className="unstyled-link">
        <img src={product.images[0]} alt={product.name} className="product-img" />
        <h3>{product.name}</h3>
      </Link>
      <p>R$ {NumberFormatter.format(product.price)}</p>
      <button onClick={handleAddToCart}>Adicionar ao carrinho</button>
    </div>
  );
}
