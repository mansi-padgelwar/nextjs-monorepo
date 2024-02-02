import React from "react";

const CustomIcons = ({ icon: IconComponent, iconSize = 32, className }: { icon: React.ComponentType<any>, iconSize?: number, className?: string }) => {
  if (!IconComponent) {
    return null;
  }
  return (
    <>
      <IconComponent size={iconSize} className={`${className}`} />
    </>
  );
};

export default CustomIcons;
