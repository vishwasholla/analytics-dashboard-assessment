import { APP_CONFIG } from '../constants';

export const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                {APP_CONFIG.APP_NAME}
              </h1>
              <p className="text-xs text-gray-500">v{APP_CONFIG.VERSION}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className="hidden sm:inline-block px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
              Live Data
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
