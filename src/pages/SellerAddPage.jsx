import React, { useState } from 'react';
import '../styles/SellerAdd.css';

export default function SellerAddPage() {
  const [product, setProduct] = useState({
    name: 'Sofá Gorillaz',
    description: 'Traga a experiência da banda Gorillaz direto para a sua sala com este majestoso sofá de 23km². Temos estoque limitado, então corra!',
    price: '',
    stock: '',
    category: 'Banda/Artista',
    size: '',
    sizeVisible: true,
    images: []
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProduct(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setProduct(prev => ({
      ...prev,
      images: [...prev.images, ...files]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Produto enviado:', product);
  };

  return (
    <div className="seller-page">
      <div className="images-column">
        {product.images.length === 0 && (
          <div className="add-photo">
            <span>+</span>
            <input type="file" onChange={handleImageUpload} accept="image/*" multiple />
          </div>
        )}
        {product.images.map((img, idx) => (
          <img
            key={idx}
            src={typeof img === 'string' ? img : URL.createObjectURL(img)}
            alt={`Produto ${idx}`}
          />
        ))}
      </div>

      <div className="form-column">
        <h1>{product.name}</h1>
        
        <div className="price-section">
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            placeholder="R$ 0,00"
          />
          <button type="button">Atualizar</button>
        </div>

        <textarea
          name="description"
          value={product.description}
          onChange={handleChange}
          rows="4"
        />

        <div className="options-row">
          <input
            type="number"
            name="stock"
            value={product.stock}
            onChange={handleChange}
            placeholder="Estoque"
          />
          <select name="size" value={product.size} onChange={handleChange}>
            <option value="">Tamanho</option>
            <option value="P">P</option>
            <option value="M">M</option>
            <option value="G">G</option>
          </select>
        </div>

        <div className="options-row">
          <select name="category" value={product.category} onChange={handleChange}>
            <option value="Banda/Artista">Banda/Artista</option>
          </select>

          <label className="toggle-visible">
            Visível
            <input
              type="checkbox"
              name="sizeVisible"
              checked={product.sizeVisible}
              onChange={handleChange}
            />
            <span className="slider"></span>
          </label>
        </div>

        <button onClick={handleSubmit} className="submit-button">
          Adicionar ao Catálogo
        </button>
      </div>
    </div>
  );
}
