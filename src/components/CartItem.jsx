import TrashIcon from "./TrashIcon";

const CartItem = ({ item, quantity, onRemove }) => (
    <div className="cart-item">
        <div className="cart-item-image">
            <img
                src={item.images[0]}
                alt={item.name}
                onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/150x150/e2e8f0/333?text=Image'; }}
            />
        </div>

        <div className="cart-item-details">
            <h3>{item.name}</h3>
            <p className="item-meta">Quantidade: {quantity}</p>
            <div className="cart-item-footer">
                <p className="cart-item-price">R${item.price.toFixed(2).replace('.', ',')}</p>
                <button
                    onClick={() => onRemove(item.id)}
                    className="remove-item-button"
                >
                    <TrashIcon />
                    Remove
                </button>
            </div>
        </div>
    </div>
);

export default CartItem;