import { FaExclamationTriangle } from "react-icons/fa";

const Error = ({ message = "Terjadi kesalahan", onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[200px] gap-4 text-center">
      <FaExclamationTriangle className="text-4xl text-red-500" />
      <p className="text-error">{message}</p>
      {onRetry && (
        <button className="btn btn-error" onClick={onRetry}>
          Retry
        </button>
      )}
    </div>
  );
};

export default Error;
