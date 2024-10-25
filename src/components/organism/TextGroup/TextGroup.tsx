import React from "react";
import { ITextGroupProps } from "./TextGroup.types";
import Image from "next/image";

const TextGroup: React.FC<ITextGroupProps> = ({
  title,
  titleStyle,
  subTitle,
  subTitleStyle,
  divStyle,
  textgroupStyle,
  icon,
}) => {
  return (
    <div className={"flex items-center gap-x-1 h-fit " + divStyle}>
      {icon && <Image src={icon} alt={title} className="w-6 h-6" />}
      <div className={textgroupStyle}>
        <span className={titleStyle + " text-disable"}>{title}</span>
        <span className={subTitleStyle + " text-Black"}>{subTitle}</span>
      </div>
    </div>
  );
};

export default TextGroup;
