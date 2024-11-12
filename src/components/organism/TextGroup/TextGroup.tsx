import React from "react";
import { ITextGroupProps } from "./TextGroup.types";
import Image from "next/image";

const TextGroup: React.FC<ITextGroupProps> = ({
  title,
  subTitle,
  titleStyle,
  text,
  subText,
  textStyle,
  divStyle,
  textgroupStyle,
  icon,
}) => {
  return (
    <div className={"flex items-center gap-x-1 h-fit " + divStyle}>
      {icon && <Image src={icon} alt={title} className="w-6 h-6" />}
      <div className={textgroupStyle}>
        <div className={"flex gap-x-3 items-center text-disable " + titleStyle}>
          {title}
          {subTitle && (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="2"
                height="14"
                viewBox="0 0 2 14"
                fill="none"
              >
                <path d="M1 1V13" stroke="#DBDBDB" stroke-linecap="round" />
              </svg>
              {subTitle}
            </>
          )}
        </div>
        <div className={"flex gap-x-3 items-center  text-Black" + textStyle}>
          {text}
          {subText && (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="2"
                height="14"
                viewBox="0 0 2 14"
                fill="none"
              >
                <path d="M1 1V13" stroke="#DBDBDB" stroke-linecap="round" />
              </svg>
              {subText}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TextGroup;
