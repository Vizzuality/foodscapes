import dynamic from 'next/dynamic';

const Data = dynamic(() => import('./data'), { ssr: false });

const Map = () => {
  return (
    <>
      <Data />
    </>
  );
};

export default Map;
