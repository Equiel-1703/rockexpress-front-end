import '../styles/HomePage.css';

import ProductCard from '../components/ProductCard';

// Importing mock data for products (THIS MUST BE REPLACED WITH REAL DATA LATER)
import products from '../placeholders/products';

export default function HomePage() {
  return (
    <main className="home">
      <h1>Exibindo {products.length} Produtos</h1>
      <div className="product-grid">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </main>
  );
}
