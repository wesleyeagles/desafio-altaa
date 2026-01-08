import { useMemo } from 'react';
import type { Product } from '../../types/product.types';
import type { SortOption } from '../../types/shared.types';

interface UseFilteredProductsParams {
  products: Product[];
  selectedCategory: string;
  sortOption: SortOption;
}

const useFilteredProducts = ({
  products,
  selectedCategory,
  sortOption,
}: UseFilteredProductsParams) => {
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products;

    if (selectedCategory) {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    const sorted = [...filtered].sort((a, b) => {
      switch (sortOption) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'name-asc':
          return a.title.localeCompare(b.title);
        case 'name-desc':
          return b.title.localeCompare(a.title);
        default:
          return 0;
      }
    });

    return sorted;
  }, [products, selectedCategory, sortOption]);

  return { filteredAndSortedProducts };
};

export default useFilteredProducts;