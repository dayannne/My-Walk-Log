import { useMap } from '../shared/contexts/Map';
import { useEffect, useState } from 'react';

const useSearchTrail = () => {
  const mapContext = useMap();
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  useEffect(() => {
    // Kakao Maps API 로드 여부 확인
    if (typeof kakao !== 'undefined' && kakao.maps) {
      setIsMapLoaded(true); // Kakao Maps API가 로드되었음을 표시
    }
  }, []);

  const displayTrailMarkers = (trails: any[]) => {
    if (!isMapLoaded) return; // Kakao Maps가 로드되지 않으면 아무 작업도 하지 않음

    const { mapData } = mapContext!;
    const newBounds = new kakao.maps.LatLngBounds();

    trails.forEach((trail) => {
      const position = new kakao.maps.LatLng(
        parseFloat(trail.COURS_SPOT_LA),
        parseFloat(trail.COURS_SPOT_LO),
      );

      const imageSrc = '/icons/icon-marker.svg',
        imageSize = new kakao.maps.Size(56, 56),
        imageOption = { offset: new kakao.maps.Point(27, 54) };
      const markerImage = new kakao.maps.MarkerImage(
        imageSrc,
        imageSize,
        imageOption,
      );

      const marker = new kakao.maps.Marker({
        position: position,
        image: markerImage,
      });
      marker.setMap(mapData);
      newBounds?.extend(position);
    });

    mapData?.setBounds(newBounds);
  };

  return { displayTrailMarkers };
};

export default useSearchTrail;
