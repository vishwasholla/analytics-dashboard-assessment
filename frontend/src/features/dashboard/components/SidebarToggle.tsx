import { memo } from 'react';

interface SidebarToggleProps {
  isOpen: boolean;
  onToggle: () => void;
  variant: 'mobile' | 'desktop';
}

export const SidebarToggle = memo(({ isOpen, onToggle, variant }: SidebarToggleProps) => {
  if (variant === 'mobile') {
    return (
      <button
        onClick={onToggle}
        className="lg:hidden fixed top-20 right-4 z-50 bg-primary-600 text-white p-3 rounded-full shadow-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
        aria-label="Toggle filters"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
        </svg>
      </button>
    );
  }

  return (
    <button
      onClick={onToggle}
      className="hidden lg:block fixed left-4 top-24 z-30 bg-white text-gray-600 p-2 rounded-lg shadow-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500"
      aria-label="Toggle filters"
    >
      <svg 
        className={`w-5 h-5 transform transition-transform ${isOpen ? '' : 'rotate-180'}`} 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
      </svg>
    </button>
  );
});

SidebarToggle.displayName = 'SidebarToggle';