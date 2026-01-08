import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "../../../contexts/CartContext";
import type { ICartItem } from "../../../types/cart.types";

const CartItem = ({ item }: { item: ICartItem }) => {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <div className="flex gap-4 py-4 border-b">
      <img
        src={item.image}
        alt={item.title}
        className="w-20 h-20 object-contain bg-gray-50 rounded"
      />
      <div className="flex-1">
        <h4 className="font-medium text-sm line-clamp-2 mb-2">{item.title}</h4>
        <p className="text-lg font-bold text-gray-900">R$ {item.price.toFixed(2)}</p>
        <div className="flex items-center gap-2 mt-2">
          <button
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
            className="p-1 hover:bg-gray-100 rounded"
            aria-label="Diminuir quantidade"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="w-8 text-center font-medium">{item.quantity}</span>
          <button
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
            className="p-1 hover:bg-gray-100 rounded"
            aria-label="Aumentar quantidade"
          >
            <Plus className="w-4 h-4" />
          </button>
          <button
            onClick={() => removeFromCart(item.id)}
            className="ml-auto p-1 hover:bg-red-50 text-red-600 rounded"
            aria-label="Remover item"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;