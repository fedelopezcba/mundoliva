import React from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { StoreProvider } from './store/StoreContext';
import { Navbar, Footer } from './components/Shared';
import { HomePage, ShopPage, CartPage } from './pages/PublicPages';
import { AdminDashboard } from './pages/AdminPages';

// Scroll to top on route change wrapper
const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Placeholder pages for simpler components
const AboutPage = () => (
  <div className="max-w-4xl mx-auto py-24 px-6 text-center">
    <h1 className="text-4xl font-serif font-bold text-olive-900 mb-6">Nuestra Historia</h1>
    <p className="text-xl text-earth-600 leading-relaxed">
      Nacimos entre olivos centenarios. Mundoliva es el fruto de tres generaciones dedicadas a la tierra. 
      Creemos en el respeto por la naturaleza y en la paciencia que requiere la excelencia.
    </p>
    <div className="mt-12 p-8 bg-earth-100 rounded-lg">
        <p className="italic font-serif text-olive-800">"El aceite no se fabrica, el aceite nace."</p>
    </div>
  </div>
);

const ContactPage = () => (
  <div className="max-w-2xl mx-auto py-24 px-6">
    <h1 className="text-4xl font-serif font-bold text-olive-900 mb-8 text-center">Contacto</h1>
    <form className="space-y-6 bg-white p-8 rounded-xl shadow-sm border border-earth-100">
        <div>
            <label className="block text-sm font-medium text-earth-700 mb-1">Nombre</label>
            <input type="text" className="w-full px-4 py-3 rounded-lg border border-earth-300 focus:ring-2 focus:ring-olive-500 outline-none" />
        </div>
        <div>
            <label className="block text-sm font-medium text-earth-700 mb-1">Email</label>
            <input type="email" className="w-full px-4 py-3 rounded-lg border border-earth-300 focus:ring-2 focus:ring-olive-500 outline-none" />
        </div>
         <div>
            <label className="block text-sm font-medium text-earth-700 mb-1">Mensaje</label>
            <textarea className="w-full px-4 py-3 rounded-lg border border-earth-300 focus:ring-2 focus:ring-olive-500 outline-none h-32"></textarea>
        </div>
        <button className="w-full bg-olive-800 text-white font-bold py-3 rounded-lg hover:bg-olive-900 transition-colors">Enviar Mensaje</button>
    </form>
  </div>
);

const App: React.FC = () => {
  return (
    <StoreProvider>
      <Router>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen font-sans bg-earth-50 text-earth-900">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/shop" element={<ShopPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="*" element={<HomePage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </StoreProvider>
  );
};

export default App;
