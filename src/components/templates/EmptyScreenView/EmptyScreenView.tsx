import Image from 'next/image';
import React from 'react';
import { IEmptyScreenViewProps } from './EmptyScreenView.types';
import { Images } from '../../../../public/exporter';
import { STRINGS } from '@/constant/en';

const EmptyScreenView: React.FC<IEmptyScreenViewProps> = ({
  isDataEmpty,
  error,
  emptyViewSubTitle,
  illustrationStyes,
  emptyViewTitle,
  illustration,
}) => {
  return (
    <div>
      {isDataEmpty && !error && (
        <div className="flex flex-col justify-center items-center p-6">
          <Image
            className={illustrationStyes + ' w-[297px] h-[187px]'}
            alt="noSubAdmin"
            src={illustration ?? Images.errorILLustration}
          />
          <h1 className="mt-6 text-textBlack text-xl font-bold ">
            {emptyViewTitle}
          </h1>
          <h2 className="mt-2 text-sm text-textBlack">{emptyViewSubTitle}</h2>
        </div>
      )}
      {error && (
        <div className="flex flex-col justify-center items-center p-6">
          <Image
            className={illustrationStyes + ' w-[297px] h-[187px]'}
            alt="noSubAdmin"
            src={Images.errorILLustration}
          />
          <h1 className="mt-6 text-textBlack text-xl font-bold ">
            {STRINGS.something_went_wrong}
          </h1>
          <h2 className="mt-2 text-sm text-textBlack">{error.message}</h2>
        </div>
      )}
    </div>
  );
};

export default EmptyScreenView;
