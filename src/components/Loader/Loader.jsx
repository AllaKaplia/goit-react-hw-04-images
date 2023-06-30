import { Vortex } from "react-loader-spinner";
import { BoxLoader } from "./Loader.styled";

const Loader = () => {
  return (
    <BoxLoader>
        <Vortex
        visible={true}
        height="80"
        width="80"
        ariaLabel="vortex-loading"
        wrapperStyle={{}}
        wrapperClass="vortex-wrapper"
        colors={['red', 'green', 'blue', 'yellow', 'orange', 'purple']}
        />
    </BoxLoader>
  );
};

export default Loader;