import React from 'react';

interface ITextWithBgColor {
  textLabel: string;
  textStyle: string;
}
const TextWithBgColor: React.FC<ITextWithBgColor> = ({
  textLabel,
  textStyle,
}) => {
  return (
    <div
      className={
        textStyle +
        ' font-bold rounded-[40px] px-2 py-1 h-fit text-[12px] leading-4 w-fit'
      }
    >
      {textLabel}
    </div>
  );
};

export default TextWithBgColor;
