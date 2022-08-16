interface ErrorProps {
  message?: string;
}

const ErrorMessage: React.FC<ErrorProps> = ({message}) => {
  return (
    <p className="text-light mx-auto mt-16 min-w-min max-w-sm rounded bg-red-400 p-5 text-center text-lg font-semibold">
      {message}
    </p>
  );
};

export default ErrorMessage;
