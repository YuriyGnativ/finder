import * as React from "react";
import TextField from "@mui/material/TextField";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export default function BasicDatePicker({ disabled, onChange, value }) {
  // const [value, setValue] = React.useState(null);

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <DatePicker
        disabled={disabled}
        label="from"
        value={value}
        onChange={onChange}
        renderInput={(params) => (
          <TextField {...params} sx={{ margin: "10px 0" }} />
        )}
      />
    </LocalizationProvider>
  );
}
