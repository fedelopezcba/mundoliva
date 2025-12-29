import React, { useState, useMemo } from 'react';
import { useStore } from '../store/StoreContext';
import { Button } from '../components/Shared';
import { Product } from '../types';
import { Link, useNavigate } from 'react-router-dom';
import { Check, Star, Truck, Award, Droplet, ArrowRight, Trash2, Plus, Minus } from 'lucide-react';

/* --- HOME PAGE --- */
export const HomePage: React.FC = () => {
  const { products } = useStore();
  const featuredProducts = products.filter(p => p.featured).slice(0, 3);
  
  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative h-[85vh] bg-stone-900 flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1474979266404-7cadd259d366?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80" 
            alt="Olive grove at sunset" 
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-olive-900/80 to-transparent"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <span className="inline-block py-1 px-3 rounded-full bg-amber-500/20 text-amber-300 text-sm font-semibold mb-6 tracking-wide uppercase backdrop-blur-sm border border-amber-500/30">
              Cosecha Temprana 2024
            </span>
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 leading-tight">
              La Esencia Pura del Mediterráneo
            </h1>
            <p className="text-xl text-stone-200 mb-8 font-light leading-relaxed">
              Aceite de Oliva Virgen Extra de categoría superior, obtenido directamente de aceitunas y solo mediante procedimientos mecánicos. Salud y sabor en cada gota.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/shop">
                <Button className="w-full sm:w-auto text-lg px-8 py-4 bg-amber-600 hover:bg-amber-700 text-white border-none">
                  Comprar Ahora
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="outline" className="w-full sm:w-auto text-lg px-8 py-4 text-white border-white hover:bg-white hover:text-olive-900">
                  Nuestra Historia
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-12 bg-white border-b border-earth-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center p-6">
              <div className="bg-olive-50 p-4 rounded-full mb-4 text-olive-700">
                <Award className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-serif font-bold text-earth-800 mb-2">Calidad Certificada</h3>
              <p className="text-earth-600">Todos nuestros aceites pasan rigurosos controles y poseen D.O.P.</p>
            </div>
            <div className="flex flex-col items-center p-6 border-l-0 md:border-l border-earth-100">
               <div className="bg-olive-50 p-4 rounded-full mb-4 text-olive-700">
                <Droplet className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-serif font-bold text-earth-800 mb-2">Prensado en Frío</h3>
              <p className="text-earth-600">Extracción a menos de 27ºC para preservar todos los polifenoles.</p>
            </div>
            <div className="flex flex-col items-center p-6 border-l-0 md:border-l border-earth-100">
               <div className="bg-olive-50 p-4 rounded-full mb-4 text-olive-700">
                <Truck className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-serif font-bold text-earth-800 mb-2">Envío Rápido y Seguro</h3>
              <p className="text-earth-600">Botellas protegidas. Envío gratis en pedidos superiores a 60€.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-earth-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-olive-900 mb-2">Selección del Maestro Almazarero</h2>
              <p className="text-earth-600">Nuestros aceites más premiados de esta temporada.</p>
            </div>
            <Link to="/shop" className="hidden md:flex items-center text-olive-700 font-semibold hover:text-amber-600 transition-colors">
              Ver todo el catálogo <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
               <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          <div className="mt-12 text-center md:hidden">
            <Link to="/shop">
               <Button variant="outline">Ver todo el catálogo</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits / Story Tease */}
      <section className="py-24 bg-olive-900 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="relative">
                <div className="absolute -inset-4 bg-amber-500/20 rounded-full blur-3xl"></div>
                <img 
                  src="https://images.unsplash.com/photo-1541410965313-d53b3c16ef17?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                  alt="Pouring olive oil" 
                  className="relative rounded-lg shadow-2xl transform lg:rotate-3 hover:rotate-0 transition-transform duration-500" 
                />
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">Más que un ingrediente, un estilo de vida</h2>
                <div className="space-y-6 text-olive-100">
                  <p className="text-lg">
                    El Aceite de Oliva Virgen Extra es el pilar de la dieta mediterránea. Rico en antioxidantes naturales y grasas monoinsaturadas, es el aliado perfecto para tu salud cardiovascular.
                  </p>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <Check className="h-6 w-6 text-amber-500 mr-3 mt-1" />
                      <span>Alto contenido en Vitamina E y Polifenoles.</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-6 w-6 text-amber-500 mr-3 mt-1" />
                      <span>Propiedades antiinflamatorias naturales.</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-6 w-6 text-amber-500 mr-3 mt-1" />
                      <span>Potencia el sabor de tus platos sin enmascararlos.</span>
                    </li>
                  </ul>
                  <div className="pt-6">
                    <Link to="/about">
                       <Button className="bg-white text-olive-900 hover:bg-earth-100">Leer sobre Salud y AOVE</Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
        </div>
      </section>
    </div>
  );
};

