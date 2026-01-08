import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import { api } from '../../services/api';
import useProducts from './useProducts';
import { mockProducts } from '../../mocks/product.mock';

vi.mock('../../services/api', () => ({
  api: {
    getProducts: vi.fn(),
  },
}));

describe('useProducts', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('deve iniciar com loading = true e products vazio', () => {
    const { result } = renderHook(() => useProducts());

    expect(result.current.loading).toBe(true);
    expect(result.current.products).toEqual([]);
  });

  it('deve buscar os produtos e atualizar o estado', async () => {
    vi.mocked(api.getProducts).mockResolvedValueOnce(mockProducts);

    const { result } = renderHook(() => useProducts());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(api.getProducts).toHaveBeenCalledTimes(1);
    expect(result.current.products).toEqual(mockProducts);
  });

  it('deve tratar erro e finalizar loading', async () => {
    const consoleSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    vi.mocked(api.getProducts).mockRejectedValueOnce(
      new Error('Erro na API')
    );

    const { result } = renderHook(() => useProducts());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(api.getProducts).toHaveBeenCalledTimes(1);
    expect(result.current.products).toEqual([]);
    expect(consoleSpy).toHaveBeenCalledWith(
      'Falha ao buscar produtos',
      expect.any(Error)
    );

    consoleSpy.mockRestore();
  });
});
