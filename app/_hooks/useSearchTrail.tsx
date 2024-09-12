import { useMap } from '../shared/contexts/Map';
import { useEffect, useState } from 'react';
import { ITrailInfo } from '../shared/types/trail';
import { useModalStore } from '../store/client/modal';

const useSearchTrail = () => {
  const mapContext = useMap();
  const { handleOpenInfo } = useModalStore();

  const displayTrailMarkers = (trails: ITrailInfo[]) => {
    const { mapData } = mapContext!;
    const newBounds = new kakao.maps.LatLngBounds();

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
    });

    mapData?.setBounds(newBounds);
  };

  return { displayTrailMarkers };
};

export default useSearchTrail;
