import { TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

//---------------------------------------
RHFTextField.propTypes = {
    name: PropTypes.string,
};
//form hien thi cac văn ban loi
export default function RHFTextField({ name, ...other }) {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => (
                <TextField {...field} fullWidth error={!!error} helperText={error?.message} {...other} />
            )}
        />
    );
}