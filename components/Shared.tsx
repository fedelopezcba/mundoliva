import React, { useState } from 'react';
import { ShoppingCart, Menu, X, Instagram, Facebook, Mail, Leaf, Phone, MapPin, User, LogOut } from 'lucide-react';
import { useStore } from '../store/StoreContext';
import { Link, useLocation } from 'react-router-dom';

export const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'outline' | 'ghost' }> = ({
  className = '',
  variant = 'primary',
  children,
  ...props
}) => {
  const baseStyles = "inline-flex items-center justify-center px-6 py-3 border text-base font-medium rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-olive-500";
  
  const variants = {
    primary: "border-transparent shadow-sm text-white bg-olive-800 hover:bg-olive-900",
    outline: "border-olive-800 text-olive-800 bg-transparent hover:bg-olive-50",
    ghost: "border-transparent text-earth-600 hover:text-olive-800 hover:bg-earth-100"
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

export const Navbar: React.FC = () => {
  const { cart, isAdminMode, toggleAdminMode } = useStore();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const navLinks = [
    { name: 'Inicio', path: '/' },
    { name: 'Tienda', path: '/shop' },
    { name: 'Nosotros', path: '/about' },
    { name: 'Contacto', path: '/contact' },
  ];

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center gap-2">
              <Leaf className="h-8 w-8 text-olive-600" />
              <span className="font-serif text-2xl font-bold text-olive-900 tracking-tight">Mundoliva</span>
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm font-medium transition-colors ${location.pathname === link.path ? 'text-olive-700' : 'text-earth-600 hover:text-olive-700'}`}
              >
                {link.name}
              </Link>
            ))}
            
            <div className="border-l border-earth-200 pl-8 flex items-center space-x-4">
               <button 
                onClick={toggleAdminMode}
                className={`p-2 rounded-full hover:bg-earth-100 ${isAdminMode ? 'text-olive-600' : 'text-earth-400'}`}
                title="Toggle Admin Mode (Demo)"
              >
                {isAdminMode ? <LogOut size={20} /> : <User size={20} />}
              </button>

              <Link to="/cart" className="relative p-2 text-earth-600 hover:text-olive-700">
                <ShoppingCart className="h-6 w-6" />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-amber-600 rounded-full">
                    {cartCount}
                  </span>
                )}
              </Link>

              {isAdminMode && (
                 <Link to="/admin" className="px-3 py-1 bg-olive-100 text-olive-800 rounded-full text-xs font-bold uppercase tracking-wide">
                   Admin Panel
                 </Link>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-earth-400 hover:text-olive-500 hover:bg-earth-100 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-earth-100">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-earth-700 hover:text-olive-700 hover:bg-olive-50"
              >
                {link.name}
              </Link>
            ))}
            {isAdminMode && (
                 <Link to="/admin" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-olive-700 bg-olive-50">
                   Ir al Dashboard
                 </Link>
            )}
            <Link to="/cart" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-earth-700 hover:text-olive-700 hover:bg-olive-50">
               Carrito ({cartCount})
            </Link>
             <button 
                onClick={() => { toggleAdminMode(); setIsOpen(false); }}
                className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-earth-700 hover:text-olive-700 hover:bg-olive-50"
              >
                {isAdminMode ? 'Salir Modo Admin' : 'Entrar Modo Admin'}
              </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export const Footer: React.FC = () => {
  return (
    <footer className="bg-olive-900 text-olive-100 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          
          <div className="col-span-1 md:col-span-1">
             <div className="flex items-center gap-2 mb-4">
              <Leaf className="h-6 w-6 text-amber-500" />
              <span className="font-serif text-xl font-bold text-white">Mundoliva</span>
            </div>
            <p className="text-olive-200 text-sm leading-relaxed mb-6">
              Seleccionamos los mejores aceites de oliva virgen extra de pequeños productores para llevar la esencia del Mediterráneo a tu mesa.
            </p>
            <div className="flex space-x-4">
              <Instagram className="h-5 w-5 hover:text-amber-500 cursor-pointer transition-colors" />
              <Facebook className="h-5 w-5 hover:text-amber-500 cursor-pointer transition-colors" />
              <Mail className="h-5 w-5 hover:text-amber-500 cursor-pointer transition-colors" />
            </div>
          </div>

          <div>
            <h4 className="text-white font-serif font-semibold text-lg mb-6">Explorar</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/shop" className="hover:text-amber-400 transition-colors">Tienda Online</Link></li>
              <li><Link to="/about" className="hover:text-amber-400 transition-colors">Nuestra Historia</Link></li>
              <li><Link to="/blog" className="hover:text-amber-400 transition-colors">Recetas & Tips</Link></li>
              <li><Link to="/wholesale" className="hover:text-amber-400 transition-colors">Mayoristas</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-serif font-semibold text-lg mb-6">Ayuda</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/contact" className="hover:text-amber-400 transition-colors">Contacto</Link></li>
              <li><a href="#" className="hover:text-amber-400 transition-colors">Envíos y Devoluciones</a></li>
              <li><a href="#" className="hover:text-amber-400 transition-colors">Política de Privacidad</a></li>
              <li><a href="#" className="hover:text-amber-400 transition-colors">Términos del Servicio</a></li>
            </ul>
          </div>

          <div>
             <h4 className="text-white font-serif font-semibold text-lg mb-6">Contacto</h4>
             <ul className="space-y-4 text-sm">
               <li className="flex items-start">
                 <MapPin className="h-5 w-5 text-amber-500 mr-2 shrink-0" />
                 <span>Ruta del Olivo, km 42<br/>Jaén, España</span>
               </li>
               <li className="flex items-center">
                 <Phone className="h-5 w-5 text-amber-500 mr-2 shrink-0" />
                 <span>+34 912 345 678</span>
               </li>
               <li className="flex items-center">
                 <Mail className="h-5 w-5 text-amber-500 mr-2 shrink-0" />
                 <span>hola@mundoliva.com</span>
               </li>
             </ul>
          </div>

        </div>
        
        <div className="border-t border-olive-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-olive-400">
          <p>&copy; {new Date().getFullYear()} Mundoliva. Todos los derechos reservados.</p>
          <div className="mt-4 md:mt-0 flex space-x-4">
             <span>Visa</span>
             <span>Mastercard</span>
             <span>PayPal</span>
             <span>Apple Pay</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
