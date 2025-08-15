import { useNavigate } from "react-router-dom";
import "../styles/CheckoutPage.css";

const Checkout = () => {
  const navigate = useNavigate();

  const handleAddAddress = () => {
    navigate("/novo-endereco");
  };

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

        <div className="address-card selected">
          <input type="checkbox" checked readOnly />
          <div>
            <strong>Endereço 1</strong>
            <p>Rual Tal, número 123, Pelotas/RS</p>
          </div>
          <span className="address-price">R$10</span>
        </div>

        <button className="add-address" onClick={handleAddAddress}>
          ADICIONAR NOVO ENDEREÇO
        </button>
      </div>

      {/* Coluna Direita */}
      <div className="checkout-right">
        <h3>Seu Carrinho</h3>

        <div className="cart-item">
          <div className="cart-img" />
          <div className="cart-info">
            <strong>Caneca System of a Down - Toxicity</strong>
            <a href="#">Remover</a>
            <p>Tamanho: M</p>
            <p>Quantidade: 1</p>
            <p className="price">R$99</p>
          </div>
        </div>

        <hr />

        <div className="cart-item">
          <div className="cart-img" />
          <div className="cart-info">
            <strong>Moletom Linkin Park Meteora</strong>
            <a href="#">Remover</a>
            <p>Tamanho: M</p>
            <p>Quantidade: 1</p>
            <p className="price">R$299</p>
          </div>
        </div>

        <div className="cart-total">
          <div className="total-line">
            <span>Total</span>
            <span>R$398</span>
          </div>
          <div className="total-line">
            <span>Frete</span>
            <span>R$10</span>
          </div>
          <div className="total-line final">
            <span>Total</span>
            <span>R$408</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
