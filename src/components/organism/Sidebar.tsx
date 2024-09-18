import { icons } from '@/public/exporter';
import Image from 'next/image';
import React from 'react';

const Sidebar = () => {
  return (
    <div className="mt-6">
      <Image
        className="cursor-pointer mx-auto"
        width={144}
        height={56}
        src={icons.logo}
        alt="logo"
      />
    </div>
  );
};

export default Sidebar;
