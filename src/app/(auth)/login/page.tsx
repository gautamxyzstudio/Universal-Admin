"use client";
import Image from "next/image";
import React from "react";
import { Icons, Images } from "../../../../public/exporter";
import { SVGS } from "@/constant/staticSvgs";
import SVGComponent from "@/components/atoms/SvgComponent/SVGComponent";
import LoginForm from "@/components/templates/loginForm/LoginForm";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

const Login = () => {
  return (
    <div className="w-full h-screen bg-Black flex flex-row justify-center ">
      <div className="max-w-screen-2xl z-20 w-full relative max-h-[920px] overflow-hidden">
        <div className="ml-20 pt-6 mb-[139px] flex h-full flex-col justify-between">
          <Image width={144} height={56} src={Icons.logo} alt="logo" />
          <div className="mb-[90px] flex gap-x-[194px] items-center">
            <LoginForm />
            <div className="w-[438px] h-[485px]">
              <Swiper
                slidesPerView={1}
                effect={"fade"}
                loop={true}
                centeredSlides={true}
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                }}
                pagination={{
                  clickable: true,
                }}
                modules={[Autoplay, Pagination, EffectFade]}
                className="mySwiper"
              >
                <SwiperSlide>
                  <Image src={Images.tabLogin} alt="Tab Login" />
                </SwiperSlide>
                <SwiperSlide>
                  <Image src={Images.webLogin} alt="Desktop Login" />
                </SwiperSlide>
                <SwiperSlide>
                  <Image src={Images.mobileLogin} alt="Mobile Login" />
                </SwiperSlide>
              </Swiper>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute h-screen overflow-hidden -top-[2%] -right-[4%]">
        <SVGComponent svg={SVGS.loginBg} />
      </div>
      <div className="absolute  h-screen overflow-hidden   top-0 right-[20%]">
        {/* <SVGComponent svg={SVGS.svgTwoLogin} /> */}
      </div>
    </div>
  );
};

export default Login;
