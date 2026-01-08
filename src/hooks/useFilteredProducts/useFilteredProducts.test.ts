import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { mockProducts } from '../../mocks/product.mock';
import useFilteredProducts from './useFilteredProducts';

describe('useFilteredProducts', () => {
  it('deve retornar todos os produtos sem filtros', () => {
    const { result } = renderHook(() =>
      useFilteredProducts({
        products: mockProducts,
        selectedCategory: '',
        sortOption: 'name-asc',
      })
    );

    expect(result.current.filteredAndSortedProducts).toHaveLength(3);
  });

  it('deve filtrar por categoria', () => {
    const { result } = renderHook(() =>
      useFilteredProducts({
        products: mockProducts,
        selectedCategory: 'electronics',
        sortOption: 'name-asc',
      })
    );

    expect(result.current.filteredAndSortedProducts).toHaveLength(2);
    expect(result.current.filteredAndSortedProducts.every(p => p.category === 'electronics')).toBe(true);
  });

  it('deve ordenar por nome ascendente', () => {
    const { result } = renderHook(() =>
      useFilteredProducts({
        products: mockProducts,
        selectedCategory: '',
        sortOption: 'name-asc',
      })
    );

    const titles = result.current.filteredAndSortedProducts.map(p => p.title);
    expect(titles).toEqual(['Alpha Product', 'Beta Product', 'Zebra Product']);
  });

  it('deve ordenar por preço descendente', () => {
    const { result } = renderHook(() =>
      useFilteredProducts({
        products: mockProducts,
        selectedCategory: '',
        sortOption: 'price-desc',
      })
    );

    const prices = result.current.filteredAndSortedProducts.map(p => p.price);
    expect(prices).toEqual([150, 100, 50]);
  });

  it('deve ordenar por nome descendente', () => {
    const { result } = renderHook(() =>
      useFilteredProducts({
        products: mockProducts,
        selectedCategory: '',
        sortOption: 'name-desc',
      })
    );

    const titles = result.current.filteredAndSortedProducts.map(p => p.title);
    expect(titles).toEqual(['Zebra Product', 'Beta Product', 'Alpha Product']);
  });

  it('deve ordenar por preço ascendente', () => {
    const { result } = renderHook(() =>
      useFilteredProducts({
        products: mockProducts,
        selectedCategory: '',
        sortOption: 'price-asc',
      })
    );

    const prices = result.current.filteredAndSortedProducts.map(p => p.price);
    expect(prices).toEqual([50, 100, 150]);
  });
});