import { useNavigate } from "react-router-dom";
import "../styles/PaymentPage.css";

const Payment = () => {
  const navigate = useNavigate();

  // Produtos do carrinho (pode vir do state ou contexto)
  const cartItems = [
    { id: 1, name: "Caneca System of a Down - Toxicity", size: "M", quantity: 1, price: 299 },
    { id: 2, name: "Moletom Linkin Park Meteora", size: "M", quantity: 1, price: 99 },
  ];

  const shipping = 10;
  const subtotal = cartItems.reduce((acc, item) => acc + item.price, 0);
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
            <img src="pix.png" alt="Pix" style={{ width: "100px", height: "auto" }}/>
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
        {cartItems.map((item) => (
          <div key={item.id} className="cart-item">
            <div className="cart-img" />
            <div className="cart-info">
              <strong>{item.name}</strong>
              <p>Tamanho: {item.size}</p>
              <p>Quantidade: {item.quantity}</p>
              <p className="price">R${item.price}</p>
            </div>
          </div>
        ))}

        <div className="cart-total">
          <div className="total-line">
            <span>Total</span>
            <span>R${subtotal}</span>
          </div>
          <div className="total-line">
            <span>Frete</span>
            <span>R${shipping}</span>
          </div>
          <div className="total-line final">
            <span>Total</span>
            <span>R${total}</span>
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
