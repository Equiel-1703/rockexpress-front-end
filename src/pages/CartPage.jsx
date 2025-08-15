import '../styles/Cart.css'

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CartItem from '../components/CartItem';
import OrderSummary from '../components/OrderSummary';

// Importing cart placeholder functions (THIS MUST BE CHANGED TO REAL CART LOGIC LATER)
import { addToCart, removeFromCart, getCart } from '../placeholders/cart';
import products from "../placeholders/products";

export default function CartPage() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState(getCart());

  const handleRemoveItem = id => {
    // Call API to remove cart item from DB
    removeFromCart(id);

    const newCartItems = cartItems.filter(item => item.product_id !== id);

    setCartItems(newCartItems);
  };

  if (cartItems.length < 1) {
    return (
      <div className="empty-cart">
        <h3>Seu carrinho está vazio.</h3>
        <p>Adicione produtos para vê-los aqui.</p>
      </div>
    );
  }

  // Here we are obtaining the products from each cart item
  // In the final application, this data will come from the backend API
  const cartProducts = cartItems.map((item) => {
    const product = products.find((p) => p.id === item.product_id);
    return {
      product,
      quantity: item.quantity,
    };
  }
  );

  // Calculate total price
  const totalPrice = cartProducts.reduce((total, item) => total + (item.product.price * item.quantity), 0);

  return (
    <div className="container">
      <main className="main-content">
        <div className="cart-header">
          <h1>Carrinho</h1>
          <p>
            Deseja ver mais produtos? <a href="#" onClick={(e) => { e.preventDefault(); navigate('/') }}>Continue comprando</a>
          </p>
        </div>

        <div className="cart-grid">
          <div className="cart-items-container">
            {<div>
              {cartProducts.map(({ product, quantity }) => (
                <CartItem key={product.id} item={product} quantity={quantity} onRemove={handleRemoveItem} />
              ))}
            </div>
            }
          </div>

          <div className="order-summary-container">
            <OrderSummary total={totalPrice} />
          </div>
        </div>
      </main >
    </div >
  );
}
