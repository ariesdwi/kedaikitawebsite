import { Search } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  return (
    <div className="relative max-w-xl mx-auto px-4 mb-12">
      <div className="bg-white border-2 border-gray-100 rounded-2xl flex items-center px-6 py-1 shadow-sm">
        <Search size={20} className="text-gray-400 mr-4" />
        <input 
          type="text"
          placeholder="Mau makan apa hari ini?"
          onChange={(e) => onSearch(e.target.value)}
          className="bg-transparent border-none focus:ring-0 text-gray-900 placeholder:text-gray-400 w-full py-4 text-base font-medium"
        />
      </div>
    </div>
  );
};

export default SearchBar;
