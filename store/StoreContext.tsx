import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, CartItem, Order, BlogPost } from '../types';

// Mock Data
const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Reserva Familiar Picual',
    brand: 'Finca La Torre',
    price: 24.90,
    size: '500ml',
    category: 'extra-virgin',
    acidity: 0.1,
    stock: 50,
    description: 'Un aceite intenso con notas de hierba recién cortada, almendra verde y tomate.',
    image: 'https://picsum.photos/seed/olive1/400/400',
    featured: true
  },
  {
    id: '2',
    name: 'Arbequina Premium',
    brand: 'Castillo de Canena',
    price: 19.50,
    size: '500ml',
    category: 'organic',
    acidity: 0.15,
    stock: 30,
    description: 'Suave y frutado, ideal para pescados blancos y ensaladas delicadas.',
    image: 'https://picsum.photos/seed/olive2/400/400',
    featured: true
  },
  {
    id: '3',
    name: 'Bidón Económico Familiar',
    brand: 'Mundoliva Selección',
    price: 45.00,
    size: '5L',
    category: 'extra-virgin',
    acidity: 0.3,
    stock: 100,
    description: 'La mejor relación calidad-precio para el uso diario en la cocina.',
    image: 'https://picsum.photos/seed/olive3/400/400',
    featured: false
  },
  {
    id: '4',
    name: 'Hojiblanca Ecológico',
    brand: 'Oro del Desierto',
    price: 28.00,
    size: '500ml',
    category: 'organic',
    acidity: 0.1,
    stock: 15,
    description: 'Galardonado mundialmente. Notas picantes y amargas muy equilibradas.',
    image: 'https://picsum.photos/seed/olive4/400/400',
    featured: false
  }
];

const INITIAL_BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    title: '5 Recetas para Maridar con Picual',
    excerpt: 'Descubre cómo potenciar tus platos con la variedad más intensa.',
    content: 'Lorem ipsum...',
    image: 'https://picsum.photos/seed/food1/800/400',
    date: '2023-10-15',
    author: 'Chef María'
  },
  {
    id: '2',
    title: 'Beneficios del Prensado en Frío',
    excerpt: 'Por qué la temperatura importa a la hora de extraer el oro líquido.',
    content: 'Lorem ipsum...',
    image: 'https://picsum.photos/seed/tech1/800/400',
    date: '2023-10-20',
    author: 'Dr. Oliva'
  }
];

interface StoreContextType {
  products: Product[];
  cart: CartItem[];
  orders: Order[];
  blogPosts: BlogPost[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  placeOrder: (customerData: { name: string; email: string }) => void;
  // Admin Methods
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (productId: string) => void;
  addBlogPost: (post: BlogPost) => void;
  isAdminMode: boolean;
  toggleAdminMode: () => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(INITIAL_BLOG_POSTS);
  const [isAdminMode, setIsAdminMode] = useState(false);

  // Cart Logic
  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) return;
    setCart(prev => prev.map(item => item.id === productId ? { ...item, quantity } : item));
  };

  const clearCart = () => setCart([]);

  const placeOrder = (customerData: { name: string; email: string }) => {
    const newOrder: Order = {
      id: Math.random().toString(36).substr(2, 9),
      customerName: customerData.name,
      customerEmail: customerData.email,
      items: [...cart],
      total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
      status: 'pending',
      date: new Date().toISOString().split('T')[0]
    };
    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    alert("¡Pedido realizado con éxito! Gracias por confiar en Mundoliva.");
  };

  // Admin Logic
  const addProduct = (product: Product) => {
    setProducts(prev => [...prev, product]);
  };

  const updateProduct = (product: Product) => {
    setProducts(prev => prev.map(p => p.id === product.id ? product : p));
  };

  const deleteProduct = (productId: string) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
  };

  const addBlogPost = (post: BlogPost) => {
      setBlogPosts(prev => [post, ...prev]);
  }

  const toggleAdminMode = () => setIsAdminMode(!isAdminMode);

  return (
    <StoreContext.Provider value={{
      products,
      cart,
      orders,
      blogPosts,
      addToCart,
      removeFromCart,
      updateCartQuantity,
      clearCart,
      placeOrder,
      addProduct,
      updateProduct,
      deleteProduct,
      addBlogPost,
      isAdminMode,
      toggleAdminMode
    }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) throw new Error("useStore must be used within StoreProvider");
  return context;
};
