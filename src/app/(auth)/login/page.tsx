import Image from 'next/image';
import React from 'react';
import { Icons } from '../../../../public/exporter';
import { SVGS } from '@/constant/staticSvgs';
import SVGComponent from '@/components/atoms/SvgComponent/SVGComponent';
import { STRINGS } from '@/constant/en';

const Login = () => {
  return (
    <div className="w-full h-screen overflow-hidden">
      <div className="ml-20 mt-6 mb-[139px] flex flex-col justify-between">
        <Image width={144} height={56} src={Icons.logo} alt="logo" />
        <h1 className="text-heading-40 text-white">{STRINGS.login}</h1>
      </div>
      <div className="absolute h-screen overflow-hidden  top-0 right-0">
        <div>
          <SVGComponent svg={SVGS.svgOneLogin} />
        </div>
      </div>
      <div className="absolute  h-screen overflow-hidden   top-0 right-0">
        <SVGComponent svg={SVGS.svgTwoLogin} />
      </div>
    </div>
  );
};

export default Login;
