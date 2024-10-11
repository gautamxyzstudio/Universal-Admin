import CustomButton from "@/components/atoms/CustomButton";
import { STRINGS } from "@/constant/en";
import React from "react";

const EmployeeManagement = () => {
  return (
    <div className="items-center px-10 justify-items-center min-h-screen bg-">
      <div className="flex justify-between items-center mt-4 mb-6">
        <h1 className="text-Black font-bold text-[24px] leading-7">
          {STRINGS.employeeManagement}
        </h1>
        <CustomButton title="+ Add Employee" />
      </div>
    </div>
  );
};

export default EmployeeManagement;
