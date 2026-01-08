import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useCartAnimation } from './useCartAnimation';

describe('useCartAnimation', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    document.body.innerHTML = '';
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('deve iniciar com isAnimating false', () => {
    const { result } = renderHook(() => useCartAnimation());

    expect(result.current.isAnimating).toBe(false);
    expect(result.current.imageRef.current).toBeNull();
  });

  it('deve executar callback se imageRef não estiver definido', () => {
    const { result } = renderHook(() => useCartAnimation());
    const callback = vi.fn();

    act(() => {
      result.current.animateToCart(callback);
    });

    expect(result.current.isAnimating).toBe(false);
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('deve executar callback se botão do carrinho não existir', () => {
    const { result } = renderHook(() => useCartAnimation());
    const callback = vi.fn();

    // Mock imageRef
    const mockImage = document.createElement('img');
    Object.defineProperty(result.current.imageRef, 'current', {
      writable: true,
      value: mockImage,
    });

    act(() => {
      result.current.animateToCart(callback);
    });

    expect(result.current.isAnimating).toBe(false);
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('deve criar clone e animar para o carrinho', () => {
    const { result } = renderHook(() => useCartAnimation());
    const callback = vi.fn();

    // Setup DOM
    const mockImage = document.createElement('img');
    mockImage.getBoundingClientRect = vi.fn(() => ({
      left: 100,
      top: 100,
      width: 200,
      height: 200,
      right: 300,
      bottom: 300,
      x: 100,
      y: 100,
      toJSON: () => {},
    }));

    const mockCartButton = document.createElement('button');
    mockCartButton.setAttribute('aria-label', 'Carrinho de compras');
    mockCartButton.getBoundingClientRect = vi.fn(() => ({
      left: 500,
      top: 50,
      width: 40,
      height: 40,
      right: 540,
      bottom: 90,
      x: 500,
      y: 50,
      toJSON: () => {},
    }));

    document.body.appendChild(mockCartButton);

    Object.defineProperty(result.current.imageRef, 'current', {
      writable: true,
      value: mockImage,
    });

    act(() => {
      result.current.animateToCart(callback);
    });

    expect(result.current.isAnimating).toBe(true);

    // Avança timers
    act(() => {
      vi.advanceTimersByTime(600);
    });

    expect(result.current.isAnimating).toBe(false);
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('deve limpar clone após animação', () => {
    const { result } = renderHook(() => useCartAnimation());

    const mockImage = document.createElement('img');
    mockImage.getBoundingClientRect = vi.fn(() => ({
      left: 100,
      top: 100,
      width: 200,
      height: 200,
      right: 300,
      bottom: 300,
      x: 100,
      y: 100,
      toJSON: () => {},
    }));

    const mockCartButton = document.createElement('button');
    mockCartButton.setAttribute('aria-label', 'Carrinho de compras');
    mockCartButton.getBoundingClientRect = vi.fn(() => ({
      left: 500,
      top: 50,
      width: 40,
      height: 40,
      right: 540,
      bottom: 90,
      x: 500,
      y: 50,
      toJSON: () => {},
    }));

    document.body.appendChild(mockCartButton);

    Object.defineProperty(result.current.imageRef, 'current', {
      writable: true,
      value: mockImage,
    });

    act(() => {
      result.current.animateToCart();
    });

    // Verifica que clone foi adicionado
    expect(document.body.children.length).toBeGreaterThan(1);

    // Avança timers
    act(() => {
      vi.advanceTimersByTime(600);
    });

    // Clone deve ter sido removido
    expect(document.querySelectorAll('img').length).toBe(0);
  });
});