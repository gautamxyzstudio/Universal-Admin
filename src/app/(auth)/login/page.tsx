"use client";
import Image from "next/image";
import React from "react";
import { Icons, Images } from "../../../../public/exporter";
import { SVGS } from "@/constant/staticSvgs";
import SVGComponent from "@/components/atoms/SvgComponent/SVGComponent";
import LoginForm from "@/components/templates/loginForm/LoginForm";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css/effect-fade";

const Login = () => {
  return (
    <div className="w-full h-screen bg-Black flex flex-row justify-center ">
      <div className="max-w-screen-2xl z-20 w-full relative max-h-[920px] overflow-hidden">
        <div className="ml-20 pt-6 mb-[139px] flex h-full flex-col justify-between">
          <Image width={144} height={56} src={Icons.logo} alt="logo" />
          <div className="mb-[90px] flex gap-x-[194px] items-center">
            <LoginForm />
            {/* Silde Fade Effect */}
              <Swiper
                slidesPerView={1}
                fadeEffect={{
                  crossFade: true,
                }}
                speed={4000}
                spaceBetween={30}
                effect={"fade"}
                loop={true}
                centeredSlides={true}
                autoplay={{
                  delay: 1500,
                  disableOnInteraction: false,
                }}
                modules={[Autoplay, EffectFade]}
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
      <div className="absolute h-screen overflow-hidden -top-[1%] -right-[3%]">
        <SVGComponent svg={SVGS.loginBg} />
      </div>
    </div>
  );
};

export default Login;
