import { useState, useEffect } from 'react';
import { BREAKPOINTS } from '../constants';

type DeviceType = 'mobile' | 'tablet' | 'desktop';

export const useResponsive = (): DeviceType => {
  const [deviceType, setDeviceType] = useState<DeviceType>('desktop');

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      
      if (width < BREAKPOINTS.MOBILE) {
        setDeviceType('mobile');
      } else if (width < BREAKPOINTS.TABLET) {
        setDeviceType('tablet');
      } else {
        setDeviceType('desktop');
      }
    };

    // Initial check
    handleResize();

    // Listen for resize events
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return deviceType;
};
