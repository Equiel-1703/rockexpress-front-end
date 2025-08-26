import "../styles/ProductPage.css";

import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import NumberFormattter from "../utils/NumberFormatter";

// Importing cart placeholder functions (THIS MUST BE REPLACED WITH REAL DATA LATER)
// import { addToCart } from '../placeholders/cart';

const handleAddToCart = (product, quantity) => {
  addToCart(product.id, quantity);
  alert(`Produto '${product.nome}' adicionado ao carrinho!`);
};

const ProductPage = () => {
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);

  const urlParams = useParams();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8080/produtos/${urlParams.id}`)
      .then(res => res.json())
      .then(data => { console.log("Produto na ProductPage: ", data); setProduct(data) })
      .catch(() => setProduct(null));
  }, [urlParams.id]);

  if (!product) {
    return <h2>Carregando produto...</h2>;
  }

  return (
    <div className="product-page">
      <h2 className="breadcrumb">DETALHE PRODUTO</h2>
      <div className="product-container">
        <div className="product-images">
          {
            product.images &&
            product.images
              .map(
                (image, index) => (
                  <img key={index} src={image} alt={`Produto ${index + 1}`} />
                ))
          }
          {
            Array
              .from({ length: 4 - (product.images ? product.images.length : 0) })
              .map((_, index) => (
                <div key={index} className="placeholder"></div>
              ))
          }

          {/* <img src="/produtos/img1.png" alt="Produto" />
          <img src="/produtos/img2.png" alt="Produto" />
          <div className="placeholder"></div>
          <div className="placeholder"></div> */}
        </div>

        <div className="product-details">
          <h1 className="product-title">
            {product.nome}
            <span className="external-icon">↗</span>
          </h1>
          <p className="product-price">R$ {NumberFormattter.format(product.preco)}</p>
          <p className="product-description">{product.descricao}</p>

          {
            /* <div className="section">
              <p className="label">Cores</p>
              <div className="color-options">
                <div
                  className={`color black ${selectedColor === "black" ? "selected" : ""
                    }`}
                  onClick={() => setSelectedColor("black")}
                ></div>
                <div
                  className={`color green ${selectedColor === "green" ? "selected" : ""
                    }`}
                  onClick={() => setSelectedColor("green")}
                ></div>
              </div>
            </div> */
          }

          <div className="action-row">
            <button className="add-to-cart" onClick={() => handleAddToCart(product, quantity)}>
              Adicionar ao carrinho
            </button>
            <div className="quantity-control">
              <button onClick={() => setQuantity((q) => Math.max(1, q - 1))}>
                −
              </button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity((q) => q + 1)}>+</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
