export default function Description({ children, error }) {
  return (
    <p
      className={`${
        error ? "text-red-500" : "text-gray-500 dark:text-gray-400"
      } max-w-sm text-sm`}
    >
      {children}
    </p>
  );
}
