import { useMap } from '../_component/common/Map';

const useMarkerClusterer = () => {
  const mapContext = useMap();

  const clusterer = {
    map: mapContext?.mapData as kakao.maps.Map, // 지도 객체
    averageCenter: true,
    disableClickZoom: true,
    gridSize: 60,
    calculator: [3, 5, 10, 15],
    styles: [
      {
        background: '#636a3d',
        boxShadow: '0px 0px 8px #636a3d',
        width: '3rem',
        height: '3rem',
        color: '#fff',
        borderRadius: '100%',
        textAlign: 'center',
        lineHeight: '3.3rem',
        fontSize: '1.5rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      },
      {
        background: '#8a9455',
        boxShadow: '0px 0px 8px #8a9455',
        width: '4rem',
        height: '4rem',
        color: '#fff',
        borderRadius: '100%',
        textAlign: 'center',
        lineHeight: '4.1rem',
        fontSize: '2rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      },
      {
        background: '#aeb781',
        boxShadow: '0px 0px 10px 1px #aeb781',
        width: '6rem',
        height: '6rem',
        color: '#fff',
        borderRadius: '100%',
        textAlign: 'center',
        lineHeight: '5rem',
        fontSize: '2rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      },
      {
        background: '#cfd4b4',
        boxShadow: '0px 0px 10px 1px #cfd4b4',
        width: '7.5rem',
        height: '7.5rem',
        color: '#fff',
        borderRadius: '100%',
        textAlign: 'center',
        lineHeight: '6rem',
        fontSize: '2rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
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
