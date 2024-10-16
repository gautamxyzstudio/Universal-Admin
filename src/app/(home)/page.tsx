'use client';
import { STRINGS } from '@/constant/en';
import Image from 'next/image';
import { Icons } from '../../../public/exporter';

export default function Home() {
  const handleCreate = () => {
    console.log('Create button');
  };
  return (
    <div className="items-center px-10 justify-items-center min-h-screen bg-">
      <div className="flex justify-between items-center mt-4 mb-6">
        <h1 className="text-Black font-bold text-[24px] leading-7">
          {STRINGS.dashboard}
        </h1>
        <div className="flex items-center gap-x-6">
          <div className=" bg-extraWhite rounded-full  w-9 h-9">
            <Image
              src={Icons.calender}
              alt="notification"
              className="w-full h-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
