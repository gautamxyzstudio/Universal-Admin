import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import React from "react";

const IconWithText = ({ text, icon }: { text: string; icon: StaticImport }) => {
  return (
    <div className="inline-flex gap-x-2 text-Black">
      <Image
        alt={text}
        src={icon}
        className="w-6 h-6"
      />
      {text}
    </div>
  );
};

export default IconWithText;
