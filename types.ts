export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  size: string; // e.g., '500ml', '5L'
  description: string;
  category: 'extra-virgin' | 'organic' | 'flavored';
  acidity: number;
  stock: number;
  image: string;
  featured?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  date: string;
}

export interface SiteConfig {
  heroTitle: string;
  heroSubtitle: string;
  announcementBar: string;
  primaryColor: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
  author: string;
}
