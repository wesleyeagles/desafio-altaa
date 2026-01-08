import { Star } from "lucide-react";
import type { Product } from "../../../types/product.types";

const ProductCard = ({ product, onClick }: { product: Product; onClick: () => void }) => (
  <div
    role="button"
    onClick={onClick}
    className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all cursor-pointer overflow-hidden group"
  >
    <div className="aspect-square bg-gray-100 flex items-center justify-center p-6 overflow-hidden">
      <img
        src={product.image}
        alt={product.title}
        className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
      />
    </div>
    <div className="p-4">
      <span className="text-xs font-medium text-blue-600 uppercase tracking-wide">
        {product.category}
      </span>
      <h3 className="font-semibold text-gray-800 mt-2 mb-3 line-clamp-2 min-h-12">
        {product.title}
      </h3>
      <div className="flex items-center justify-between">
        <span className="text-2xl font-bold text-gray-900">
          ${product.price.toFixed(2)}
        </span>
        <div className="flex items-center gap-1">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <span className="text-sm font-medium text-gray-700">{product.rating.rate}</span>
          <span className="text-sm text-gray-500">({product.rating.count})</span>
        </div>
      </div>
    </div>
  </div>
);

export default ProductCard