import React from "react";
import { ITextGroupProps } from "./TextGroup.types";

const TextGroup: React.FC<ITextGroupProps> = ({
  title,
  titleStyle,
  subTitle,
  subTitleStyle,
  divStyle,
}) => {
  return (
    <div className={divStyle}>
      <span className={titleStyle + " text-disable"}>{title}</span>
      <span className={subTitleStyle + " text-Black"}>{subTitle}</span>
    </div>
  );
};

export default TextGroup;
