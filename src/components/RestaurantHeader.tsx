import { motion } from 'framer-motion';
import { Business } from '../types';

interface RestaurantHeaderProps {
  business: Business;
}

const RestaurantHeader: React.FC<RestaurantHeaderProps> = ({ business }) => {
  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-[100] border-b border-gray-100 bg-white/90 backdrop-blur-xl"
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="w-10 h-10 rounded-xl overflow-hidden border-2 border-primary/20 p-0.5">
            <img src={business.imageUrl} alt={business.name} className="w-full h-full object-cover rounded-lg" />
          </div>
          <div>
            <h1 className="font-display text-lg text-gray-900 font-bold tracking-tight leading-none mb-1">{business.name}</h1>
            <p className="text-[9px] text-gray-500 font-black uppercase tracking-[0.15em]">{business.address}</p>
          </div>
        </div>
        
        <div className="hidden md:flex items-center gap-6">
           <span className="text-[10px] font-black uppercase tracking-widest text-primary flex items-center gap-2">
             <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
             Buka Sekarang
           </span>
        </div>
      </div>
    </motion.header>
  );
};

export default RestaurantHeader;
