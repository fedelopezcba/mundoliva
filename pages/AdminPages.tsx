import React, { useState } from 'react';
import { useStore } from '../store/StoreContext';
import { Product } from '../types';
import { generateProductDescription } from '../services/geminiService';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Package, Users, TrendingUp, Settings, Plus, Edit, Trash, Sparkles } from 'lucide-react';
import { Button } from '../components/Shared';

export const AdminDashboard: React.FC = () => {
  const { products, orders, isAdminMode, deleteProduct, addProduct, updateProduct } = useStore();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'products' | 'orders'>('dashboard');

  // Products State
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Partial<Product>>({});
  const [isGenerating, setIsGenerating] = useState(false);

  if (!isAdminMode) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-earth-50">
            <div className="text-center p-8 bg-white shadow-lg rounded-xl">
                <h2 className="text-2xl font-bold text-red-600 mb-2">Acceso Restringido</h2>
                <p>No tienes permisos para ver esta área.</p>
            </div>
        </div>
    )
  }

  /* --- ACTIONS --- */
  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentProduct.id && products.find(p => p.id === currentProduct.id)) {
        updateProduct(currentProduct as Product);
    } else {
        addProduct({ ...currentProduct, id: Math.random().toString(36).substr(2, 9), image: `https://picsum.photos/seed/${Math.random()}/400/400` } as Product);
    }
    setIsEditing(false);
    setCurrentProduct({});
  };

  const handleAIGenerate = async () => {
    if(!currentProduct.name || !currentProduct.brand) {
        alert("Por favor ingresa Nombre y Marca primero.");
        return;
    }
    setIsGenerating(true);
    // Simulating nuances input for demo simplicity
    const desc = await generateProductDescription(currentProduct.name, currentProduct.brand, "frutado intenso, picante medio");
    setCurrentProduct({...currentProduct, description: desc});
    setIsGenerating(false);
  };

  /* --- VIEWS --- */
  const renderDashboard = () => {
    // Mock Data for chart
    const data = [
      { name: 'Ene', sales: 4000 },
      { name: 'Feb', sales: 3000 },
      { name: 'Mar', sales: 2000 },
      { name: 'Abr', sales: 2780 },
      { name: 'May', sales: 1890 },
      { name: 'Jun', sales: 2390 },
      { name: 'Jul', sales: 3490 },
    ];

    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-earth-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-earth-500 font-medium">Ventas Totales</h3>
              <TrendingUp className="text-green-500" />
            </div>
            <p className="text-3xl font-bold text-olive-900">12,450€</p>
            <span className="text-green-600 text-sm font-semibold">+15% vs mes anterior</span>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-earth-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-earth-500 font-medium">Pedidos Activos</h3>
              <Package className="text-amber-500" />
            </div>
            <p className="text-3xl font-bold text-olive-900">{orders.length}</p>
            <span className="text-earth-400 text-sm">3 pendientes de envío</span>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-earth-100">
             <div className="flex items-center justify-between mb-4">
              <h3 className="text-earth-500 font-medium">Productos</h3>
              <Settings className="text-blue-500" />
            </div>
            <p className="text-3xl font-bold text-olive-900">{products.length}</p>
            <span className="text-earth-400 text-sm">En catálogo activo</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-earth-100 h-96">
            <h3 className="text-lg font-bold text-olive-900 mb-6">Rendimiento de Ventas (Últimos 6 meses)</h3>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip cursor={{fill: '#f7fee7'}} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }} />
                <Bar dataKey="sales" fill="#65a30d" radius={[4, 4, 0, 0]} barSize={40} />
                </BarChart>
            </ResponsiveContainer>
        </div>
      </div>
    );
  };

  const renderProductManager = () => {
    if (isEditing) {
        return (
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl mx-auto animate-fade-in">
                <h3 className="text-2xl font-serif font-bold text-olive-900 mb-6">{currentProduct.id ? 'Editar Producto' : 'Nuevo Producto'}</h3>
                <form onSubmit={handleSaveProduct} className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-earth-700 mb-1">Nombre</label>
                            <input type="text" className="w-full border rounded p-2" value={currentProduct.name || ''} onChange={e => setCurrentProduct({...currentProduct, name: e.target.value})} required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-earth-700 mb-1">Marca</label>
                            <input type="text" className="w-full border rounded p-2" value={currentProduct.brand || ''} onChange={e => setCurrentProduct({...currentProduct, brand: e.target.value})} required />
                        </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-earth-700 mb-1">Precio (€)</label>
                            <input type="number" step="0.01" className="w-full border rounded p-2" value={currentProduct.price || ''} onChange={e => setCurrentProduct({...currentProduct, price: parseFloat(e.target.value)})} required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-earth-700 mb-1">Tamaño</label>
                            <input type="text" className="w-full border rounded p-2" value={currentProduct.size || ''} onChange={e => setCurrentProduct({...currentProduct, size: e.target.value})} required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-earth-700 mb-1">Stock</label>
                            <input type="number" className="w-full border rounded p-2" value={currentProduct.stock || ''} onChange={e => setCurrentProduct({...currentProduct, stock: parseInt(e.target.value)})} required />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-earth-700 mb-1">Acidez (%)</label>
                        <input type="number" step="0.1" className="w-full border rounded p-2" value={currentProduct.acidity || ''} onChange={e => setCurrentProduct({...currentProduct, acidity: parseFloat(e.target.value)})} required />
                    </div>
                    
                    {/* GEMINI INTEGRATION */}
                    <div className="bg-olive-50 p-4 rounded-md border border-olive-100">
                        <div className="flex justify-between items-center mb-2">
                            <label className="block text-sm font-bold text-olive-800">Descripción</label>
                            <button 
                                type="button" 
                                onClick={handleAIGenerate}
                                disabled={isGenerating}
                                className="text-xs flex items-center bg-white border border-olive-200 px-3 py-1 rounded-full text-olive-700 hover:bg-olive-100 transition-colors"
                            >
                                <Sparkles size={14} className="mr-1 text-amber-500" />
                                {isGenerating ? 'Generando...' : 'Generar con IA'}
                            </button>
                        </div>
                        <textarea 
                            className="w-full border border-olive-200 rounded p-3 h-24 focus:ring-2 focus:ring-olive-500 focus:outline-none" 
                            value={currentProduct.description || ''} 
                            onChange={e => setCurrentProduct({...currentProduct, description: e.target.value})} 
                        />
                        <p className="text-xs text-olive-600 mt-2 italic">
                            Tip: Usa el botón de IA para crear descripciones persuasivas automáticamente.
                        </p>
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t border-earth-100">
                        <Button type="button" variant="ghost" onClick={() => { setIsEditing(false); setCurrentProduct({}); }}>Cancelar</Button>
                        <Button type="submit">Guardar Producto</Button>
                    </div>
                </form>
            </div>
        )
    }

    return (
        <div className="bg-white rounded-lg shadow-sm border border-earth-100 overflow-hidden">
            <div className="p-6 border-b border-earth-100 flex justify-between items-center bg-earth-50">
                <h3 className="font-bold text-olive-900 text-lg">Inventario Actual</h3>
                <Button onClick={() => { setCurrentProduct({}); setIsEditing(true); }} className="flex items-center gap-2">
                    <Plus size={18} /> Nuevo Producto
                </Button>
            </div>
            <table className="w-full">
                <thead className="bg-earth-100 text-earth-600 text-sm uppercase">
                    <tr>
                        <th className="p-4 text-left">Producto</th>
                        <th className="p-4 text-left">Marca</th>
                        <th className="p-4 text-right">Precio</th>
                        <th className="p-4 text-right">Stock</th>
                        <th className="p-4 text-center">Acciones</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-earth-100">
                    {products.map(product => (
                        <tr key={product.id} className="hover:bg-earth-50 transition-colors">
                            <td className="p-4 font-medium text-olive-900">{product.name}</td>
                            <td className="p-4 text-earth-600">{product.brand}</td>
                            <td className="p-4 text-right font-mono">{product.price.toFixed(2)}€</td>
                            <td className="p-4 text-right">
                                <span className={`px-2 py-1 rounded-full text-xs font-bold ${product.stock < 10 ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-700'}`}>
                                    {product.stock}
                                </span>
                            </td>
                            <td className="p-4">
                                <div className="flex justify-center gap-2">
                                    <button onClick={() => { setCurrentProduct(product); setIsEditing(true); }} className="p-2 text-blue-600 hover:bg-blue-50 rounded">
                                        <Edit size={18} />
                                    </button>
                                    <button onClick={() => { if(confirm('¿Eliminar producto?')) deleteProduct(product.id) }} className="p-2 text-red-600 hover:bg-red-50 rounded">
                                        <Trash size={18} />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
  };

  return (
    <div className="bg-earth-50 min-h-screen">
      <div className="bg-olive-900 text-white pb-24 pt-12 px-8">
        <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-serif font-bold">Panel de Administración</h1>
            <p className="text-olive-300 mt-2">Gestiona tu tienda, inventario y contenido.</p>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16">
        <div className="flex gap-4 mb-6">
            <button 
                onClick={() => setActiveTab('dashboard')}
                className={`px-6 py-3 rounded-lg font-medium shadow-sm transition-all ${activeTab === 'dashboard' ? 'bg-white text-olive-900 translate-y-[-2px]' : 'bg-olive-800 text-olive-200'}`}
            >
                Resumen
            </button>
            <button 
                onClick={() => setActiveTab('products')}
                className={`px-6 py-3 rounded-lg font-medium shadow-sm transition-all ${activeTab === 'products' ? 'bg-white text-olive-900 translate-y-[-2px]' : 'bg-olive-800 text-olive-200'}`}
            >
                Productos
            </button>
            <button 
                onClick={() => setActiveTab('orders')}
                className={`px-6 py-3 rounded-lg font-medium shadow-sm transition-all ${activeTab === 'orders' ? 'bg-white text-olive-900 translate-y-[-2px]' : 'bg-olive-800 text-olive-200'}`}
            >
                Pedidos
            </button>
        </div>

        {activeTab === 'dashboard' && renderDashboard()}
        {activeTab === 'products' && renderProductManager()}
        {activeTab === 'orders' && (
            <div className="bg-white p-12 text-center rounded-lg shadow-sm text-earth-500">
                <Package className="mx-auto h-12 w-12 mb-4 text-earth-300" />
                <h3 className="text-lg font-bold mb-2">Gestión de Pedidos</h3>
                <p>Lista de pedidos simulada (Funcionalidad completa en versión pro).</p>
            </div>
        )}
      </div>
    </div>
  );
};
