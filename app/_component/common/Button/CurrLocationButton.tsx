import { useState } from 'react';
import useGeolocation from '@/app/_hooks/useGeolocation';
import { useMap } from '@/app/shared/contexts/Map';
import Image from 'next/image';

const CurrLocationButton = () => {
  const { location, requestLocation } = useGeolocation();
  const mapContext = useMap();
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    const { setCurrLocation, mapData } = mapContext!;

    if (location) {
      const newLocation = new kakao.maps.LatLng(
        location.latitude,
        location.longitude,
      );
      mapData?.panTo(newLocation);
      setCurrLocation(newLocation);
    } else {
      requestLocation();
    }
  };

  const isActiveLocation =
    mapContext?.currLocation?.getLat() === location?.latitude &&
    mapContext?.currLocation?.getLng() === location?.longitude;

  return (
    <button
      className={`sm-md:left-4 absolute bottom-4 z-10 h-11 w-11 rounded-lg bg-white p-2 shadow-md lg:right-4 ${isActiveLocation ? 'active' : ''}`}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Image
        className='h-full w-full'
        src={
          isHovered || isActiveLocation
            ? '/icons/icon-my-location.svg'
            : '/icons/icon-my-location(gray).svg'
        }
        alt='현재 위치로 이동'
        width={50}
        height={50}
      />
    </button>
  );
};

export default CurrLocationButton;
