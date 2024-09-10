import React from "react";

interface ButtonProps {
  onClick: () => void;
  label: string;
  styleType?: "primary" | "secondary" | "danger";
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  label,
  styleType = "primary",
  disabled = false,
}) => {
  const getButtonClass = () => {
    switch (styleType) {
      case "primary":
        return "btn-primary";
      case "secondary":
        return "btn-secondary";
      case "danger":
        return "btn-danger";
      default:
        return "";
    }
  };

  return (
    <button className={`button ${getButtonClass()}`} onClick={onClick} disabled={disabled}>
      {label}
    </button>
  );
};

export default Button;
