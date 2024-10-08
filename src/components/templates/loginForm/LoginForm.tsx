'use client';
import CustomInput from '@/components/atoms/CustomInput/CustomInput';
import CustomButton from '@/components/atoms/CutomButton/CustomButton';
import { STRINGS } from '@/constant/en';
import React, { useState } from 'react';

const LoginForm = () => {
  const [inputDetails, setInputDetails] = useState<{
    email: string;
    password: string;
  }>({
    email: '',
    password: '',
  });
  return (
    <div className="w-[532px]">
      <h1 className="text-heading-40 text-white">{STRINGS.login}</h1>
      <div className="h-9" />
      <h1 className="text-subHeading-24 text-white">
        {STRINGS.pleaseEnterYour}
      </h1>
      <div className="h-4" />
      <CustomInput
        label={STRINGS.email}
        value={inputDetails.email}
        onChange={(e) =>
          setInputDetails((prev) => ({ ...prev, email: e.target.value }))
        }
        type={'email'}
      />
      <div className="h-9" />
      <CustomInput
        label={STRINGS.password}
        value={inputDetails.password}
        onChange={(e) =>
          setInputDetails((prev) => ({ ...prev, password: e.target.value }))
        }
        type={'password'}
      />
      <div className="h-14" />
      <CustomButton />
    </div>
  );
};

export default LoginForm;
