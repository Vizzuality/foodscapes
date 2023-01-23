import useFoodscapes from 'hooks/foodscapes';

const Data = () => {
  const { data, isFetched, isFetching } = useFoodscapes();
  console.log({ data, isFetched, isFetching });

  return <></>;
};

export default Data;
