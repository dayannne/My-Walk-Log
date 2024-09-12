import { useMap } from '../shared/contexts/Map';
import { useState } from 'react';
import { ITrailInfo } from '../shared/types/trail';
import { useModalStore } from '../store/client/modal';

const useSearchTrail = () => {
  const mapContext = useMap();
  const { handleOpenInfo } = useModalStore();

  const displayTrailMarkers = (trails: ITrailInfo[]) => {
    const { mapData } = mapContext!;
    const newBounds = new kakao.maps.LatLngBounds();

    // Clear existing markers
    clearMarkers();

    const newMarkers: kakao.maps.Marker[] = [];

    trails?.forEach((trail) => {
      const position = new kakao.maps.LatLng(
        parseFloat(trail.COURS_SPOT_LA as string),
        parseFloat(trail.COURS_SPOT_LO as string),
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
        map: mapData as kakao.maps.Map,
        position: position,
        image: markerImage,
      });
      kakao.maps.event.addListener(marker, 'click', () => {
        mapData?.panTo(position);
        handleOpenInfo(trail);
      });

      marker.setMap(mapData);
      newBounds?.extend(position);
      newMarkers.push(marker); // Add marker to array
    });

    mapData?.setBounds(newBounds);
    mapContext?.setMarkers(newMarkers); // Update markers in context
  };

  const clearMarkers = () => {
    mapContext?.markers.forEach((marker) => marker.setMap(null));
    mapContext?.setMarkers([]);
  };

  return { displayTrailMarkers, clearMarkers };
};

export default useSearchTrail;
