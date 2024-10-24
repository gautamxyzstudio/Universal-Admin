'use client';
import CustomButton from '@/components/atoms/CutomButton/CustomButton';
import { STRINGS } from '@/constant/en';
import { Add } from '@mui/icons-material';
import React from 'react';

const PageHeader: React.FC<IPageHeaderProps> = ({
  primaryButtonTitle,
  title,
  secondaryButtonTitle,
  withPrimaryButton,
  onPressPrimaryButton,
  withSecondaryButton,
}) => {
  return (
    <div className="flex w-full justify-between items-center my-6">
      <h1 className="text-Black font-bold text-[24px] leading-7">{title}</h1>
      <CustomButton
        title={primaryButtonTitle ?? ''}
        icon={<Add />}
        onClick={onPressPrimaryButton}
        size="small"
        buttonType={'primary-small'}
      />
    </div>
  );
};

export default PageHeader;
