import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Utensils } from 'lucide-react';
import { apiService } from './services/api';
import { Business, Category, Product } from './types';
import ProductCard from './components/ProductCard';
import RestaurantHeader from './components/RestaurantHeader';
import SearchBar from './components/SearchBar';
import ProductModal from './components/ProductModal';
import { ProductSkeleton } from './components/SkeletonLoaders';
import './index.css';

function App() {
  const [business, setBusiness] = useState<Business | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // Modal State
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const fetchData = useCallback(async (query?: string) => {
    try {
      const [bizData, catData, prodData] = await Promise.all([
        apiService.getBusinessInfo(),
        apiService.getCategories(),
        apiService.getProducts(query),
      ]);
      setBusiness(bizData);
      setCategories(catData);
      setProducts(prodData);
      setFilteredProducts(prodData);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setTimeout(() => setLoading(false), 1000);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchData(searchQuery);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchQuery, fetchData]);

  useEffect(() => {
    let result = products || [];
    if (activeCategory) {
      result = result.filter(p => p.categoryId === activeCategory);
    }
    setFilteredProducts(result);
  }, [activeCategory, products]);

  return (
    <div className="min-h-screen bg-white selection:bg-primary/20 font-sans text-foreground">
      {business && <RestaurantHeader business={business} />}

      {/* Dynamic Header/Hero - Bright & Friendly */}
      <header className="relative py-24 md:py-40 text-center px-4 overflow-hidden border-b border-gray-100">
        {/* Background Accents - Soft & Warm */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1400px] h-[800px] bg-primary/5 blur-[120px] rounded-full opacity-60 pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-[600px] h-[600px] bg-accent/10 blur-[100px] rounded-full opacity-40 pointer-events-none" />
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "circOut" }}
          className="relative z-10 flex flex-col items-center gap-8"
        >
          <motion.div 
             initial={{ scale: 0.8, opacity: 0 }}
             animate={{ scale: 1, opacity: 1 }}
             transition={{ delay: 0.2, duration: 0.8 }}
             className="flex items-center justify-center gap-3 bg-primary/5 border border-primary/10 px-6 py-2 rounded-full"
          >
            <Utensils className="h-4 w-4 text-primary" />
            <span className="text-primary font-black tracking-[0.4em] uppercase text-[9px]">Servis Terbaik Sejak 2024</span>
          </motion.div>
          {business && (
             <h1 className="text-6xl md:text-[9rem] font-bold text-gray-900 font-display tracking-tighter leading-[0.85] py-4">
                {business.name.split(' ').map((word, i) => (
                   <motion.span 
                    key={i} 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + (i * 0.1), duration: 0.8 }}
                    className={i === 1 ? "luxury-gradient-text block md:inline" : "block md:inline"}
                  >
                    {word}{' '}
                  </motion.span>
                ))}
             </h1>
          )}
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="text-gray-600 text-lg md:text-2xl max-w-2xl mx-auto italic font-medium leading-relaxed mt-4 px-6"
          >
            Sajian lezat dengan bahan terpilih untuk kebahagiaan Anda sekeluarga.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-20"
        >
          <SearchBar onSearch={setSearchQuery} />
        </motion.div>
      </header>

      {/* Navigation - High Contrast Sticky */}
      <nav className="sticky top-20 z-50 py-4 bg-white/95 border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6">
           <div className="flex items-center justify-start gap-4 overflow-x-auto no-scrollbar pb-1">
              <button
                onClick={() => setActiveCategory(null)}
                className={`relative px-8 py-3 rounded-full text-[13px] font-black tracking-widest uppercase transition-all duration-300 whitespace-nowrap z-10 ${
                  activeCategory === null ? 'text-white' : 'text-gray-900 bg-gray-100 hover:bg-gray-200'
                }`}
              >
                {activeCategory === null && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-primary rounded-full -z-10 shadow-md"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
                Semua Menu
              </button>
              
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`relative px-8 py-3 rounded-full text-[13px] font-black tracking-widest uppercase transition-all duration-300 whitespace-nowrap z-10 ${
                    activeCategory === cat.id ? 'text-white' : 'text-gray-900 bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  {activeCategory === cat.id && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-primary rounded-full -z-10 shadow-md"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  {cat.name}
                </button>
              ))}
           </div>
        </div>
      </nav>

      {/* Main Grid - Brighter */}
      <main className="max-w-7xl mx-auto px-6 py-20 bg-gray-50/30">
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-16"
        >
          {loading ? (
            Array.from({ length: 6 }).map((_, i) => <ProductSkeleton key={i} />)
          ) : (
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((item) => (
                <ProductCard key={item.id} product={item} onClick={setSelectedProduct} />
              ))}
            </AnimatePresence>
          )}
        </motion.div>
      </main>

      <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />

      <footer className="bg-white py-32 border-t border-gray-100 mt-20 px-6">
        <div className="max-w-xl mx-auto text-center">
          <h4 className="font-display text-3xl text-gray-900 mb-6">Kedai Nusantara</h4>
          <p className="text-gray-500 text-sm leading-relaxed mb-12">
            Nikmati kehangatan cita rasa Nusantara dalam setiap sajian kami. Ramah di hati, lezat di lidah.
          </p>
          <div className="flex justify-center gap-12 text-[10px] font-black tracking-[0.4em] text-gray-400 uppercase">
             <a href="#" className="hover:text-primary transition-colors">Instagram</a>
             <a href="#" className="hover:text-primary transition-colors">Facebook</a>
             <a href="#" className="hover:text-primary transition-colors">WhatsApp</a>
          </div>
          <p className="mt-20 text-[10px] font-bold tracking-[0.3em] text-gray-300 uppercase">
            © 2024 Kedai Nusantara. Semua Hak Dilindungi.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
