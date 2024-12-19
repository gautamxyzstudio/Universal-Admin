import IconWithText from '@/components/molecules/IconWithText/IconWithText';
import UserNameWithImage from '@/components/molecules/UserNameWithImage/UserNameWithImage';
import React from 'react';
import { Icons } from '../../../../public/exporter';
import SVGComponent from '@/components/atoms/SvgComponent/SVGComponent';
import { SVGS } from '@/constant/staticSvgs';
import { ILinkedCompanyCardProps } from './LinedCompanyCard.types';

const LinkedCompanyCard: React.FC<ILinkedCompanyCardProps> = ({
  companyName,
  companyEmail,
  companyLocation,
  companyLogo,
  onPressCross,
}) => {
  return (
    <div className="w-full px-6 relative py-4 bg-statusLightGreen">
      <UserNameWithImage
        name={companyName ?? ''}
        divStyle=" !gap-y-0"
        imageStyle="!w-10 !h-10"
        companyNameStyle="text-disable !text-text-12"
        companyName="IT Sector"
        image={companyLogo ?? ''}
      />
      <div className="h-2" />
      {companyEmail && (
        <IconWithText text={companyEmail} icon={Icons.emailIcon} />
      )}
      {companyLocation && (
        <IconWithText text={companyLocation} icon={Icons.locationPin} />
      )}
      <div
        onClick={onPressCross}
        className="absolute cursor-pointer right-2 top-2"
      >
        <SVGComponent svg={SVGS.cross} />
      </div>
    </div>
  );
};

export default LinkedCompanyCard;
