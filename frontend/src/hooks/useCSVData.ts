import { useState, useEffect } from 'react';
import { parseCSVFromURL } from '../utils/csvParser';
import type { EVData, DataLoadingState, CSVParseError } from '../types';

interface UseCSVDataResult {
  data: EVData[];
  loading: DataLoadingState;
  errors: CSVParseError[];
  reload: () => void;
}

/**
 * Custom hook to load and parse CSV data
 */
export const useCSVData = (csvPath: string): UseCSVDataResult => {
  const [data, setData] = useState<EVData[]>([]);
  const [loading, setLoading] = useState<DataLoadingState>({
    isLoading: true,
    progress: 0,
    error: null,
    stage: 'idle',
  });
  const [errors, setErrors] = useState<CSVParseError[]>([]);
  const [reloadTrigger, setReloadTrigger] = useState(0);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading({
          isLoading: true,
          progress: 0,
          error: null,
          stage: 'fetching',
        });

        // Simulate progress for fetching
        setTimeout(() => {
          setLoading(prev => ({ ...prev, progress: 30, stage: 'parsing' }));
        }, 100);

        const result = await parseCSVFromURL(csvPath);

        setLoading(prev => ({ ...prev, progress: 70, stage: 'processing' }));

        // Set data and errors
        setData(result.data);
        setErrors(result.errors);

        setLoading({
          isLoading: false,
          progress: 100,
          error: null,
          stage: 'complete',
        });

        console.log(`✅ CSV loaded successfully: ${result.meta.validRows} valid rows, ${result.meta.invalidRows} invalid rows`);
        
        if (result.errors.length > 0) {
          console.warn(`⚠️ ${result.errors.length} parsing errors found`);
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to load CSV data';
        console.error('❌ CSV loading error:', error);
        
        setLoading({
          isLoading: false,
          progress: 0,
          error: errorMessage,
          stage: 'error',
        });
      }
    };

    loadData();
  }, [csvPath, reloadTrigger]);

  const reload = () => {
    setReloadTrigger(prev => prev + 1);
  };

  return { data, loading, errors, reload };
};
