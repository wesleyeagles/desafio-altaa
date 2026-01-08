import { ShoppingCart, X } from "lucide-react";
import { useCart } from "../../../contexts/CartContext";
import CartItem from "../CartItem/CartItem";

const CartDrawer = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const { items, totalPrice, clearCart } = useCart();

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 backdrop-brightness-50 backdrop-blur-xs bg-opacity-50 z-40"
        onClick={onClose}
      />
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-bold">Carrinho</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
            aria-label="Fechar carrinho"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex-1 flex items-center justify-center p-8">
            <div className="text-center">
              <ShoppingCart className="w-16 h-16 mx-auto text-gray-300 mb-4" />
              <p className="text-gray-600">Seu carrinho está vazio</p>
            </div>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-4">
              {items.map(item => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>

            <div className="border-t p-4 space-y-4">
              <div className="flex justify-between text-lg font-bold">
                <span>Total:</span>
                <span>R$ {totalPrice.toFixed(2)}</span>
              </div>
              <button
                onClick={clearCart}
                className="w-full py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition font-medium"
              >
                Limpar Carrinho
              </button>
              <button className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold">
                Finalizar Compra
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default CartDrawer;