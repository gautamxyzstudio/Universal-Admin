import React from 'react';
import { Button } from '@/app/Mtailwind';
import { STRINGS } from '@/constant/en';
import ActivityIndicator from '../ActivityIndicator/ActivityIndicator';

const CustomButton = () => {
  return (
    <Button
      loading={false}
      className="text-primary text-md rounded-[4px] w-[532px] h-12"
      color="white"
      placeholder={undefined}
      onPointerEnterCapture={undefined}
      onPointerLeaveCapture={undefined}
    >
      <ActivityIndicator />
    </Button>
  );
};

export default CustomButton;
