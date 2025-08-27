import "../styles/Cart.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CartItem from "../components/CartItem";
import OrderSummary from "../components/OrderSummary";

export default function CartPage() {
  const navigate = useNavigate();
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);

  const clienteId = localStorage.getItem("clienteId");

  useEffect(() => {
    if (!clienteId) {
      alert("Você precisa estar logado como cliente para ver o carrinho.");
      navigate("/login");
      return;
    }

    const fetchCart = async () => {
      try {
        const response = await fetch(`http://localhost:8080/carrinhos/${clienteId}`);
        if (response.ok) {
          const data = await response.json();
          console.log("Carrinho carregado:", data);
          setCart(data);
        } else {
          console.error("Erro ao carregar carrinho:", response.status);
          setCart({ itens: [], valorTotal: 0 });
        }
      } catch (error) {
        console.error("Erro na requisição do carrinho:", error);
        setCart({ itens: [], valorTotal: 0 });
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [clienteId, navigate]);

  const handleRemoveItem = async (produtoId) => {
    try {
      const response = await fetch(`http://localhost:8080/carrinhos/${clienteId}/remover/${produtoId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        const updatedCart = await response.json();
        setCart(updatedCart);
      } else {
        console.error("Erro ao remover item:", response.status);
      }
    } catch (error) {
      console.error("Erro na requisição de remover item:", error);
    }
  };

  if (loading) {
    return <p>Carregando carrinho...</p>;
  }

  if (!cart || cart.itens.length === 0) {
    return (
      <div className="empty-cart">
        <h3>Seu carrinho está vazio.</h3>
        <p>
          Adicione produtos para vê-los aqui.{" "}
          <a href="#" onClick={(e) => { e.preventDefault(); navigate("/"); }}>
            Continue comprando
          </a>
        </p>
      </div>
    );
  }

  return (
    <div className="container">
      <main className="main-content">
        <div className="cart-header">
          <h1>Carrinho</h1>
        </div>

        <div className="cart-grid">
          <div className="cart-items-container">
            {cart.itens.map((item) => (
              <CartItem
                key={item.produtoId}
                item={{ id: item.produtoId, nome: item.nomeProduto, preco: item.preco }}
                quantity={item.quantidade}
                onRemove={() => handleRemoveItem(item.produtoId)}
              />
            ))}
          </div>

          <div className="order-summary-container">
            <OrderSummary total={cart.valorTotal} />
          </div>
        </div>
      </main>
    </div>
  );
}
