export function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center py-16" role="status" aria-live="polite">
      <div className="relative" aria-hidden="true">
        <div className="w-16 h-16 border-4 border-primary-200 rounded-full"></div>
        <div className="absolute top-0 left-0 w-16 h-16 border-4 border-primary-500 rounded-full border-t-transparent animate-spin"></div>
      </div>
      <p className="mt-6 text-lg text-gray-800">Finding your perfect meal...</p>
      <p className="mt-2 text-sm text-gray-600">
        Our AI chef is crafting a recommendation just for you
      </p>
    </div>
  );
}
