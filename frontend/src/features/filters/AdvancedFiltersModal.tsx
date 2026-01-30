import { memo, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useEVDataStore } from '../../store/useEVDataStore';
import {
  getMSRPRange,
  getUniqueCafvEligibility,
  getUniqueLegislativeDistricts,
  getUniqueCensusTracts,
} from '../../utils/dataProcessing';
import type { FilterState } from '../../types';

interface AdvancedFiltersModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdvancedFiltersModal = memo(
  ({ isOpen, onClose }: AdvancedFiltersModalProps) => {
    const { data, filters, setFilters } = useEVDataStore();

    // Local state for modal (only applied on Save)
    const [localFilters, setLocalFilters] = useState<Partial<FilterState>>({});
    const [censusTractSearch, setCensusTractSearch] = useState('');

    // Initialize local filters when modal opens
    useEffect(() => {
      if (isOpen) {
        setLocalFilters({
          cafvEligibility: filters.cafvEligibility,
          includeUnknownRange: filters.includeUnknownRange,
          onlyUnknownRange: filters.onlyUnknownRange,
          msrpRange: filters.msrpRange,
          legislativeDistricts: filters.legislativeDistricts,
          censusTracts: filters.censusTracts,
        });
        setCensusTractSearch('');
      }
    }, [isOpen, filters]);

    const cafvOptions = getUniqueCafvEligibility(data);
    const legislativeDistricts = getUniqueLegislativeDistricts(data);
    const censusTracts = getUniqueCensusTracts(data);
    const [dataMinMSRP, dataMaxMSRP] = getMSRPRange(data);

    // Filter census tracts based on search
    const filteredCensusTracts = censusTractSearch
      ? censusTracts.filter(tract => 
          tract.toLowerCase().includes(censusTractSearch.toLowerCase())
        )
      : censusTracts;

    const handleSave = () => {
      setFilters(localFilters);
      onClose();
    };

    const handleCancel = () => {
      onClose();
    };

    if (!isOpen) return null;

    const modalContent = (
      <div className="fixed inset-0 z-[9999]" style={{ isolation: 'isolate' }}>
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
          onClick={handleCancel}
        />

        {/* Modal Container - Centered on screen */}
        <div className="fixed inset-0 flex items-start justify-center overflow-y-auto p-4 sm:p-6 md:p-8 pt-8 sm:pt-12 md:pt-16">
          <div className="relative bg-white rounded-lg shadow-2xl w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl max-h-[85vh] sm:max-h-[80vh] overflow-hidden">
            {/* Header */}
            <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                  Advanced Filters
                </h2>
                <button
                  onClick={handleCancel}
                  className="text-gray-400 hover:text-gray-500 focus:outline-none"
                >
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="px-4 sm:px-6 py-3 sm:py-4 overflow-y-auto max-h-[calc(85vh-120px)] sm:max-h-[calc(80vh-140px)]">
              <div className="space-y-6">
                {/* CAFV Eligibility Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    CAFV Eligibility
                  </label>
                  <div className="max-h-40 overflow-y-auto border border-gray-200 rounded-lg p-2 space-y-1">
                    {cafvOptions.map((option) => (
                      <label
                        key={option}
                        className="flex items-center space-x-2 p-1 hover:bg-gray-50 rounded cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={localFilters.cafvEligibility?.includes(
                            option
                          )}
                          onChange={(e) => {
                            const current = localFilters.cafvEligibility || [];
                            setLocalFilters({
                              ...localFilters,
                              cafvEligibility: e.target.checked
                                ? [...current, option]
                                : current.filter((v) => v !== option),
                            });
                          }}
                          className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                        />
                        <span className="text-sm text-gray-700">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Unknown Range Options */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Unknown Range Vehicles
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded cursor-pointer">
                      <input
                        type="checkbox"
                        checked={localFilters.includeUnknownRange}
                        onChange={(e) => {
                          setLocalFilters({
                            ...localFilters,
                            includeUnknownRange: e.target.checked,
                            onlyUnknownRange: false, // Reset only unknown
                          });
                        }}
                        disabled={localFilters.onlyUnknownRange}
                        className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                      <span className="text-sm text-gray-700">
                        Include vehicles with unknown range (0 miles)
                      </span>
                    </label>
                    <label className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded cursor-pointer">
                      <input
                        type="checkbox"
                        checked={localFilters.onlyUnknownRange}
                        onChange={(e) => {
                          setLocalFilters({
                            ...localFilters,
                            onlyUnknownRange: e.target.checked,
                            includeUnknownRange: false, // Reset include unknown
                          });
                        }}
                        className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                      <span className="text-sm text-gray-700">
                        Show only vehicles with unknown range (ignores range
                        filter)
                      </span>
                    </label>
                  </div>
                </div>

                {/* MSRP Range Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Base MSRP Range
                  </label>
                  <div className="px-2 py-3 border border-gray-200 rounded-lg space-y-3">
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>
                        ${(localFilters.msrpRange?.[0] || 0).toLocaleString()}
                      </span>
                      <span>
                        $
                        {(
                          localFilters.msrpRange?.[1] || dataMaxMSRP
                        ).toLocaleString()}
                      </span>
                    </div>
                    <div className="space-y-2">
                      <input
                        type="range"
                        min={dataMinMSRP}
                        max={dataMaxMSRP}
                        value={localFilters.msrpRange?.[0] || dataMinMSRP}
                        onChange={(e) => {
                          const newMin = Number(e.target.value);
                          const currentMax =
                            localFilters.msrpRange?.[1] || dataMaxMSRP;
                          if (newMin <= currentMax) {
                            setLocalFilters({
                              ...localFilters,
                              msrpRange: [newMin, currentMax],
                            });
                          }
                        }}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
                      />
                      <input
                        type="range"
                        min={dataMinMSRP}
                        max={dataMaxMSRP}
                        value={localFilters.msrpRange?.[1] || dataMaxMSRP}
                        onChange={(e) => {
                          const newMax = Number(e.target.value);
                          const currentMin =
                            localFilters.msrpRange?.[0] || dataMinMSRP;
                          if (newMax >= currentMin) {
                            setLocalFilters({
                              ...localFilters,
                              msrpRange: [currentMin, newMax],
                            });
                          }
                        }}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
                      />
                    </div>
                  </div>
                </div>

                {/* Legislative District Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Legislative District
                  </label>
                  <div className="max-h-40 overflow-y-auto border border-gray-200 rounded-lg p-2 space-y-1">
                    {legislativeDistricts.map((district) => (
                      <label
                        key={district}
                        className="flex items-center space-x-2 p-1 hover:bg-gray-50 rounded cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={localFilters.legislativeDistricts?.includes(
                            district
                          )}
                          onChange={(e) => {
                            const current =
                              localFilters.legislativeDistricts || [];
                            setLocalFilters({
                              ...localFilters,
                              legislativeDistricts: e.target.checked
                                ? [...current, district]
                                : current.filter((v) => v !== district),
                            });
                          }}
                          className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                        />
                        <span className="text-sm text-gray-700">
                          District {district}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Census Tract Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Census Tract
                  </label>
                  {/* Search input for census tracts */}
                  <div className="mb-2">
                    <input
                      type="text"
                      value={censusTractSearch}
                      onChange={(e) => setCensusTractSearch(e.target.value)}
                      placeholder="Search census tracts..."
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                  <div className="max-h-40 overflow-y-auto border border-gray-200 rounded-lg p-2 space-y-1">
                    {filteredCensusTracts.length > 0 ? (
                      filteredCensusTracts.slice(0, 100).map((tract) => (
                        <label
                          key={tract}
                          className="flex items-center space-x-2 p-1 hover:bg-gray-50 rounded cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={localFilters.censusTracts?.includes(tract)}
                            onChange={(e) => {
                              const current = localFilters.censusTracts || [];
                              setLocalFilters({
                                ...localFilters,
                                censusTracts: e.target.checked
                                  ? [...current, tract]
                                  : current.filter((v) => v !== tract),
                              });
                            }}
                            className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                          />
                          <span className="text-sm text-gray-700 font-mono">
                            {tract}
                          </span>
                        </label>
                      ))
                    ) : (
                      <p className="text-sm text-gray-500 p-2">
                        No census tracts found
                      </p>
                    )}
                    {filteredCensusTracts.length > 100 && (
                      <p className="text-xs text-gray-500 p-2">
                        Showing first 100 of {filteredCensusTracts.length} matching census tracts
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-4 sm:px-6 py-3 sm:py-4 border-t border-gray-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-2 sm:gap-3">
              <button
                onClick={handleCancel}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                Save Filters
              </button>
            </div>
          </div>
        </div>
      </div>
    );

    // Render modal using portal to escape parent container constraints
    return createPortal(modalContent, document.body);
  }
);

AdvancedFiltersModal.displayName = 'AdvancedFiltersModal';
