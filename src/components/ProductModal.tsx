import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Product } from '../types';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, onClose }) => {

  if (!product) return null;

  const formattedPrice = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(Number(product.price));

  return (
    <AnimatePresence>
      {product && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <motion.div 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
             onClick={onClose}
             className="absolute inset-0 bg-gray-900/60 backdrop-blur-md" 
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', bounce: 0.3, duration: 0.6 }}
            className="relative w-full max-w-4xl bg-white rounded-[3rem] overflow-hidden shadow-2xl flex flex-col md:flex-row"
          >
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 z-10 w-12 h-12 bg-white border border-gray-100 rounded-full flex items-center justify-center text-gray-900 hover:bg-primary hover:text-white shadow-lg transition-all duration-300"
            >
              <X size={20} />
            </button>

            <div className="w-full md:w-1/2 aspect-square md:aspect-auto">
              <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
            </div>

            <div className="w-full md:w-1/2 p-10 md:p-14 flex flex-col justify-center">
              <span className="text-primary font-black uppercase tracking-[0.3em] text-[10px] mb-4">{product.category.name}</span>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-display leading-tight">{product.name}</h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-10 font-medium">{product.description || 'Hidangan istimewa Nusantara yang diolah dengan resep tradisional dan bahan pilihan terbaik.'}</p>
              
              <div className="flex flex-col gap-8">
                <div className="text-4xl font-black text-primary tracking-tighter">{formattedPrice}</div>

                <button 
                  onClick={onClose}
                  className="w-full bg-primary text-white py-5 rounded-[2rem] font-black uppercase tracking-widest text-xs hover:bg-gray-900 transition-all duration-500 shadow-xl shadow-primary/20 active:scale-95"
                >
                  Kembali ke Menu
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ProductModal;
