import EmptyState from "./components/EmptyState/EmptyState";
import ProductCard from "./components/Product/ProductCard/ProductCard";
import useCategories from "./hooks/useCategories/useCategories";
import useProducts from "./hooks/useProducts/useProducts";

const App = () => {
  const { products, loading } = useProducts();
  const { categories } = useCategories();

  if (loading) {
    return <div>Carregando...</div>
  }

  return (
   <div>
    <h1 className="text-2xl font-bold mb-4">Produtos</h1>
    {products.length === 0 ? (
      <EmptyState message="Nenhum produto encontrado" />
    ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard product={product} key={product.id} onClick={() => {}} />
        ))}
      </div>
    )}
   </div>
  )
}

export default App
