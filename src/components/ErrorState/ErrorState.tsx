import { AlertCircle } from "lucide-react";

const ErrorState = ({ message, onRetry }: { message: string; onRetry: () => void }) => (
  <div className="flex items-center justify-center min-h-100">
    <div className="text-center max-w-md p-6">
      <AlertCircle className="w-16 h-16 mx-auto text-red-500 mb-4" />
      <h3 className="text-xl font-semibold text-gray-800 mb-2">Oops! Ocorreu um erro</h3>
      <p className="text-gray-600 mb-4">{message}</p>
      <button
        onClick={onRetry}
        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Tentar Novamente
      </button>
    </div>
  </div>
);

export default ErrorState;