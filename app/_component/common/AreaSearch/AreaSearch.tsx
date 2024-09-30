import React, { useEffect, useState } from 'react';
import { Area } from '@/app/shared/types/place';
import { useGetArea } from '@/app/store/server/area';
import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import AreaSearchMap from './AreaSearchMap';
import AreaSearchInput from './AreaSearchInput';
import LocationSearch from './LocationSearch';
import { calculateCenter } from '@/app/shared/function/calculator';
import { IAddress } from '@/app/shared/types/profile';
import { Latlng } from '@/app/shared/types/map';

interface AreaSearchProps {
  address: IAddress | null;
  setAddress: (address: IAddress | null) => void;
  type: 'SIGNUP' | 'EDIT';
}

function AreaSearch({ address, setAddress, type }: AreaSearchProps) {
  const [areaName, setAreaName] = useState<string | null>(null);
  const [filteredResults, setFilteredResults] = useState<Area[]>([]);
  const [currLocation, setCurrLocation] = useState<Latlng | null>(null);
  const [selectedCode, setSelectedCode] = useState<number | null>(null);

  const { data: areaInfo } = useGetArea({
    areaCode: selectedCode,
    location: currLocation,
  });

  const handleSelectArea = (item: Area) => {
    setCurrLocation(null);
    setSelectedCode(Math.floor(item.법정동코드 / 100));
    setAreaName(item.법정동명);
    setFilteredResults([]);
  };

  useEffect(() => {
    if (areaInfo) {
      const position = calculateCenter(areaInfo.bbox);
      const areaData = areaInfo.features[0]?.properties;
      const polygonPaths: number[][] =
        areaInfo.features[0]?.geometry?.coordinates[0][0];

      const newAddress = {
        code: areaData.emd_cd,
        areaName: areaData.full_nm,
        center: position,
        polygonPaths: polygonPaths,
      };
      setAddress(newAddress);
      setSelectedCode(areaData.emd_cd);
      setAreaName(areaData.full_nm);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [areaInfo]);

  return (
    <div className='flex flex-col gap-2'>
      {type === 'EDIT' && (
        <LocationSearch
          currLocation={currLocation}
          setCurrLocation={setCurrLocation}
        />
      )}
      <AreaSearchInput
        areaName={areaName}
        setAreaName={setAreaName}
        setFilteredResults={setFilteredResults}
        filteredResults={filteredResults}
        onSelect={handleSelectArea}
      />
      {address && <AreaSearchMap address={address} />}
    </div>
  );
}

export default AreaSearch;
