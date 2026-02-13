
import { motion } from 'framer-motion';
import { Product } from '../types';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';

interface ProductCardProps {
  product: Product;
  onClick: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  const formattedPrice = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(Number(product.price));

  const badge = product.category.name.toLowerCase().includes('lalapan') ? 'Favorit' : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      onClick={() => onClick(product)}
      className="cursor-pointer group"
    >
      <Card className="bg-white border border-gray-100 rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500">
        <div className="relative overflow-hidden aspect-[4/3] w-full bg-gray-50">
          <motion.img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          
          {badge && (
            <Badge className="absolute top-4 left-4 bg-accent text-gray-900 border-none px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest shadow-lg">
              {badge}
            </Badge>
          )}

          <div className="absolute bottom-4 right-4 bg-primary px-4 py-2 rounded-xl">
             <span className="text-white font-black text-sm">{formattedPrice}</span>
          </div>
        </div>
        
        <CardContent className="p-8">
          <div className="flex flex-col gap-3">
             <span className="text-[9px] font-black uppercase tracking-[0.2em] text-primary/60">{product.category.name}</span>
            <h3 className="font-bold text-2xl text-gray-900 font-display leading-tight group-hover:text-primary transition-colors duration-300">
              {product.name}
            </h3>
            <p className="text-gray-500 text-sm line-clamp-2 font-medium leading-relaxed">
              {product.description || 'Hidangan spesial Nusantara, diolah dengan cinta dan rempah pilihan.'}
            </p>
            <div className="flex items-center justify-between mt-4">
               <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-primary transition-all duration-300">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 group-hover:text-white"><path d="M5 12h14"></path><path d="M12 5l7 7-7 7"></path></svg>
               </div>
               <span className="text-[10px] font-black uppercase tracking-widest text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">Lihat Detail</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ProductCard;
