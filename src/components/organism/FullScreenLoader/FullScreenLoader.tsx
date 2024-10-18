import Backdrop from '@/components/atoms/Backdrop/Backdrop';
import React from 'react';

import PropagateLoader from 'react-spinners/PropagateLoader';

const FullScreenLoader = () => {
  return (
    <Backdrop open={true}>
      <PropagateLoader color="#FF7312" size={20} />
    </Backdrop>
  );
};

export default FullScreenLoader;
