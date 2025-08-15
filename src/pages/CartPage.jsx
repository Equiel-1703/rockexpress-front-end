// Importing cart placeholder functions (THIS MUST BE CHANGED TO REAL CART LOGIC LATER)
import { addToCart, removeFromCart, getCart } from '../placeholders/cart';

export default function CartPage() {
  return (
    <div className="p-6">
      {
        (getCart()).map(item => (
          <p key={item.product_id}>
            Product ID: {item.product_id}, Quantity: {item.quantity}
          </p>
        ))
      }
    </div>
  );
}
