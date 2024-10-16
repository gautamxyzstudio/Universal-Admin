import Image from 'next/image';
import React from 'react';
import { Icons } from '../../../../public/exporter';
import { SVGS } from '@/constant/staticSvgs';
import SVGComponent from '@/components/atoms/SvgComponent/SVGComponent';

import LoginForm from '@/components/templates/loginForm/LoginForm';

const Login = () => {
  return (
    <div className="w-full h-screen bg-black flex flex-row justify-center ">
      <div className="max-w-screen-2xl z-20 w-full relative max-h-[920px] overflow-hidden">
        <div className="ml-20 pt-6 mb-[139px] flex h-full flex-col justify-between">
          <Image width={144} height={56} src={Icons.logo} alt="logo" />
          <div className="mb-[139px]">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="absolute h-screen overflow-hidden  top-0 right-0">
        <div>
          <SVGComponent svg={SVGS.svgOneLogin} />
        </div>
      </div>
      <div className="absolute  h-screen overflow-hidden   top-0 right-[20%]">
        <SVGComponent svg={SVGS.svgTwoLogin} />
      </div>
    </div>
  );
};

export default Login;
