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
            className={`sm-md:overflow-y-hidden relative z-20 flex w-full shrink-0 flex-col bg-white lg:flex lg:w-96 lg:min-w-96 lg:basis-auto ${(pathname.includes('profile') || pathname.includes('detail') || pathname.includes('feed')) && 'basis-full'} `}
          >
            {children}
          </div>
          <div
            className={`relative z-0 flex basis-full overflow-y-hidden lg:flex lg:overflow-auto ${!pathname.includes('place') ? 'hidden' : pathname.includes('detail') ? 'hidden' : ''} `}
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
