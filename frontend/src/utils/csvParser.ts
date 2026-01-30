import Papa from 'papaparse';
import type { RawCSVRow, EVData, CSVParseResult, CSVParseError } from '../types';

/**
 * Parse EV type from CSV string to normalized format
 */
const parseEVType = (type: string): 'BEV' | 'PHEV' => {
  const normalized = type.toUpperCase();
  if (normalized.includes('BATTERY ELECTRIC') || normalized.includes('BEV')) {
    return 'BEV';
  }
  if (normalized.includes('PLUG-IN HYBRID') || normalized.includes('PHEV')) {
    return 'PHEV';
  }
  // Default to BEV if unclear
  return 'BEV';
};

/**
 * Safely parse a number from string, return default if invalid
 */
const parseNumber = (value: string, defaultValue: number = 0): number => {
  if (!value || value.trim() === '') return defaultValue;
  const parsed = Number(value);
  return isNaN(parsed) ? defaultValue : parsed;
};

/**
 * Validate and transform a raw CSV row into EVData
 */
const transformRow = (row: RawCSVRow, rowIndex: number): { data: EVData | null; errors: CSVParseError[] } => {
  const errors: CSVParseError[] = [];

  // Validate required fields
  if (!row['VIN (1-10)'] || row['VIN (1-10)'].trim() === '') {
    errors.push({
      row: rowIndex,
      field: 'VIN (1-10)',
      message: 'VIN is required',
      rawValue: row['VIN (1-10)'] || '',
    });
  }

  if (!row['Make'] || row['Make'].trim() === '') {
    errors.push({
      row: rowIndex,
      field: 'Make',
      message: 'Make is required',
      rawValue: row['Make'] || '',
    });
  }

  // Parse model year
  const modelYear = parseNumber(row['Model Year'], 0);
  if (modelYear < 1900 || modelYear > 2030) {
    errors.push({
      row: rowIndex,
      field: 'Model Year',
      message: 'Invalid model year',
      rawValue: row['Model Year'],
    });
  }

  // If critical errors exist, return null
  if (errors.length > 0 && (!row['VIN (1-10)'] || !row['Make'])) {
    return { data: null, errors };
  }

  // Transform to EVData
  const data: EVData = {
    vin: row['VIN (1-10)']?.trim() || '',
    county: row['County']?.trim() || 'Unknown',
    city: row['City']?.trim() || 'Unknown',
    state: row['State']?.trim() || 'WA',
    postalCode: row['Postal Code']?.trim() || '',
    modelYear: modelYear,
    make: row['Make']?.trim() || 'Unknown',
    model: row['Model']?.trim() || 'Unknown',
    evType: parseEVType(row['Electric Vehicle Type'] || ''),
    cafvEligibility: row['Clean Alternative Fuel Vehicle (CAFV) Eligibility']?.trim() || 'Unknown',
    electricRange: parseNumber(row['Electric Range'], 0),
    baseMSRP: parseNumber(row['Base MSRP'], 0),
    legislativeDistrict: row['Legislative District']?.trim() || '',
    dolVehicleId: row['DOL Vehicle ID']?.trim() || '',
    vehicleLocation: row['Vehicle Location']?.trim() || '',
    electricUtility: row['Electric Utility']?.trim() || 'Unknown',
    censusTract: row['2020 Census Tract']?.trim() || '',
  };

  return { data, errors };
};

/**
 * Parse CSV file and return processed EV data
 */
export const parseCSVFile = (file: File): Promise<CSVParseResult> => {
  return new Promise((resolve, reject) => {
    Papa.parse<RawCSVRow>(file, {
      header: true,
      skipEmptyLines: true,
      dynamicTyping: false, // We'll handle type conversion manually
      complete: (results) => {
        const processedData: EVData[] = [];
        const allErrors: CSVParseError[] = [];
        let validRows = 0;
        let invalidRows = 0;

        results.data.forEach((row, index) => {
          const { data, errors } = transformRow(row, index + 2); // +2 for header and 1-based indexing
          
          if (data) {
            processedData.push(data);
            validRows++;
          } else {
            invalidRows++;
          }

          if (errors.length > 0) {
            allErrors.push(...errors);
          }
        });

        resolve({
          data: processedData,
          errors: allErrors,
          meta: {
            totalRows: results.data.length,
            validRows,
            invalidRows,
          },
        });
      },
      error: (error: Error) => {
        reject(new Error(`CSV parsing failed: ${error.message}`));
      },
    });
  });
};

/**
 * Parse CSV from URL
 */
export const parseCSVFromURL = (url: string): Promise<CSVParseResult> => {
  return new Promise((resolve, reject) => {
    Papa.parse<RawCSVRow>(url, {
      download: true,
      header: true,
      skipEmptyLines: true,
      dynamicTyping: false,
      complete: (results) => {
        const processedData: EVData[] = [];
        const allErrors: CSVParseError[] = [];
        let validRows = 0;
        let invalidRows = 0;

        results.data.forEach((row, index) => {
          const { data, errors } = transformRow(row, index + 2);
          
          if (data) {
            processedData.push(data);
            validRows++;
          } else {
            invalidRows++;
          }

          if (errors.length > 0) {
            allErrors.push(...errors);
          }
        });

        resolve({
          data: processedData,
          errors: allErrors,
          meta: {
            totalRows: results.data.length,
            validRows,
            invalidRows,
          },
        });
      },
      error: (error: Error) => {
        reject(new Error(`CSV download/parsing failed: ${error.message}`));
      },
    });
  });
};

/**
 * Parse CSV from text content
 */
export const parseCSVText = (csvText: string): Promise<CSVParseResult> => {
  return new Promise((resolve, reject) => {
    Papa.parse<RawCSVRow>(csvText, {
      header: true,
      skipEmptyLines: true,
      dynamicTyping: false,
      complete: (results) => {
        const processedData: EVData[] = [];
        const allErrors: CSVParseError[] = [];
        let validRows = 0;
        let invalidRows = 0;

        results.data.forEach((row, index) => {
          const { data, errors } = transformRow(row, index + 2);
          
          if (data) {
            processedData.push(data);
            validRows++;
          } else {
            invalidRows++;
          }

          if (errors.length > 0) {
            allErrors.push(...errors);
          }
        });

        resolve({
          data: processedData,
          errors: allErrors,
          meta: {
            totalRows: results.data.length,
            validRows,
            invalidRows,
          },
        });
      },
      error: (error: Error) => {
        reject(new Error(`CSV parsing failed: ${error.message}`));
      },
    });
  });
};
