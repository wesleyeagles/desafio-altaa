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
      <h1>Produtos</h1>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            {product.title} - ${product.price}
          </li>
        ))}
      </ul>

      <h2>Categorias</h2>
      <ul>
        {categories.map((category, index) => (
          <li key={index}>{category}</li>
        ))}
      </ul>
    </div>
  )
}

export default App
