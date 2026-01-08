import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { ICartItem } from '../../../types/cart.types';
import { CartProvider } from '../../../contexts/CartContext';
import CartItem from './CartItem';

const mockItem: ICartItem = {
  id: 1,
  title: 'Produto Teste',
  price: 99.99,
  description: 'Descrição',
  category: 'electronics',
  image: 'https://example.com/image.jpg',
  rating: { rate: 4.5, count: 100 },
  quantity: 2,
};

const renderWithCart = (ui: React.ReactElement) => {
  return render(<CartProvider>{ui}</CartProvider>);
};

describe('CartItem', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('deve renderizar informações do item', () => {
    renderWithCart(<CartItem item={mockItem} />);

    expect(screen.getByText('Produto Teste')).toBeInTheDocument();
    expect(screen.getByText('R$ 99.99')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('deve renderizar imagem do produto', () => {
    renderWithCart(<CartItem item={mockItem} />);

    const image = screen.getByAltText('Produto Teste');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://example.com/image.jpg');
  });

  it('deve incrementar quantidade ao clicar no botão +', async () => {
    const user = userEvent.setup();
    
    localStorage.setItem('cart', JSON.stringify([mockItem]));
    renderWithCart(<CartItem item={mockItem} />);

    const plusButton = screen.getByLabelText('Aumentar quantidade');
    await user.click(plusButton);

    // Verifica se quantidade foi atualizada no localStorage
    const saved = JSON.parse(localStorage.getItem('cart')!);
    expect(saved[0].quantity).toBe(3);
  });

  it('deve decrementar quantidade ao clicar no botão -', async () => {
    const user = userEvent.setup();
    
    localStorage.setItem('cart', JSON.stringify([mockItem]));
    renderWithCart(<CartItem item={mockItem} />);

    const minusButton = screen.getByLabelText('Diminuir quantidade');
    await user.click(minusButton);

    const saved = JSON.parse(localStorage.getItem('cart')!);
    expect(saved[0].quantity).toBe(1);
  });

  it('deve remover item ao clicar no botão de remover', async () => {
    const user = userEvent.setup();
    
    localStorage.setItem('cart', JSON.stringify([mockItem]));
    renderWithCart(<CartItem item={mockItem} />);

    const removeButton = screen.getByLabelText('Remover item');
    await user.click(removeButton);

    const saved = JSON.parse(localStorage.getItem('cart')!);
    expect(saved).toHaveLength(0);
  });

  it('deve truncar título longo com line-clamp-2', () => {
    const longTitleItem = {
      ...mockItem,
      title: 'Título muito longo que deveria ser truncado com reticências na segunda linha',
    };

    renderWithCart(<CartItem item={longTitleItem} />);

    const title = screen.getByText(/Título muito longo/);
    expect(title).toHaveClass('line-clamp-2');
  });
});