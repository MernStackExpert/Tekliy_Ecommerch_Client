"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const savedCart = localStorage.getItem("tekliy_cart");
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    if (isClient) {
      localStorage.setItem("tekliy_cart", JSON.stringify(cartItems));
    }
  }, [cartItems, isClient]);

  const addToCart = (product, quantity = 1) => {
    const isExist = cartItems.find((item) => item._id === product._id);

    if (isExist) {
      setCartItems((prev) =>
        prev.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      );
      toast.success(`${product.name} quantity updated!`, {
        style: { borderRadius: "10px", background: "#001B3D", color: "#fff" },
      });
    } else {
      setCartItems((prev) => [
        ...prev,
        {
          _id: product._id,
          name: product.name,
          price: product.discountPrice || product.price,
          image: product.images[0],
          slug: product.slug,
          category: product.category,
          quantity,
        },
      ]);
      toast.success(`${product.name} added to cart!`, {
        icon: "🛒",
        style: { borderRadius: "10px", background: "#007FFF", color: "#fff" },
      });
    }
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item._id !== id));
    toast.error("Item removed");
  };

  const updateQuantity = (id, type) => {
    setCartItems((prev) =>
      prev.map((item) => {
        if (item._id === id) {
          let newQty = type === "inc" ? item.quantity + 1 : item.quantity - 1;
          return { ...item, quantity: Math.max(1, newQty) };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCartItems([]);
    toast.success("Cart cleared");
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};