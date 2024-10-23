import React from "react";

interface ITextWithBgColor {
  textLabel: string;
  textStyle: string;
}
const TextWithBgColor: React.FC<ITextWithBgColor> = ({
  textLabel,
  textStyle,
}) => {
  return (
    <h2 className={textStyle + " font-bold rounded-[40px] px-3 py-2"}>
      {textLabel}
    </h2>
  );
};

export default TextWithBgColor;
