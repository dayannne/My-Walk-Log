import { useMap } from '../_component/common/Map';

const useMarkerClusterer = () => {
  const mapContext = useMap();

  const clusterer = {
    map: mapContext?.mapData as kakao.maps.Map, // 지도 객체
    averageCenter: true,

    calculator: [10, 30, 100, 1000],
    styles: [
      {
        background: 'rgba(255, 80, 80, .8)',
        width: '3rem',
        height: '3rem',
        color: '#fff',
        borderRadius: '3rem',
        textAlign: 'center',
        lineHeight: '3.3rem',
        fontSize: '1.5rem',
      },
      {
        background: 'rgba(255, 80, 80, .8)',
        width: '3.5rem',
        height: '3.5rem',
        color: '#fff',
        borderRadius: '3rem',
        textAlign: 'center',
        lineHeight: '4.1rem',
        fontSize: '2rem',
      },
      {
        background: 'rgba(255, 80, 80, .8)',
        width: '5rem',
        height: '5rem',
        color: '#fff',
        borderRadius: '3rem',
        textAlign: 'center',
        lineHeight: '5rem',
        fontSize: '2rem',
      },
      {
        background: 'rgba(255, 80, 80, .8)',
        width: '6rem',
        height: '6rem',
        color: '#fff',
        borderRadius: '3rem',
        textAlign: 'center',
        lineHeight: '6rem',
        fontSize: '2rem',
      },
    ],
    minLevel: 3,
  };

  const addMarkers = (markers: kakao.maps.Marker[]) => {
    mapContext?.markerClusterer?.addMarkers(markers);
  };
  const clearMarkers = () => {
    mapContext?.markerClusterer?.clear();
  };

  return { clusterer, addMarkers, clearMarkers };
};

export default useMarkerClusterer;
