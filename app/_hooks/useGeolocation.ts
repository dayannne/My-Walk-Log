import { useState, useEffect } from 'react';
import { Latlng } from '../shared/types/map';

const useGeolocation = () => {
  const [location, setLocation] = useState<Latlng | null>(null); // 현재 위치를 저장할 상태

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(successHandler, errorHandler); // 성공시 successHandler, 실패시 errorHandler 함수가 실행된다.
  }, []);

  const successHandler = (response: {
    coords: { latitude: number; longitude: number };
  }) => {
    // coords: GeolocationCoordinates {latitude: 위도, longitude: 경도, …} timestamp: 1673446873903
    const { latitude, longitude } = response.coords;
    setLocation({ latitude, longitude });
  };

  const errorHandler = (error: GeolocationPositionError) => {
    console.log(error);
  };

  return { location };
};

export default useGeolocation;
