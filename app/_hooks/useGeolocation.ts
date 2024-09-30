import { useState, useEffect } from 'react';
import { Latlng } from '../shared/types/map';

const useGeolocation = () => {
  const [location, setLocation] = useState<Latlng | null>(null);
  useEffect(() => {
    const successHandler = (response: {
      coords: { latitude: number; longitude: number };
    }) => {
      const { latitude, longitude } = response.coords;
      setLocation({ latitude, longitude });
    };

    const errorHandler = (error: GeolocationPositionError) => {
      console.log(error);
      // 기본값 설정 (서울)
      setLocation({ latitude: 37.5665, longitude: 126.978 });
    };

    // 위치 정보 요청
    navigator.geolocation.getCurrentPosition(successHandler, errorHandler);
  }, []);

  return { location };
};

export default useGeolocation;
