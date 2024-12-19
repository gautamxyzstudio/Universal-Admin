import Image from "next/image";
import Link from "next/link";
import React from "react";
import { ILinkWithImageRenderProps } from "./LinkWithImageRender.types";

const LinkWithImageRender: React.FC<ILinkWithImageRenderProps> = ({
  href,
  icon,
  title,
  isActive,
  onClickOption,
}) => {
  return (
    <Link
      href={href}
      onClick={onClickOption}
      className={`flex flex-row pl-6 max-w-full h-[72px] items-center gap-x-3`}
    >
      <Image src={icon} alt={title} className="w-6 h-6" />
      <span
        className={`text-md ${
          isActive ? "font-bold text-primary" : "text-disable"
        }`}
      >
        {title}
      </span>
    </Link>
  );
};

export default LinkWithImageRender;
