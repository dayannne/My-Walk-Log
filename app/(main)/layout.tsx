'use client';

import Navigation from '../_component/common/Navigation';
import SearchAgainButton from '../_component/search/SearchAgainButton';
import SearchCategory from '../_component/search/SearchCategory';
import MapProvider from '../shared/contexts/Map';
import MapContainer from '../_component/common/MapContainer';
import { useParams, usePathname } from 'next/navigation';
import PlaceDetail from '../_component/place/PlaceDetail';

export interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const pathname = usePathname();
  const params = useParams();

  return (
    <MapProvider>
      <div className='flex h-full w-full flex-col-reverse bg-white shadow-2xl lg:flex-row'>
        <Navigation />
        <main className='flex basis-full flex-col overflow-y-hidden lg:flex-row lg:overflow-auto'>
          <div
            className={`relative z-10 flex w-full shrink-0 flex-col bg-white lg:w-80 lg:min-w-80 ${(pathname.includes('profile') || pathname.includes('detail') || pathname.includes('feed')) && 'basis-full'} overflow-y-hidden lg:flex lg:basis-auto`}
          >
            {children}
          </div>
          <div
            className={`relative flex basis-full ${!pathname.includes('place') ? 'hidden' : pathname.includes('detail') ? 'hidden' : ''} z-0 overflow-y-hidden lg:flex lg:overflow-auto`}
          >
            <div
              className={`basis-full ${pathname.includes('detail') && 'hidden lg:block'}`}
            >
              <SearchCategory />
              <SearchAgainButton />
              <MapContainer />
            </div>
          </div>
        </main>
      </div>
    </MapProvider>
  );
};

export default MainLayout;
