import "../styles/CheckoutPage.css";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NumberFormatter from "../utils/NumberFormatter";

// Import cart and products placeholders (THESE MUST BE REPLACED WITH ACTUAL DB DATA LATER)
import { getCart, removeFromCart } from "../placeholders/cart";
import products from "../placeholders/products";

const Checkout = () => {
  const [cart, setCart] = useState(getCart());
  const handleRemoveFromCart = (productId) => {
    // Remove product from the cart in the DB
    // This function should be replaced with an actual API call in the final application
    removeFromCart(productId);

    const newCart = cart.filter(item => item.product_id !== productId);

    // Update the cart state
    setCart(newCart);
  };

  const navigate = useNavigate();
  const handleAddAddress = () => {
    navigate("/novo-endereco");
  };

  // Check if the cart is empty
  if (cart.length === 0) {
    return (
      <div className="checkout-empty">
        <h1>Seu carrinho está vazio</h1>
        <p>Adicione produtos ao seu carrinho para continuar com o checkout.</p>
      </div>
    );
  }

  const addresses = [
    { id: 1, title: "Endereço 1", details: "Rua Tal, número 123, Pelotas/RS", price: 10 },
    { id: 2, title: "Endereço 2", details: "Av. Central, 456, Porto Alegre/RS", price: 15 },
  ];

   const [selectedAddress, setSelectedAddress] = useState(null);

  // Here we are obtaining the products from each cart item
  // In the final application, this data will come from the backend API
  const cartProducts = cart.map((item) => {
    const product = products.find((p) => p.id === item.product_id);
    return {
      product,
      quantity: item.quantity,
    };
  }
  );

  console.log(cartProducts);

  // Calculate total price
  const totalPrice = cartProducts.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  // "Calculate" shipping cost (fixed for now)
  const shippingCost = 10;

  return (
    <div className="checkout-container">
      {/* Coluna Esquerda */}
      <div className="checkout-left">
        <h1>Checkout</h1>
        <div className="checkout-steps">
          <span className="active">Endereço</span>
          <span>Envio</span>
          <span>Pagamento</span>
        </div>

        <p>Selecione o endereço de entrega</p>

        {addresses.map((address) => (
          <div
            key={address.id}
            className={`address-card ${
              selectedAddress?.id === address.id ? "selected" : ""
            }`}
            onClick={() => setSelectedAddress(address)}
          >
            <input
              type="radio"
              name="address"
              checked={selectedAddress?.id === address.id}
              readOnly
            />
            <div>
              <strong>{address.title}</strong>
              <p>{address.details}</p>
            </div>
            <span className="address-price">R${address.price}</span>
          </div>
        ))}

        <button className="add-address" onClick={handleAddAddress}>
          ADICIONAR NOVO ENDEREÇO
        </button>
      </div>

      {/* Coluna Direita */}
      <div className="checkout-right">
        <h3>Seu Carrinho</h3>

        {
          cartProducts
            .map(({ product, quantity }, index) => (
              <React.Fragment key={product.id}>
                <div className="cart-item" key={product.id}>
                  <div className="cart-img" style={{ background: `url(${product.images[0]}) no-repeat center center / contain` }}></div>
                  <div className="cart-info">
                    <strong>{product.name}</strong>
                    <a href="#" onClick={(e) => { e.preventDefault(); handleRemoveFromCart(product.id); }}>
                      Remover
                    </a>
                    <p>Quantidade: {quantity}</p>
                    <p className="price">R${NumberFormatter.format(product.price * quantity)}</p>
                  </div>
                </div>
              </React.Fragment>
            ))
        }

        <hr />

        <div className="cart-total">
          <div className="total-line">
            <span>Total</span>
            <span>R${NumberFormatter.format(totalPrice)}</span>
          </div>
          <div className="total-line">
            <span>Frete</span>
            <span>R${NumberFormatter.format(shippingCost)}</span>
          </div>
          <div className="total-line final">
            <span>Total</span>
            <span>R${NumberFormatter.format(totalPrice + shippingCost)}</span>
          </div>
        </div>

        <button className="proceed-btn" onClick={() => navigate("/pagamento")}>
          PROSSEGUIR
        </button>
      </div>
    </div>
  );
};

export default Checkout;
