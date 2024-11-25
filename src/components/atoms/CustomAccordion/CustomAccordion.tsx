import React from 'react';
import { IAccordion } from './CustomAccordion.types';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
const CustomAccordion: React.FC<IAccordion> = ({
  title,
  description,
  isExpanded,
}) => {
  return (
    <Accordion
      style={{
        boxShadow: 'none',
        backgroundColor: 'transparent',
        width: '100%',
      }}
      expanded={isExpanded}
    >
      <AccordionSummary
        sx={{
          padding: 0,
          height: 58,
        }}
        expandIcon={<ExpandMoreIcon />}
      >
        {title}
      </AccordionSummary>
      <AccordionDetails>{description}</AccordionDetails>
    </Accordion>
  );
};

export default CustomAccordion;
