import EmptyState from "./components/EmptyState/EmptyState";
import ErrorState from "./components/ErrorState/ErrorState";
import LoadingSpinner from "./components/LoadingSpinner/LoadingSpinner";
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
    <EmptyState message="Nenhum produto encontrado" />
   </div>
  )
}

export default App
