import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CartProvider } from '../../../contexts/CartContext';
import CartButton from './CartButton';

const renderWithCart = (ui: React.ReactElement) => {
  return render(<CartProvider>{ui}</CartProvider>);
};

describe('CartButton', () => {
  it('deve renderizar o botão do carrinho', () => {
    const onClick = vi.fn();
    renderWithCart(<CartButton onClick={onClick} />);

    const button = screen.getByLabelText('Carrinho de compras');
    expect(button).toBeInTheDocument();
  });

  it('deve chamar onClick quando clicado', async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    renderWithCart(<CartButton onClick={onClick} />);

    const button = screen.getByLabelText('Carrinho de compras');
    await user.click(button);

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('não deve mostrar badge quando carrinho vazio', () => {
    const onClick = vi.fn();
    renderWithCart(<CartButton onClick={onClick} />);

    const badge = screen.queryByText(/\d+/);
    expect(badge).not.toBeInTheDocument();
  });

  it('deve mostrar quantidade correta no badge', () => {
    const onClick = vi.fn();
    
    localStorage.setItem('cart', JSON.stringify([
      { id: 1, quantity: 2, title: 'Product 1', price: 10 },
      { id: 2, quantity: 3, title: 'Product 2', price: 20 },
    ]));

    renderWithCart(<CartButton onClick={onClick} />);

    const badge = screen.getByText('5');
    expect(badge).toBeInTheDocument();
  });

  it('deve mostrar 99+ quando quantidade maior que 99', () => {
    const onClick = vi.fn();
    
    localStorage.setItem('cart', JSON.stringify([
      { id: 1, quantity: 150, title: 'Product 1', price: 10 },
    ]));

    renderWithCart(<CartButton onClick={onClick} />);

    const badge = screen.getByText('99+');
    expect(badge).toBeInTheDocument();
  });
});