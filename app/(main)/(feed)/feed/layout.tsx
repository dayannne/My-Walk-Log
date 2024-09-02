export interface FeedLayoutProps {
  children: React.ReactNode;
}

const FeedLayout = ({ children }: FeedLayoutProps) => {
  return (
    <div
      className={`sm-md:overflow-y-hidden relative z-20 flex w-full shrink-0 basis-full flex-col bg-white lg:flex lg:w-96 lg:min-w-96 lg:basis-auto`}
    >
      {children}
    </div>
  );
};

export default FeedLayout;
