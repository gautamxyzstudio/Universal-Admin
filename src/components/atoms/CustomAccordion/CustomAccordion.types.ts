import React from 'react';

export type IAccordion = {
  title: React.ReactNode;
  description: React.ReactNode;
  isExpanded?: boolean;
  // onChangeHandler:(event: React.SyntheticEvent, expanded: boolean) => void;
};
