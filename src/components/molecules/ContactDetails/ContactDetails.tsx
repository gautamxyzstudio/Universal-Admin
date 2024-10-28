import React from 'react';
import { IContactDetailsCardProps } from './ContactDetails.types';

const ContactDetails: React.FC<IContactDetailsCardProps> = ({
  phone,
  email,
}) => {
  return (
    <div className="flex flex-col text-[14px] leading-[18px] justify-center h-fit w-full">
      {phone}
      <span className="text-disable">{email}</span>
    </div>
  );
};

export default ContactDetails;
