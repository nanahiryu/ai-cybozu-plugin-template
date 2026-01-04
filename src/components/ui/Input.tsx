import { TextField, type TextFieldProps } from "@mui/material";

export type InputProps = Omit<TextFieldProps, "variant"> & {
  variant?: "outlined" | "filled" | "standard";
};

export const Input = ({
  variant = "outlined",
  size = "small",
  ...props
}: InputProps) => {
  return <TextField variant={variant} size={size} {...props} />;
};
