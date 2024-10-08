import React from 'react';

type ISVGComponentProps = {
  svg: string;
};

const SVGComponent: React.FC<ISVGComponentProps> = ({ svg }) => {
  return <div dangerouslySetInnerHTML={{ __html: svg }} />;
};

export default SVGComponent;
