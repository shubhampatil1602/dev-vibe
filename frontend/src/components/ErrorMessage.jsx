import { TriangleAlert } from "lucide-react";

const ErrorMessage = ({ errorMessage }) => {
  return (
    <div className='border flex items-center gap-2 border-red-700 bg-red-900 bg-opacity-50 w-full rounded-md px-3 py-2 mt-3 mb-1'>
      <TriangleAlert className='h-5 w-5' />
      <span>{errorMessage}</span>
    </div>
  );
};

export default ErrorMessage;
