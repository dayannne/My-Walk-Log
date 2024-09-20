import MapContainer from '../_component/common/MapContainer';
import Navigation from '../_component/common/Navigation';
import MapProvider from '../shared/contexts/Map';

export interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <MapProvider>
      <div className='flex h-full w-full flex-col-reverse bg-white shadow-2xl lg:flex-row'>
        <Navigation />
        <main className='flex basis-full flex-col overflow-y-hidden lg:flex-row'>
          {children}
          <div
            className={`relative z-0 flex basis-full overflow-y-auto lg:flex lg:overflow-hidden`}
          >
            <MapContainer />
          </div>
        </main>
      </div>
    </MapProvider>
  );
};

export default MainLayout;
