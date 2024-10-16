'use client';
import CustomButton from '@/components/atoms/CutomButton/CustomButton';
import { STRINGS } from '@/constant/en';
import { Add } from '@mui/icons-material';
import React from 'react';

const PageHeader = () => {
  return (
    <div className="flex justify-between items-center mt-4 mb-6">
      <h1 className="text-Black font-bold text-[24px] leading-7">
        {STRINGS.employeeManagement}
      </h1>
      <CustomButton
        title="Add Employee"
        icon={<Add />}
        onClick={() => console.log('employee')}
        size="small"
        customStyles={{
          textAlign: 'center',
          color: '#ffff',
          gap: '4px',
          fontSize: '16px',
          lineHeight: '20px',
          textTransform: 'capitalize',
          padding: '10px 12px',
          borderRadius: '8px',
        }}
        buttonType={'primary'}
      />
    </div>
  );
};

export default PageHeader;
