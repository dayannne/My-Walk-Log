import { useState, useEffect } from 'react';
import { Latlng } from '../shared/types/map';

const useGeolocation = () => {
  const [location, setLocation] = useState<Latlng | null>(null);

  // 위치 요청 함수
  const requestLocation = (onError?: () => void) => {
    navigator.geolocation.getCurrentPosition(successHandler, (error) => {
      console.log(error);
      if (onError) onError();
    });

    function successHandler(response: {
      coords: { latitude: number; longitude: number };
    }) {
      const { latitude, longitude } = response.coords;
      const newLocation = { latitude, longitude };
      setLocation(newLocation); // 위치 업데이트
    }
  };

  // 초기 위치 요청 (컴포넌트가 처음 렌더링될 때만 수행)
  useEffect(() => {
    const defaultLocation = { latitude: 37.5665, longitude: 126.978 }; // 서울 기본 위치
    navigator.geolocation.getCurrentPosition(successHandler, () => {
      setLocation(defaultLocation); // 오류 발생 시 기본 위치로 설정
    });

    function successHandler(response: {
      coords: { latitude: number; longitude: number };
    }) {
      const { latitude, longitude } = response.coords;
      setLocation({ latitude, longitude });
    }
  }, []);

  return { location, requestLocation };
};

export default useGeolocation;
