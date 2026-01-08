import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import { api } from '../../services/api';
import useCategories from './useCategories';
import { mockCategories } from '../../mocks/category.mock';

vi.mock('../../services/api', () => ({
  api: {
    getCategories: vi.fn(),
  },
}));

describe('useCategories', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('deve iniciar com loading = true e categories vazio', () => {
    const { result } = renderHook(() => useCategories());

    expect(result.current.loading).toBe(true);
    expect(result.current.categories).toEqual([]);
  });

  it('deve buscar as categorias e atualizar o estado', async () => {
    vi.mocked(api.getCategories).mockResolvedValueOnce(mockCategories);

    const { result } = renderHook(() => useCategories());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(api.getCategories).toHaveBeenCalledTimes(1);
    expect(result.current.categories).toEqual(mockCategories);
  });

  it('deve tratar erro e finalizar loading', async () => {
    const consoleSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    vi.mocked(api.getCategories).mockRejectedValueOnce(
      new Error('Erro na API')
    );

    const { result } = renderHook(() => useCategories());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(api.getCategories).toHaveBeenCalledTimes(1);
    expect(result.current.categories).toEqual([]);
    expect(consoleSpy).toHaveBeenCalledWith(
      'Falha ao buscar categorias',
      expect.any(Error)
    );

    consoleSpy.mockRestore();
  });
});
