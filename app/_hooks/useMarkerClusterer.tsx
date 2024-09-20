import { useMemo, useCallback, useRef } from 'react';
import { useMap } from '../shared/contexts/Map';
import MarkerInfo from '../_component/common/MarkerInfo';
import ReactDOMServer from 'react-dom/server';

const useMarkerClusterer = () => {
  const mapContext = useMap();
  const clustererRef = useRef<kakao.maps.MarkerClusterer | null>(null);
  const clustererConfig = useMemo(
    () => ({
      map: mapContext?.mapData as kakao.maps.Map,
      averageCenter: true,
      disableClickZoom: true,
      gridSize: 60,
      calculator: [2, 5, 10, 15],
      styles: [],
      minLevel: 2,
    }),
    [mapContext],
  );

  const handleClusterClick = useCallback(
    (cluster: kakao.maps.Cluster) => {
      const level = mapContext?.mapData?.getLevel()! - 1;
      mapContext?.mapData?.setLevel(level, { anchor: cluster.getCenter() });
    },
    [mapContext],
  );

  const handleClustered = useCallback(
    (clusters: kakao.maps.Cluster[]) => {
      clusters.forEach((cluster: kakao.maps.Cluster) => {
        const clusterMarker = cluster.getClusterMarker();
        const overlay = cluster.getMarkers()[0] as kakao.maps.CustomOverlay;
        const placeName = extractTextFromHtml(
          overlay.getContent() as HTMLElement,
        );
        const size = cluster.getSize();
        const clusterContent = <MarkerInfo placeName={placeName as string} />;
        const newCluster = document.createElement('div');
        newCluster.innerHTML = ReactDOMServer.renderToString(clusterContent);
        newCluster.addEventListener(
          'click',
          () => handleClusterClick(cluster),
          { passive: true },
        );
        clusterMarker.setContent(newCluster);
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [handleClusterClick],
  );

  const createClusterer = useCallback(
    (overlays: kakao.maps.CustomOverlay[]) => {
      if (clustererRef.current) {
        clustererRef.current.clear();
      }

      const newClusterer = new kakao.maps.MarkerClusterer({
        ...clustererConfig,
        markers: overlays,
      });

      clustererRef.current = newClusterer;

      kakao.maps.event.addListener(newClusterer, 'clustered', handleClustered);

      return newClusterer;
    },
    [clustererConfig, handleClustered],
  );

  const extractTextFromHtml = useCallback((content: HTMLElement) => {
    const spanTag = content.querySelector('.speech-bubble span');
    if (spanTag) {
      return spanTag.textContent?.trim();
    }
    return null;
  }, []);

  const addMarkers = useCallback((overlays: kakao.maps.CustomOverlay[]) => {
    clustererRef.current?.addMarkers(overlays);
  }, []);

  const clearMarkers = useCallback(() => {
    clustererRef.current?.clear();
  }, []);

  return { createClusterer, addMarkers, clearMarkers };
};

export default useMarkerClusterer;
