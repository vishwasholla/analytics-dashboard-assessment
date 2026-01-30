import { memo, useState } from "react";
import { useEVDataStore } from "../../store/useEVDataStore";
import { getTotalPages } from "../../utils/dataProcessing";
import { exportToCSV } from "../../utils/csvExport";
import type { EVData } from "../../types";

type SortField = "modelYear" | "electricRange";
type SortDirection = "asc" | "desc";

interface SortConfig {
  modelYear: SortDirection;
  electricRange: SortDirection;
}

export const DataTable = memo(() => {
  const { filteredData, uiState, setUIState } = useEVDataStore();
  const { currentPage, itemsPerPage } = uiState;

  // Track sort direction for both columns independently
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    modelYear: "desc", // Default: highest year first
    electricRange: "desc", // Default: highest range first
  });

  // Track export state
  const [isExporting, setIsExporting] = useState(false);
  const [exportMessage, setExportMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  // Multi-column sorting with proper hierarchy
  const sortedData = [...filteredData].sort((a, b) => {
    // Primary sort: Year
    const yearA = a.modelYear ?? 0; // Handle null/undefined
    const yearB = b.modelYear ?? 0;

    const yearComparison =
      sortConfig.modelYear === "desc"
        ? yearB - yearA // Descending: higher values first
        : yearA - yearB; // Ascending: lower values first

    // If years are different, return year comparison result
    if (yearComparison !== 0) {
      return yearComparison;
    }

    // Secondary sort: Range (only when years are equal)
    const rangeA = a.electricRange ?? 0; // Handle null/undefined
    const rangeB = b.electricRange ?? 0;

    const rangeComparison =
      sortConfig.electricRange === "desc"
        ? rangeB - rangeA // Descending: higher values first
        : rangeA - rangeB; // Ascending: lower values first

    return rangeComparison;
  });

  const totalPages = getTotalPages(sortedData.length, itemsPerPage);

  // Calculate start index for current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = sortedData.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setUIState({ currentPage: page });
    // Removed scroll to top - keep user's scroll position
  };

  const handleSort = (field: SortField) => {
    // Toggle the direction for the clicked field
    setSortConfig((prev) => ({
      ...prev,
      [field]: prev[field] === "desc" ? "asc" : "desc",
    }));

    // Reset to first page when sorting changes
    setUIState({ currentPage: 1 });
  };

  const handleExport = async () => {
    if (sortedData.length === 0) return;

    setIsExporting(true);
    setExportMessage(null);

    try {
      // Use setTimeout to allow UI to update before heavy operation
      await new Promise((resolve) => setTimeout(resolve, 0));
      
      exportToCSV(sortedData);
      
      setExportMessage({
        type: "success",
        text: `Successfully exported ${sortedData.length} records`,
      });

      // Clear success message after 3 seconds
      setTimeout(() => setExportMessage(null), 3000);
    } catch (error) {
      setExportMessage({
        type: "error",
        text: error instanceof Error ? error.message : "Export failed",
      });

      // Clear error message after 5 seconds
      setTimeout(() => setExportMessage(null), 5000);
    } finally {
      setIsExporting(false);
    }
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
        <h3 className="mt-2 text-sm font-medium text-gray-900">
          No data found
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          Try adjusting your filters to see more results.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Export Button */}
      <div className="flex items-center justify-end gap-3">
        {exportMessage && (
          <span
            className={`text-sm ${
              exportMessage.type === "success"
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {exportMessage.text}
          </span>
        )}
        <button
          onClick={handleExport}
          disabled={sortedData.length === 0 || isExporting}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          title={
            sortedData.length === 0
              ? "No data to export"
              : `Export ${sortedData.length} filtered records to CSV`
          }
        >
          {isExporting ? (
            <>
              <svg
                className="animate-spin h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Exporting...
            </>
          ) : (
            <>
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Export to CSV
            </>
          )}
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden border border-gray-300">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-300 border-collapse">
            <thead className="bg-gray-100">
              <tr className="border-b-2 border-gray-300">
                <TableHeader>ID</TableHeader>
                <TableHeader>VIN</TableHeader>
                <TableHeader>Make</TableHeader>
                <TableHeader>Model</TableHeader>
                <SortableTableHeader
                  field="modelYear"
                  direction={sortConfig.modelYear}
                  onSort={handleSort}
                >
                  Year
                </SortableTableHeader>
                <TableHeader>Type</TableHeader>
                <SortableTableHeader
                  field="electricRange"
                  direction={sortConfig.electricRange}
                  onSort={handleSort}
                >
                  Range (mi)
                </SortableTableHeader>
                <TableHeader>MSRP</TableHeader>
                <TableHeader>County</TableHeader>
                <TableHeader>City</TableHeader>
                <TableHeader>State</TableHeader>
                <TableHeader>Postal Code</TableHeader>
                <TableHeader>CAFV Eligibility</TableHeader>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedData.map((vehicle, index) => {
                const globalIndex = startIndex + index + 1;
                return (
                  <TableRow
                    key={`${vehicle.vin}-${globalIndex}`}
                    vehicle={vehicle}
                    rowId={globalIndex}
                  />
                );
              })}
            </tbody>
          </table>
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={sortedData.length}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
});

DataTable.displayName = "DataTable";

const TableHeader = ({ children }: { children: React.ReactNode }) => (
  <th
    scope="col"
    className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-300 bg-gray-100"
  >
    {children}
  </th>
);

interface SortableTableHeaderProps {
  field: SortField;
  direction: SortDirection;
  onSort: (field: SortField) => void;
  children: React.ReactNode;
}

const SortableTableHeader = ({
  field,
  direction,
  onSort,
  children,
}: SortableTableHeaderProps) => {
  return (
    <th
      scope="col"
      className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-300 bg-gray-100 cursor-pointer hover:bg-gray-200 select-none"
      onClick={() => onSort(field)}
    >
      <div className="flex items-center gap-1">
        {children}
        <div className="flex flex-col">
          <svg
            className={`w-3 h-3 ${direction === "asc" ? "text-primary-600" : "text-gray-400"}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" />
          </svg>
          <svg
            className={`w-3 h-3 -mt-1 ${direction === "desc" ? "text-primary-600" : "text-gray-400"}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" />
          </svg>
        </div>
      </div>
    </th>
  );
};

const TableRow = memo(
  ({ vehicle, rowId }: { vehicle: EVData; rowId: number }) => (
    <tr className="hover:bg-gray-50 transition-colors border-b border-gray-200">
      <td className="px-3 py-1.5 text-xs text-gray-900 border-r border-gray-200 text-center font-medium">
        {rowId}
      </td>
      <td className="px-3 py-1.5 text-xs font-mono text-gray-900 border-r border-gray-200">
        {vehicle.vin.slice(0, 10)}
      </td>
      <td className="px-3 py-1.5 text-xs text-gray-900 border-r border-gray-200">
        {vehicle.make}
      </td>
      <td className="px-3 py-1.5 text-xs text-gray-900 border-r border-gray-200">
        {vehicle.model}
      </td>
      <td className="px-3 py-1.5 text-xs text-gray-900 border-r border-gray-200 text-center">
        {vehicle.modelYear}
      </td>
      <td className="px-3 py-1.5 border-r border-gray-200">
        <span
          className={`px-2 py-0.5 inline-flex text-xs leading-4 font-semibold rounded ${
            vehicle.evType === "BEV"
              ? "bg-green-100 text-green-800"
              : "bg-blue-100 text-blue-800"
          }`}
        >
          {vehicle.evType}
        </span>
      </td>
      <td className="px-3 py-1.5 text-xs text-gray-900 border-r border-gray-200 text-right">
        {vehicle.electricRange}
      </td>
      <td className="px-3 py-1.5 text-xs text-gray-900 border-r border-gray-200 text-right">
        {vehicle.baseMSRP > 0 ? `$${vehicle.baseMSRP.toLocaleString()}` : "N/A"}
      </td>
      <td className="px-3 py-1.5 text-xs text-gray-900 border-r border-gray-200">
        {vehicle.county}
      </td>
      <td className="px-3 py-1.5 text-xs text-gray-900 border-r border-gray-200">
        {vehicle.city}
      </td>
      <td className="px-3 py-1.5 text-xs text-gray-900 border-r border-gray-200 text-center">
        {vehicle.state}
      </td>
      <td className="px-3 py-1.5 text-xs text-gray-900 border-r border-gray-200">
        {vehicle.postalCode}
      </td>
      <td className="px-3 py-1.5 text-xs text-gray-900 max-w-xs truncate">
        {vehicle.cafvEligibility}
      </td>
    </tr>
  ),
);

TableRow.displayName = "TableRow";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
}: PaginationProps) => {
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200">
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-700">
          Showing <span className="font-medium">{startItem}</span> to{" "}
          <span className="font-medium">{endItem}</span> of{" "}
          <span className="font-medium">{totalItems}</span> results
        </span>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          title="First page"
        >
          ««
        </button>
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          title="Previous page"
        >
          ‹
        </button>

        <span className="px-3 py-1 text-sm">
          Page <span className="font-medium">{currentPage}</span> of{" "}
          <span className="font-medium">{totalPages}</span>
        </span>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          title="Next page"
        >
          ›
        </button>
        <button
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          title="Last page"
        >
          »»
        </button>
      </div>
    </div>
  );
};

