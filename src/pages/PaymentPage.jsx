import "../styles/PaymentPage.css";

import { useNavigate } from "react-router-dom";
import NumberFormattter from "../utils/NumberFormatter";

// Importing cart and products placeholder functions (THIS MUST BE CHANGED TO REAL CART LOGIC LATER)
import { addToCart, removeFromCart, getCart } from '../placeholders/cart';
import products from "../placeholders/products";

const Payment = () => {
  const navigate = useNavigate();

  // Produtos do carrinho (pode vir do state ou contexto)
  const cartItems = getCart();
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

  // Fixed shipping
  const shipping = 10;

  // Calculating subtotal and total
  const subtotal = cartProducts.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  const total = subtotal + shipping;

  const handleFinalize = () => {
    alert("Pagamento realizado com sucesso!");
    navigate("/"); // volta para home ou página de confirmação
  };

  return (
    <div className="payment-container">
      <div className="payment-left">
        <h1>Pagamento</h1>
        <div className="checkout-steps">
          <span>Endereço</span>
          <span>Envio</span>
          <span className="active">Pagamento</span>
        </div>

        <div className="pix-section">
          <div className="pix-input">
            <img src="pix.png" alt="Pix" style={{ width: "100px", height: "auto" }} />
          </div>
          <div className="qr-code">
            <img
              src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=pagamento"
              alt="QR Code Pix"
            />
          </div>
        </div>
      </div>

      <div className="payment-right">
        <h3>Sua compra</h3>
        {cartProducts.map(({ product, quantity }) => (
          <div key={product.id} className="cart-item">
            <div className="cart-img" style={{ background: `url(${product.images[0]}) no-repeat center center / contain` }} />
            <div className="cart-info">
              <strong>{product.name}</strong>
              <p>Quantidade: {quantity}</p>
              <p className="price">R${NumberFormattter.format(product.price)}</p>
            </div>
          </div>
        ))}

        <div className="cart-total">
          <div className="total-line">
            <span>Total</span>
            <span>R${NumberFormattter.format(subtotal)}</span>
          </div>
          <div className="total-line">
            <span>Frete</span>
            <span>R${NumberFormattter.format(shipping)}</span>
          </div>
          <div className="total-line final">
            <span>Total</span>
            <span>R${NumberFormattter.format(total)}</span>
          </div>
        </div>

        <button className="finalize-btn" onClick={handleFinalize}>
          FINALIZAR PAGAMENTO
        </button>
      </div>
    </div>
  );
};

export default Payment;
