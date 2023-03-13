import { Oval } from 'react-loader-spinner';

const Loader = () => {
  return (
    <Oval
      height={80}
      width={80}
      color="#3f51b5"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
      ariaLabel="oval-loading"
      secondaryColor="#3f51b5"
      strokeWidth={2}
      strokeWidthSecondary={2}
    />
  );
};

export default Loader;
