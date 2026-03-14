import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [tableNumber, setTableNumber] = useState(null);

  useEffect(() => {
    loadCartFromStorage();
    loadTableNumberFromStorage();
  }, []);

  const loadCartFromStorage = async () => {
    try {
      const cartStr = await AsyncStorage.getItem("cart");
      if (cartStr) {
        setCart(JSON.parse(cartStr));
      }
    } catch (error) {
      console.error("Error loading cart:", error);
    }
  };

  const saveCartToStorage = async (newCart) => {
    try {
      await AsyncStorage.setItem("cart", JSON.stringify(newCart));
    } catch (error) {
      console.error("Error saving cart:", error);
    }
  };

  const loadTableNumberFromStorage = async () => {
    try {
      const tableStr = await AsyncStorage.getItem("tableNumber");
      if (tableStr) {
        setTableNumber(tableStr);
      }
    } catch (error) {
      console.error("Error loading table number:", error);
    }
  };

  const saveTableNumberToStorage = async (table) => {
    try {
      await AsyncStorage.setItem("tableNumber", table);
    } catch (error) {
      console.error("Error saving table number:", error);
    }
  };

  const addToCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
      let newCart;
      if (existingItem) {
        newCart = prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
            : cartItem,
        );
      } else {
        newCart = [...prevCart, item];
      }
      saveCartToStorage(newCart);
      return newCart;
    });
  };

  const removeFromCart = (itemId) => {
    setCart((prevCart) => {
      const newCart = prevCart.filter((item) => item.id !== itemId);
      saveCartToStorage(newCart);
      return newCart;
    });
  };

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setCart((prevCart) => {
      const newCart = prevCart.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item,
      );
      saveCartToStorage(newCart);
      return newCart;
    });
  };

  const clearCart = () => {
    setCart([]);
    saveCartToStorage([]);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const value = {
    cart,
    tableNumber,
    setTableNumber: (table) => {
      setTableNumber(table);
      saveTableNumberToStorage(table);
    },
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalPrice,
    getTotalItems,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
