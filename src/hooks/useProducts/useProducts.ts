import { useEffect, useState } from "react";
import { api } from "../../services/api";
import type { Product } from "../../types/product.types";

const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await api.getProducts();
        setProducts(data);
      } catch (err) {
        console.error('Falha ao buscar produtos', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { products, loading };
};

export default useProducts;