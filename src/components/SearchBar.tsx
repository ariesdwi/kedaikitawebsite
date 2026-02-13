import { Search } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  return (
    <div className="relative max-w-2xl mx-auto px-6 mb-16">
      <div className="bg-white border border-gray-100 p-2 rounded-full flex items-center gap-4 group transition-all duration-300 shadow-sm hover:shadow-xl focus-within:ring-4 focus-within:ring-primary/5 focus-within:border-primary">
        <div className="pl-6 text-primary transition-colors">
          <Search size={22} className="stroke-[3]" />
        </div>
        <input 
          type="text"
          placeholder="Cari menu favorit Anda..."
          onChange={(e) => onSearch(e.target.value)}
          className="bg-transparent border-none focus:ring-0 text-gray-900 placeholder:text-gray-400 w-full pr-8 py-4 text-base font-bold"
        />
      </div>
    </div>
  );
};

export default SearchBar;
