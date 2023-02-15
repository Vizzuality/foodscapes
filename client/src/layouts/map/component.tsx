// import Footer from 'containers/footer';

import Header from 'containers/header/map';

type LayoutMapProps = {
  children: React.ReactNode;
};

const LayoutMap: React.FC<LayoutMapProps> = (props: LayoutMapProps) => {
  const { children } = props;

  return (
    <main className="flex flex-col font-sans antialiased lg:min-h-screen">
      <Header />

      <div className="relative grow">
        {/* Content */}
        {children}
      </div>

      {/* <Footer /> */}
    </main>
  );
};

export default LayoutMap;
