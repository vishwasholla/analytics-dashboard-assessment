import { memo } from 'react';

interface ErrorStateProps {
  error: string;
  onRetry: () => void;
}

export const ErrorState = memo(({ error, onRetry }: ErrorStateProps) => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-full">
          <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        <h2 className="mt-4 text-xl font-semibold text-center text-gray-900">Failed to Load Data</h2>
        <p className="mt-2 text-sm text-center text-gray-600">{error}</p>
        <button
          onClick={onRetry}
          className="mt-6 w-full px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
        >
          Retry
        </button>
      </div>
    </div>
  );
});

ErrorState.displayName = 'ErrorState';