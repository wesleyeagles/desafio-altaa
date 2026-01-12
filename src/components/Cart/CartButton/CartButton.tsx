import { ShoppingCart } from "lucide-react";
import { useCart } from "../../../contexts/CartContext";

const CartButton = ({ onClick }: { onClick: () => void }) => {
  const { totalItems } = useCart();

  return (
    <button
      onClick={onClick}
      className="relative bg-linear-to-r from-emerald-500 to-emerald-900 p-2 hover:bg-gray-100 rounded-xl transition cursor-pointer"
      aria-label="Carrinho de compras"
    >
      <ShoppingCart className="w-6 h-6 text-white-700" color="#FFF" />
      {totalItems > 0 && (
        <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
          {totalItems > 99 ? '99+' : totalItems}
        </span>
      )}
    </button>
  );
};

export default CartButton;