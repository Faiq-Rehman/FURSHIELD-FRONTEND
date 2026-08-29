import { createContext, useContext, useState } from 'react';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('furshield-cart') || '[]');
    } catch {
      return [];
    }
  });

  const update = (next) => {
    setItems(next);
    localStorage.setItem('furshield-cart', JSON.stringify(next));
  };

  const getItemId = (item) => item.id || item._id;

  const add = (product) => {
    const id = getItemId(product);
    const existing = items.find((i) => getItemId(i) === id);
    if (existing) {
      update(items.map((i) => (getItemId(i) === id ? { ...i, quantity: i.quantity + 1 } : i)));
    } else {
      update([...items, { ...product, id, quantity: 1 }]);
    }
  };

  const changeQuantity = (id, quantity) => {
    if (quantity < 1) {
      update(items.filter((i) => getItemId(i) !== id));
    } else {
      update(items.map((i) => (getItemId(i) === id ? { ...i, quantity } : i)));
    }
  };

  const removeItem = (id) => {
    update(items.filter((i) => getItemId(i) !== id));
  };

  const clearCart = () => {
    update([]);
  };

  return (
    <CartContext.Provider value={{ items, add, changeQuantity, removeItem, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
