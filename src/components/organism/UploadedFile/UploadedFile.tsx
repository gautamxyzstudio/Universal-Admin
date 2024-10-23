import CustomButton from "@/components/atoms/CutomButton/CustomButton";
import { STRINGS } from "@/constant/en";
import { MoreVertOutlined } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import React from "react";
import { Icons } from "../../../../public/exporter";

interface IUploadedFileProps {
  fileName: string;
  days?: string;
  fileSrc: StaticImport;
}

const UploadedFile: React.FC<IUploadedFileProps> = ({
  fileName,
  days,
  fileSrc,
}) => {
  return (
    <div className="bg-lightPrimary rounded p-3 flex items-center justify-between">
      <div className="flex items-center gap-x-3">
        <Image
          src={fileSrc}
          alt="documents image"
          className="w-14 h-14 rounded object-contain"
        />
        <div className="flex flex-col gap-y-2">
          <h2 className="text-Black text-[16px] leading-5">{fileName}</h2>
          {days && (
            <h2 className="text-disable text-[14px] leading-[18px]">{days}</h2>
          )}
        </div>
      </div>
      <div className="flex items-center gap-x-3">
        <CustomButton customStyles={{
          display: 'flex',
          alignItems: 'center',
          gap:"4px"
          

        }}   buttonType="outline-small-red" variant="outlined" title={STRINGS.deny} onClick={undefined} icon ={<Image src={Icons.crossmark} alt='deny' className="w-4 h-4" />}/>
        <CustomButton buttonType="outline-small-green" variant="outlined" title={STRINGS.approved} onClick={undefined} icon={<Image src={Icons.accept} alt='accept' className="w-4 h-4" />}/>
        <h2 className="bg-lightGreen text-green font-bold rounded-[40px] px-3 py-2">
          {STRINGS.approved}
        </h2>
        <IconButton
          sx={{ padding: 0 }}
          onClick={() => console.log("clicked the three dot button")}
        >
          <MoreVertOutlined />
        </IconButton>
      </div>
    </div>
  );
};

export default UploadedFile;
