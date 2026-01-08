import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import type { Product } from '../types/product.types';
import { CartProvider, useCart } from './CartContext';

const mockProduct: Product = {
  id: 1,
  title: 'Produto Teste',
  price: 99.99,
  description: 'Descrição teste',
  category: 'electronics',
  image: 'https://example.com/image.jpg',
  rating: { rate: 4.5, count: 100 },
};

const mockProduct2: Product = {
  id: 2,
  title: 'Produto Teste 2',
  price: 149.99,
  description: 'Descrição teste 2',
  category: 'jewelery',
  image: 'https://example.com/image2.jpg',
  rating: { rate: 4.8, count: 200 },
};

describe('CartContext', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('deve iniciar com carrinho vazio', () => {
    const { result } = renderHook(() => useCart(), {
      wrapper: CartProvider,
    });

    expect(result.current.items).toEqual([]);
    expect(result.current.totalItems).toBe(0);
    expect(result.current.totalPrice).toBe(0);
  });

  it('deve adicionar produto ao carrinho', () => {
    const { result } = renderHook(() => useCart(), {
      wrapper: CartProvider,
    });

    act(() => {
      result.current.addToCart(mockProduct);
    });

    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0]).toEqual({ ...mockProduct, quantity: 1 });
    expect(result.current.totalItems).toBe(1);
    expect(result.current.totalPrice).toBe(99.99);
  });

  it('deve incrementar quantidade se produto já existe', () => {
    const { result } = renderHook(() => useCart(), {
      wrapper: CartProvider,
    });

    act(() => {
      result.current.addToCart(mockProduct);
      result.current.addToCart(mockProduct);
    });

    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].quantity).toBe(2);
    expect(result.current.totalItems).toBe(2);
    expect(result.current.totalPrice).toBe(199.98);
  });

  it('deve adicionar múltiplos produtos diferentes', () => {
    const { result } = renderHook(() => useCart(), {
      wrapper: CartProvider,
    });

    act(() => {
      result.current.addToCart(mockProduct);
      result.current.addToCart(mockProduct2);
    });

    expect(result.current.items).toHaveLength(2);
    expect(result.current.totalItems).toBe(2);
    expect(result.current.totalPrice).toBeCloseTo(249.98);
  });

  it('deve remover produto do carrinho', () => {
    const { result } = renderHook(() => useCart(), {
      wrapper: CartProvider,
    });

    act(() => {
      result.current.addToCart(mockProduct);
      result.current.addToCart(mockProduct2);
    });

    act(() => {
      result.current.removeFromCart(1);
    });

    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].id).toBe(2);
    expect(result.current.totalItems).toBe(1);
  });

  it('deve atualizar quantidade do produto', () => {
    const { result } = renderHook(() => useCart(), {
      wrapper: CartProvider,
    });

    act(() => {
      result.current.addToCart(mockProduct);
    });

    act(() => {
      result.current.updateQuantity(1, 5);
    });

    expect(result.current.items[0].quantity).toBe(5);
    expect(result.current.totalItems).toBe(5);
    expect(result.current.totalPrice).toBe(499.95);
  });

  it('deve remover produto se quantidade for menor que 1', () => {
    const { result } = renderHook(() => useCart(), {
      wrapper: CartProvider,
    });

    act(() => {
      result.current.addToCart(mockProduct);
    });

    act(() => {
      result.current.updateQuantity(1, 0);
    });

    expect(result.current.items).toHaveLength(0);
  });

  it('deve limpar todo o carrinho', () => {
    const { result } = renderHook(() => useCart(), {
      wrapper: CartProvider,
    });

    act(() => {
      result.current.addToCart(mockProduct);
      result.current.addToCart(mockProduct2);
    });

    act(() => {
      result.current.clearCart();
    });

    expect(result.current.items).toHaveLength(0);
    expect(result.current.totalItems).toBe(0);
    expect(result.current.totalPrice).toBe(0);
  });

  it('deve calcular total de itens corretamente', () => {
    const { result } = renderHook(() => useCart(), {
      wrapper: CartProvider,
    });

    act(() => {
      result.current.addToCart(mockProduct);
      result.current.addToCart(mockProduct);
      result.current.addToCart(mockProduct2);
    });

    expect(result.current.totalItems).toBe(3); // 2 do produto1 + 1 do produto2
  });

  it('deve calcular preço total corretamente', () => {
    const { result } = renderHook(() => useCart(), {
      wrapper: CartProvider,
    });

    act(() => {
      result.current.addToCart(mockProduct); // 99.99
      result.current.addToCart(mockProduct); // 99.99
      result.current.addToCart(mockProduct2); // 149.99
    });

    expect(result.current.totalPrice).toBeCloseTo(349.97, 2);
  });

  it('deve persistir no localStorage', () => {
    const { result } = renderHook(() => useCart(), {
      wrapper: CartProvider,
    });

    act(() => {
      result.current.addToCart(mockProduct);
    });

    const saved = localStorage.getItem('cart');
    expect(saved).toBeTruthy();
    const parsed = JSON.parse(saved!);
    expect(parsed).toHaveLength(1);
    expect(parsed[0].id).toBe(1);
  });

  it('deve carregar do localStorage ao iniciar', () => {
    const initialData = [{ ...mockProduct, quantity: 3 }];
    localStorage.setItem('cart', JSON.stringify(initialData));

    const { result } = renderHook(() => useCart(), {
      wrapper: CartProvider,
    });

    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].quantity).toBe(3);
    expect(result.current.totalItems).toBe(3);
  });

  it('deve lançar erro se usado fora do Provider', () => {
    expect(() => {
      renderHook(() => useCart());
    }).toThrow('useCart deve ser usado dentro de CartProvider');
  });
});