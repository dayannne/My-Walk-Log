export interface ProfileLayoutProps {
  children: React.ReactNode;
}

const ProfileLayout = ({ children }: ProfileLayoutProps) => {
  return (
    <div
      className={`sm-md:overflow-y-hidden relative z-20 flex w-full shrink-0 basis-full flex-col bg-white lg:flex lg:w-96 lg:min-w-96 lg:basis-auto`}
    >
      {children}
    </div>
  );
};

export default ProfileLayout;
