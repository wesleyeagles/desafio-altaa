import { useState } from "react";
import EmptyState from "./components/EmptyState/EmptyState";
import ProductDetail from "./components/Product/ProductDetail/ProductDetail";
import useProducts from "./hooks/useProducts/useProducts";
import type { Product } from "./types/product.types";
import LoadingSpinner from "./components/LoadingSpinner/LoadingSpinner";
import { ShoppingCart } from "lucide-react";
import ProductCard from "./components/Product/ProductCard/ProductCard";
import useCategories from "./hooks/useCategories/useCategories";
import Filters from "./components/Filters/Filters";
import type { SortOption } from "./types/shared.types";
import useFilteredProducts from "./hooks/useFilteredProducts/useFilteredProducts";
import CartButton from "./components/Cart/CartButton/CartButton";
import CartDrawer from "./components/Cart/CartDrawer/CartDrawer";

const App = () => {
  const { products, loading } = useProducts();
  const { categories } = useCategories();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortOption, setSortOption] = useState<SortOption>('name-asc');
  const [cartOpen, setCartOpen] = useState(false);

  const { filteredAndSortedProducts } = useFilteredProducts({
    products,
    selectedCategory,
    sortOption,
  });

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
                <div className="bg-linear-to-r from-emerald-500 to-emerald-900 p-2 rounded-xl">
                  <ShoppingCart className="w-8 h-8 text-blue-600" color="#FFF" />
                </div>
              <h1 className="text-3xl font-bold text-gray-900">Desafio Altaa Digital</h1>
            </div>
            <CartButton onClick={() => setCartOpen(true)} />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <Filters
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          sortOption={sortOption}
          onSortChange={setSortOption}
        />

        {filteredAndSortedProducts.length === 0 ? (
          <EmptyState message="Nenhum produto encontrado" />
        ) : (
          <>
            <div className="mb-4 text-sm text-gray-600">
              Mostrando {filteredAndSortedProducts.length} produto{filteredAndSortedProducts.length !== 1 ? 's' : ''}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredAndSortedProducts.map((product) => (
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

      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </div>
)}

export default App
