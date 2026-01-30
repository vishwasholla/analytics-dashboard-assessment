import { memo } from 'react';
import { useEVDataStore } from '../../store/useEVDataStore';
import { paginateData, getTotalPages } from '../../utils/dataProcessing';
import type { EVData } from '../../types';

export const DataTable = memo(() => {
  const { filteredData, uiState, setUIState } = useEVDataStore();
  const { currentPage, itemsPerPage } = uiState;

  const paginatedData = paginateData(filteredData, currentPage, itemsPerPage);
  const totalPages = getTotalPages(filteredData.length, itemsPerPage);

  const handlePageChange = (page: number) => {
    setUIState({ currentPage: page });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (filteredData.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-12 text-center">
        <svg
          className="mx-auto h-12 w-12 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        <h3 className="mt-2 text-sm font-medium text-gray-900">No data found</h3>
        <p className="mt-1 text-sm text-gray-500">
          Try adjusting your filters to see more results.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <TableHeader>VIN</TableHeader>
              <TableHeader>Make</TableHeader>
              <TableHeader>Model</TableHeader>
              <TableHeader>Year</TableHeader>
              <TableHeader>Type</TableHeader>
              <TableHeader>Range (mi)</TableHeader>
              <TableHeader>County</TableHeader>
              <TableHeader>City</TableHeader>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedData.map((vehicle) => (
              <TableRow key={vehicle.vin} vehicle={vehicle} />
            ))}
          </tbody>
        </table>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={filteredData.length}
        onPageChange={handlePageChange}
      />
    </div>
  );
});

DataTable.displayName = 'DataTable';

const TableHeader = ({ children }: { children: React.ReactNode }) => (
  <th
    scope="col"
    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
  >
    {children}
  </th>
);

const TableRow = memo(({ vehicle }: { vehicle: EVData }) => (
  <tr className="hover:bg-gray-50 transition-colors">
    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">
      {vehicle.vin.slice(0, 10)}...
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{vehicle.make}</td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{vehicle.model}</td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{vehicle.modelYear}</td>
    <td className="px-6 py-4 whitespace-nowrap">
      <span
        className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
          vehicle.evType === 'BEV'
            ? 'bg-green-100 text-green-800'
            : 'bg-blue-100 text-blue-800'
        }`}
      >
        {vehicle.evType}
      </span>
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
      {vehicle.electricRange}
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{vehicle.county}</td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{vehicle.city}</td>
  </tr>
));

TableRow.displayName = 'TableRow';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ currentPage, totalPages, totalItems, onPageChange }: PaginationProps) => {
  const pages = Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
    if (totalPages <= 5) return i + 1;
    if (currentPage <= 3) return i + 1;
    if (currentPage >= totalPages - 2) return totalPages - 4 + i;
    return currentPage - 2 + i;
  });

  return (
    <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
      <div className="flex-1 flex justify-between sm:hidden">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">{(currentPage - 1) * 50 + 1}</span> to{' '}
            <span className="font-medium">{Math.min(currentPage * 50, totalItems)}</span> of{' '}
            <span className="font-medium">{totalItems}</span> results
          </p>
        </div>
        <div>
          <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed focus:z-10 focus:outline-none focus:ring-2 focus:ring-primary-500"
              aria-label="Previous page"
            >
              <span className="sr-only">Previous</span>
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            {pages.map((page) => (
              <button
                key={page}
                onClick={() => onPageChange(page)}
                className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium focus:z-10 focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                  page === currentPage
                    ? 'z-10 bg-primary-50 border-primary-500 text-primary-600'
                    : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                }`}
                aria-label={`Page ${page}`}
                aria-current={page === currentPage ? 'page' : undefined}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed focus:z-10 focus:outline-none focus:ring-2 focus:ring-primary-500"
              aria-label="Next page"
            >
              <span className="sr-only">Next</span>
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};
