import Backdrop from '@/components/atoms/Backdrop/Backdrop';
import React from 'react';

import PropagateLoader from 'react-spinners/PropagateLoader';

const FullScreenLoader = () => {
  return (
    <Backdrop open={true}>
      <PropagateLoader color="#109b4f" size={20} />
    </Backdrop>
  );
};

export default FullScreenLoader;
