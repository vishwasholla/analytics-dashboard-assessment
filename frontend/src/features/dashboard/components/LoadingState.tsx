import { memo } from 'react';
import { LoadingSkeleton } from '../../../components/LoadingSkeleton';

interface LoadingStateProps {
  progress: number;
  stage: string;
}

export const LoadingState = memo(({ progress, stage }: LoadingStateProps) => {
  const getStageText = (stage: string) => {
    switch (stage) {
      case 'fetching':
        return 'Fetching CSV file...';
      case 'parsing':
        return 'Parsing CSV data...';
      case 'processing':
        return 'Processing vehicle data...';
      default:
        return 'Loading...';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Loading EV Data...</h2>
          <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-primary-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="mt-2 text-sm text-gray-600">
            {getStageText(stage)}
          </p>
        </div>
        <LoadingSkeleton />
      </div>
    </div>
  );
});

LoadingState.displayName = 'LoadingState';