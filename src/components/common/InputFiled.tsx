import React from "react";

export const InputField: React.FC<{
  label: string;
  component?: React.ReactNode;
}> = React.memo(({ label, component }) => (
  <div className="flex w-full justify-between items-center">
    <p className="w-1/3 font-medium text-base">{label}</p>
    {component}
  </div>
));
