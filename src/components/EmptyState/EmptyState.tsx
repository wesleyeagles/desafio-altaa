import { ShoppingCart } from "lucide-react";

const EmptyState = ({ message }: {message: string}) => (
  <div className="flex items-center justify-center min-h-100">
    <div className="text-center max-w-md p-6">
      <ShoppingCart className="w-16 h-16 mx-auto text-gray-400 mb-4" />
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{message}</h3>
      <p className="text-gray-600">Tente ajustar seus filtros para ver mais resultados.</p>
    </div>
  </div>
);

export default EmptyState;