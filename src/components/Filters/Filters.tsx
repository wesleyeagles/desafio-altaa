import { ArrowUpDown, Filter } from "lucide-react";
import type { SortOption } from "../../types/shared.types";

const Filters = ({
  categories,
  selectedCategory,
  onCategoryChange,
  sortOption,
  onSortChange,
}: {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  sortOption: SortOption;
  onSortChange: (sort: SortOption) => void;
}) => (
  <div className="bg-white rounded-lg shadow-md p-6 mb-8">
    <div className="grid md:grid-cols-2 gap-6">
      <div>
        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
          <Filter className="w-4 h-4" />
          Categoria
        </label>
        <select
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">Todas as categorias</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>
      </div>
      
      <div>
        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
          <ArrowUpDown className="w-4 h-4" />
          Ordenar por
        </label>
        <select
          value={sortOption}
          onChange={(e) => onSortChange(e.target.value as SortOption)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="name-asc">Nome (A-Z)</option>
          <option value="name-desc">Nome (Z-A)</option>
          <option value="price-asc">Preço (Menor para Maior)</option>
          <option value="price-desc">Preço (Maior para Menor)</option>
        </select>
      </div>
    </div>
  </div>
);

export default Filters;