/* --- SHOP PAGE --- */
export const ShopPage: React.FC = () => {
  const { products } = useStore();
  const [filterBrand, setFilterBrand] = useState<string>('all');
  const [filterSize, setFilterSize] = useState<string>('all');

  const brands = Array.from(new Set(products.map(p => p.brand)));
  const sizes = Array.from(new Set(products.map(p => p.size)));

  const filteredProducts = products.filter(p => {
    const brandMatch = filterBrand === 'all' || p.brand === filterBrand;
    const sizeMatch = filterSize === 'all' || p.size === filterSize;
    return brandMatch && sizeMatch;
  });

  return (
    <div className="bg-earth-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-serif font-bold text-olive-900 mb-4">Nuestra Bodega</h1>
          <p className="text-earth-600 max-w-2xl mx-auto">Explora nuestra colección de aceites premium. Desde picuales intensos hasta arbequinas delicadas.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="w-full lg:w-64 flex-shrink-0">
             <div className="bg-white p-6 rounded-lg shadow-sm sticky top-24">
               <h3 className="font-bold text-lg text-olive-900 mb-4">Filtrar por</h3>
               
               <div className="mb-6">
                 <h4 className="text-sm font-semibold text-earth-500 uppercase tracking-wider mb-3">Marca</h4>
                 <div className="space-y-2">
                   <label className="flex items-center space-x-2 cursor-pointer">
                     <input 
                        type="radio" 
                        name="brand" 
                        className="text-olive-600 focus:ring-olive-500" 
                        checked={filterBrand === 'all'} 
                        onChange={() => setFilterBrand('all')} 
                      />
                     <span className="text-earth-700">Todas</span>
                   </label>
                   {brands.map(brand => (
                     <label key={brand} className="flex items-center space-x-2 cursor-pointer">
                       <input 
                          type="radio" 
                          name="brand" 
                          className="text-olive-600 focus:ring-olive-500" 
                          checked={filterBrand === brand} 
                          onChange={() => setFilterBrand(brand)} 
                        />
                       <span className="text-earth-700">{brand}</span>
                     </label>
                   ))}
                 </div>
               </div>

               <div>
                 <h4 className="text-sm font-semibold text-earth-500 uppercase tracking-wider mb-3">Tamaño</h4>
                 <div className="flex flex-wrap gap-2">
                    <button 
                      onClick={() => setFilterSize('all')}
                      className={`px-3 py-1 text-sm rounded-full border ${filterSize === 'all' ? 'bg-olive-800 text-white border-olive-800' : 'bg-white text-earth-600 border-earth-300 hover:border-olive-500'}`}
                    >
                      Todos
                    </button>
                    {sizes.map(size => (
                      <button 
                        key={size}
                        onClick={() => setFilterSize(size)}
                        className={`px-3 py-1 text-sm rounded-full border ${filterSize === size ? 'bg-olive-800 text-white border-olive-800' : 'bg-white text-earth-600 border-earth-300 hover:border-olive-500'}`}
                      >
                        {size}
                      </button>
                    ))}
                 </div>
               </div>
             </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            {filteredProducts.length === 0 && (
              <div className="text-center py-20 bg-white rounded-lg">
                <p className="text-lg text-earth-500">No encontramos productos con esos filtros.</p>
                <button 
                  onClick={() => { setFilterBrand('all'); setFilterSize('all'); }}
                  className="mt-4 text-olive-600 underline"
                >
                  Limpiar filtros
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

/* --- CART PAGE --- */
export const CartPage: React.FC = () => {
  const { cart, removeFromCart, updateCartQuantity, placeOrder } = useStore();
  const [customer, setCustomer] = useState({ name: '', email: '' });

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shipping = subtotal > 60 ? 0 : 5.95;
  const total = subtotal + shipping;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    placeOrder(customer);
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-earth-50">
        <ShoppingBag className="h-16 w-16 text-earth-300 mb-4" />
        <h2 className="text-2xl font-serif font-bold text-olive-900 mb-2">Tu carrito está vacío</h2>
        <p className="text-earth-600 mb-8">Parece que aún no has seleccionado tu oro líquido.</p>
        <Link to="/shop">
          <Button>Ir a la Tienda</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-earth-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-serif font-bold text-olive-900 mb-8">Tu Pedido</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-sm overflow-hidden">
            <ul className="divide-y divide-earth-100">
              {cart.map((item) => (
                <li key={item.id} className="p-6 flex items-center">
                  <img src={item.image} alt={item.name} className="h-24 w-24 object-cover rounded-md border border-earth-200" />
                  <div className="ml-6 flex-1">
                    <div className="flex justify-between">
                      <h3 className="text-lg font-bold text-olive-900">{item.name}</h3>
                      <p className="text-lg font-semibold text-earth-800">{item.price.toFixed(2)}€</p>
                    </div>
                    <p className="text-sm text-earth-500">{item.brand} - {item.size}</p>
                    <div className="mt-4 flex items-center justify-between">
                       <div className="flex items-center border border-earth-300 rounded-md">
                         <button 
                            onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                            className="p-2 hover:bg-earth-100 text-earth-600"
                            disabled={item.quantity <= 1}
                         >
                           <Minus size={16} />
                         </button>
                         <span className="px-4 font-medium text-olive-900">{item.quantity}</span>
                         <button 
                            onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                            className="p-2 hover:bg-earth-100 text-earth-600"
                         >
                           <Plus size={16} />
                         </button>
                       </div>
                       <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-700 text-sm flex items-center"
                       >
                         <Trash2 size={16} className="mr-1" /> Eliminar
                       </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Order Summary & Checkout */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-bold text-olive-900 mb-6">Resumen</h3>
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-earth-600">
                  <span>Subtotal</span>
                  <span>{subtotal.toFixed(2)}€</span>
                </div>
                <div className="flex justify-between text-earth-600">
                  <span>Envío {shipping === 0 && <span className="text-olive-600 text-xs font-bold bg-olive-100 px-2 rounded-full">GRATIS</span>}</span>
                  <span>{shipping === 0 ? '0.00' : shipping.toFixed(2)}€</span>
                </div>
                <div className="border-t border-earth-200 pt-4 flex justify-between font-bold text-xl text-olive-900">
                  <span>Total</span>
                  <span>{total.toFixed(2)}€</span>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <h4 className="font-semibold text-earth-800 mt-8 mb-2">Datos de Envío</h4>
                <div>
                  <input 
                    type="text" 
                    placeholder="Nombre completo" 
                    required
                    className="w-full px-4 py-2 border border-earth-300 rounded-md focus:ring-2 focus:ring-olive-500 focus:border-transparent outline-none"
                    value={customer.name}
                    onChange={e => setCustomer({...customer, name: e.target.value})}
                  />
                </div>
                <div>
                  <input 
                    type="email" 
                    placeholder="Email de contacto" 
                    required
                    className="w-full px-4 py-2 border border-earth-300 rounded-md focus:ring-2 focus:ring-olive-500 focus:border-transparent outline-none"
                    value={customer.email}
                    onChange={e => setCustomer({...customer, email: e.target.value})}
                  />
                </div>
                <Button type="submit" className="w-full mt-4 bg-amber-600 hover:bg-amber-700">
                  Finalizar Compra
                </Button>
                <p className="text-xs text-center text-earth-400 mt-2">Pagos seguros encriptados SSL</p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* --- HELPER COMPONENTS --- */
import { ShoppingBag } from 'lucide-react';

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const { addToCart } = useStore();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="group bg-white rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full border border-earth-100 overflow-hidden">
      <div className="relative h-64 overflow-hidden bg-earth-100">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" 
        />
        {product.acidity < 0.2 && (
          <div className="absolute top-2 left-2 bg-olive-900 text-white text-xs px-2 py-1 rounded-sm uppercase tracking-wide">
            Premium
          </div>
        )}
      </div>
      
      <div className="p-5 flex-1 flex flex-col">
        <div className="mb-2 flex justify-between items-start">
           <span className="text-sm font-semibold text-amber-600 uppercase tracking-wider">{product.brand}</span>
           <div className="flex text-amber-400">
             {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
           </div>
        </div>
        <h3 className="text-xl font-serif font-bold text-olive-900 mb-2 leading-tight">{product.name}</h3>
        <p className="text-earth-500 text-sm mb-4 line-clamp-2 flex-1">{product.description}</p>
        
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-earth-100">
          <div>
            <span className="text-2xl font-bold text-olive-800">{product.price}€</span>
            <span className="text-xs text-earth-500 ml-1">/ {product.size}</span>
          </div>
          <button 
            onClick={handleAdd}
            className={`p-3 rounded-full transition-colors ${added ? 'bg-green-600 text-white' : 'bg-earth-100 text-olive-900 hover:bg-olive-800 hover:text-white'}`}
          >
            {added ? <Check size={20} /> : <ShoppingBag size={20} />}
          </button>
        </div>
      </div>
    </div>
  );
};
