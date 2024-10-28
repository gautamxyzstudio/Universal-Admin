import FormDrawer from "@/components/molecules/DrawerTypes/FormDrawer/FormDrawer";
import SearchField from "@/components/molecules/InputTypes/SearchInput/SearchInput";
import { STRINGS } from "@/constant/en";
import React from "react";

const AddCompanyList = ({show, handleClose}:{show: boolean;  handleClose:
    | ((event: object, reason: 'backdropClick' | 'escapeKeyDown') => void)
    | undefined;}) => {
  return (
    <FormDrawer
      title={STRINGS.selectComp}
      open={show}
      handleClose={handleClose}
      onPressCross={function (): void {
        throw new Error("Function not implemented.");
      }}
      >
        <SearchField/>
        

    </FormDrawer>
  );
};

export default AddCompanyList;
