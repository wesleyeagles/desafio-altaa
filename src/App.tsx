import { useState } from "react";
import EmptyState from "./components/EmptyState/EmptyState";
import ProductDetail from "./components/Product/ProductDetail/ProductDetail";
import useProducts from "./hooks/useProducts/useProducts";
import type { Product } from "./types/product.types";
import LoadingSpinner from "./components/LoadingSpinner/LoadingSpinner";
import { ShoppingCart } from "lucide-react";
import ProductCard from "./components/Product/ProductCard/ProductCard";


const App = () => {
  const { products, loading } = useProducts();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <ShoppingCart className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Desafio Altaa Digital</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {products.length === 0 ? (
          <EmptyState message="Nenhum produto encontrado" />
        ) : (
          <>
            <div className="mb-4 text-sm text-gray-600">
              Mostrando {products.length} produto{products.length !== 1 ? 's' : ''}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onClick={() => setSelectedProduct(product)}
                />
              ))}
            </div>
          </>
        )}
      </main>

      {selectedProduct && (
        <ProductDetail
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
)}

export default App
