import Image from "next/image";
import React from "react";
import { Icons } from "../../../../public/exporter";
import Link from "next/link";

const PageSubHeader = ({
  pageTitle,
  name,
}: {
  pageTitle: string;
  name: string;
}) => {
  return (
    <div className="flex items-center justify-start gap-x-3 text-base py-6">
      <Link href={"/employeeManagement"}>
        <span className=" text-disable">{pageTitle}</span>
      </Link>
      <Image src={Icons.leftArrow} className="w-auto h-auto" alt="Left Arrow" />
      <span className="font-bold text-primary">{name}</span>
    </div>
  );
};

export default PageSubHeader;
