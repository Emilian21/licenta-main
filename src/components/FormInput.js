import React from "react";

import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import FormHelperText from "@mui/joy/FormHelperText";
import Input from "@mui/joy/Input";

const FormInput = ({ required = true, error, type, label, placeholder, mb, ...props }) => {
  return (
    <FormControl required={required}>
      <FormLabel sx={{ color: error && "#d3232f" }}>{label}</FormLabel>
      <Input
        placeholder={placeholder}
        type={type}
        error={!!error}
        sx={{ borderColor: error && "#d3232f", mb: !!error ? 0 : mb }}
        {...props}
      />
      {error && <FormHelperText sx={{ color: "#cc0000", mb: mb }}>{error}</FormHelperText>}
    </FormControl>
  );
};

export default FormInput;
