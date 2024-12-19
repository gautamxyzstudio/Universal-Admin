import React from "react";
import { IAccordion } from "./CustomAccordion.types";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
const CustomAccordion: React.FC<IAccordion> = ({
  title,
  description,
  isExpanded,
}) => {
  return (
    <>
      <Accordion
        slotProps={{ transition: { unmountOnExit: true } }}
        style={{
          boxShadow: "none",
          backgroundColor: "transparent",
          width: "100%",
        }}
        expanded={isExpanded}
      >
        <AccordionSummary
          sx={{
            margin: 0,
            paddingLeft: 0,
            paddingRight: 0,
            color: "#121212",
            fontSize: "16px",
            lineHeight: "20px",
            fontWeight: "bold",
            "&.Mui-expanded": {
              minHeight: "48px",
            },
            ".MuiAccordionSummary-content.Mui-expanded": {
              margin: 0,
            },
          }}
          expandIcon={isExpanded ? null : <ExpandMoreIcon />}
        >
          {title}
        </AccordionSummary>
        <AccordionDetails
          sx={{
            "&.MuiAccordionDetails-root": {
              paddingLeft: 0,
            },
          }}
        >
          {description}
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default CustomAccordion;
