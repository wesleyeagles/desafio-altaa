import { ShoppingCart, Star, X } from "lucide-react";
import type { Product } from "../../../types/product.types";

const ProductDetail = ({ product, onClose }: { product: Product; onClose: () => void }) => (
  <div className="fixed inset-0 backdrop-brightness-50 backdrop-blur-lg bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
    <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition z-10"
        aria-label="Close"
      >
        <X className="w-6 h-6" />
      </button>
      
      <div className="grid md:grid-cols-2 gap-8 p-8">
        <div className="bg-gray-100 rounded-xl p-8 flex items-center justify-center">
          <img
            src={product.image}
            alt={product.title}
            className="max-w-full max-h-100 object-contain"
          />
        </div>
        
        <div>
          <span className="text-sm font-semibold text-blue-600 uppercase tracking-wide">
            {product.category}
          </span>
          <h1 className="text-3xl font-bold text-gray-900 mt-2 mb-4">{product.title}</h1>
          
          <div className="flex items-center gap-2 mb-6">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.round(product.rating.rate)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-lg font-medium text-gray-700">{product.rating.rate}</span>
            <span className="text-gray-500">({product.rating.count} reviews)</span>
          </div>
          
          <div className="text-4xl font-bold text-gray-900 mb-6">
            ${product.price.toFixed(2)}
          </div>
          
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Description</h2>
            <p className="text-gray-700 leading-relaxed">{product.description}</p>
          </div>
          
          <button className="w-full bg-blue-600 text-white py-4 rounded-xl font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2">
            <ShoppingCart className="w-5 h-5" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default ProductDetail;