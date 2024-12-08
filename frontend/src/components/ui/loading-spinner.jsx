import { Loader2 } from "lucide-react";

const LoadingSpinner = ({ className, ...props }) => {
  return <Loader2 className={`h-4 w-4 animate-spin ${className}`} {...props} />;
};

export default LoadingSpinner;
