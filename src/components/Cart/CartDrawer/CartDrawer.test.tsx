import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { ICartItem } from '../../../types/cart.types';
import { CartProvider } from '../../../contexts/CartContext';
import CartDrawer from './CartDrawer';

const mockItem: ICartItem = {
  id: 1,
  title: 'Produto 1',
  price: 50.00,
  description: 'Desc',
  category: 'test',
  image: 'img.jpg',
  rating: { rate: 5, count: 10 },
  quantity: 2,
};

const renderWithCart = (ui: React.ReactElement) => {
  return render(<CartProvider>{ui}</CartProvider>);
};

describe('CartDrawer', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllTimers();
  });

  it('não deve renderizar quando fechado', () => {
    const onClose = vi.fn();
    renderWithCart(<CartDrawer isOpen={false} onClose={onClose} />);

    expect(screen.queryByText('Carrinho')).not.toBeInTheDocument();
  });

  it('deve renderizar quando aberto', async () => {
    const onClose = vi.fn();
    renderWithCart(<CartDrawer isOpen={true} onClose={onClose} />);

    await waitFor(() => {
      expect(screen.getByText('Carrinho')).toBeInTheDocument();
    });
  });

  it('deve mostrar mensagem de carrinho vazio', async () => {
    const onClose = vi.fn();
    renderWithCart(<CartDrawer isOpen={true} onClose={onClose} />);

    await waitFor(() => {
      expect(screen.getByText('Seu carrinho está vazio')).toBeInTheDocument();
    });
  });

  it('deve mostrar itens do carrinho', async () => {
    localStorage.setItem('cart', JSON.stringify([mockItem]));
    const onClose = vi.fn();
    
    renderWithCart(<CartDrawer isOpen={true} onClose={onClose} />);

    await waitFor(() => {
      expect(screen.getByText('Produto 1')).toBeInTheDocument();
    });
  });

  it('deve calcular e exibir total corretamente', async () => {
    localStorage.setItem('cart', JSON.stringify([mockItem]));
    const onClose = vi.fn();
    
    renderWithCart(<CartDrawer isOpen={true} onClose={onClose} />);

    await waitFor(() => {
      expect(screen.getByText('R$ 100.00')).toBeInTheDocument(); // 50 * 2
    });
  });

  it('deve chamar onClose ao clicar no botão fechar', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    
    renderWithCart(<CartDrawer isOpen={true} onClose={onClose} />);

    await waitFor(() => {
      expect(screen.getByLabelText('Fechar carrinho')).toBeInTheDocument();
    });

    const closeButton = screen.getByLabelText('Fechar carrinho');
    await user.click(closeButton);

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('deve chamar onClose ao clicar no backdrop', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    
    const { container } = renderWithCart(<CartDrawer isOpen={true} onClose={onClose} />);

    await waitFor(() => {
      expect(screen.getByText('Carrinho')).toBeInTheDocument();
    });

    const backdrop = container.querySelector('.fixed.inset-0.bg-black');
    expect(backdrop).toBeInTheDocument();
    
    await user.click(backdrop!);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('deve limpar carrinho ao clicar em Limpar Carrinho', async () => {
    const user = userEvent.setup();
    localStorage.setItem('cart', JSON.stringify([mockItem]));
    const onClose = vi.fn();
    
    renderWithCart(<CartDrawer isOpen={true} onClose={onClose} />);

    await waitFor(() => {
      expect(screen.getByText('Limpar Carrinho')).toBeInTheDocument();
    });

    const clearButton = screen.getByText('Limpar Carrinho');
    await user.click(clearButton);

    await waitFor(() => {
      expect(screen.getByText('Seu carrinho está vazio')).toBeInTheDocument();
    });

    const saved = JSON.parse(localStorage.getItem('cart')!);
    expect(saved).toHaveLength(0);
  });

  it('deve mostrar botão Finalizar Compra quando há itens', async () => {
    localStorage.setItem('cart', JSON.stringify([mockItem]));
    const onClose = vi.fn();
    
    renderWithCart(<CartDrawer isOpen={true} onClose={onClose} />);

    await waitFor(() => {
      expect(screen.getByText('Finalizar Compra')).toBeInTheDocument();
    });
  });

  it('deve aplicar animação de slide', async () => {
    const onClose = vi.fn();
    const { container } = renderWithCart(<CartDrawer isOpen={true} onClose={onClose} />);

    await waitFor(() => {
      const drawer = container.querySelector('.translate-x-0');
      expect(drawer).toBeInTheDocument();
    });
  });
});