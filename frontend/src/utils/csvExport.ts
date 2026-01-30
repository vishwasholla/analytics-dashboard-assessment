import type { EVData } from '../types';

/**
 * Escapes a CSV field value according to RFC 4180
 * - Wraps in quotes if contains comma, quote, or newline
 * - Doubles any quotes inside the value
 */
function escapeCSVField(value: string | number | null | undefined): string {
  if (value === null || value === undefined) {
    return '';
  }

  const stringValue = String(value);
  
  // Check if field needs quoting (contains comma, quote, or newline)
  if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
    // Escape quotes by doubling them
    const escaped = stringValue.replace(/"/g, '""');
    return `"${escaped}"`;
  }
  
  return stringValue;
}

/**
 * Converts EVData array to CSV string with UTF-8 encoding
 */
export function convertToCSV(data: EVData[]): string {
  if (data.length === 0) {
    return '';
  }

  // Define CSV headers (human-readable)
  const headers = [
    'VIN (1-10)',
    'County',
    'City',
    'State',
    'Postal Code',
    'Model Year',
    'Make',
    'Model',
    'Electric Vehicle Type',
    'Clean Alternative Fuel Vehicle (CAFV) Eligibility',
    'Electric Range',
    'Base MSRP',
    'Legislative District',
    'DOL Vehicle ID',
    'Vehicle Location',
    'Electric Utility',
    '2020 Census Tract'
  ];

  // Create header row
  const headerRow = headers.map(h => escapeCSVField(h)).join(',');

  // Create data rows
  const dataRows = data.map(vehicle => {
    const row = [
      vehicle.vin,
      vehicle.county,
      vehicle.city,
      vehicle.state,
      vehicle.postalCode,
      vehicle.modelYear,
      vehicle.make,
      vehicle.model,
      vehicle.evType,
      vehicle.cafvEligibility,
      vehicle.electricRange,
      vehicle.baseMSRP > 0 ? vehicle.baseMSRP : '',
      vehicle.legislativeDistrict,
      vehicle.dolVehicleId,
      vehicle.vehicleLocation,
      vehicle.electricUtility,
      vehicle.censusTract
    ];

    return row.map(field => escapeCSVField(field)).join(',');
  });

  // Combine header and data rows
  return [headerRow, ...dataRows].join('\n');
}

/**
 * Generates a filename with timestamp
 */
export function generateCSVFilename(): string {
  const now = new Date();
  const timestamp = now.toISOString()
    .replace(/:/g, '')
    .replace(/\..+/, '')
    .replace('T', '-');
  return `ev-data-export-${timestamp}.csv`;
}

/**
 * Triggers browser download of CSV file with UTF-8 encoding
 */
export function downloadCSV(csvContent: string, filename: string): void {
  // Add UTF-8 BOM for proper encoding in Excel
  const BOM = '\uFEFF';
  const csvWithBOM = BOM + csvContent;
  
  // Create blob with UTF-8 encoding
  const blob = new Blob([csvWithBOM], { type: 'text/csv;charset=utf-8;' });
  
  // Create download link
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  // Clean up
  URL.revokeObjectURL(url);
}

/**
 * Main export function - converts data to CSV and triggers download
 */
export function exportToCSV(data: EVData[]): void {
  if (data.length === 0) {
    throw new Error('No data to export');
  }

  const csvContent = convertToCSV(data);
  const filename = generateCSVFilename();
  downloadCSV(csvContent, filename);
}
