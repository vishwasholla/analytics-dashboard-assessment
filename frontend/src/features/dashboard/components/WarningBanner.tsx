import { memo } from 'react';

interface WarningBannerProps {
  errorCount: number;
}

export const WarningBanner = memo(({ errorCount }: WarningBannerProps) => {
  if (errorCount === 0) return null;

  return (
    <div className="mb-4 sm:mb-6 bg-yellow-50 border border-yellow-200 rounded-lg p-3 sm:p-4">
      <div className="flex items-start">
        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <div className="ml-3">
          <h3 className="text-xs sm:text-sm font-medium text-yellow-800">Data Parsing Warnings</h3>
          <p className="mt-1 text-xs sm:text-sm text-yellow-700">
            {errorCount} row(s) had parsing issues but were handled gracefully.
          </p>
        </div>
      </div>
    </div>
  );
});

WarningBanner.displayName = 'WarningBanner';