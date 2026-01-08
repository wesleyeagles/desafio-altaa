import { Loader2 } from "lucide-react";

const LoadingSpinner = ({ label }: { label?: string }) => (
  <div className="flex items-center justify-center min-h-100">
    <div className="text-center">
      <Loader2 className="w-12 h-12 animate-spin mx-auto text-blue-600 mb-4" />
      <p className="text-gray-600">{label}</p>
    </div>
  </div>
);

export default LoadingSpinner;