import { Field } from "formik";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import SelectMui from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Box, CircularProgress, FormControl, InputLabel } from "@mui/material";
import {InputError} from "./";

export const Select = (props) =>
{
    const {
        label,
        name,
        options,
        disabled,
        ...rest
    } = props;

    return (
        <div
            style={{
                textAlign: "right"
            }}
        >

            <Field name={name}>
                {({ form, field }) =>
                {
                    const { value } = field;
                    const error = (form.errors[name] && form.touched[name]);
                    return (
                        <FormControl
                            fullWidth
                            disabled={disabled}
                        >
                            <InputLabel
                                sx={{
                                    color: "var(--white)",
                                    top: "10px",
                                    right: 0,
                                    transform: "none",
                                    fontSize: "var(--font-size-small)",
                                }}
                                shrink
                                htmlFor={name}
                            >
                                {label}
                            </InputLabel>
                            <SelectMui
                                name={name}
                                id={name}
                                defaultValue="none"
                                value={value}
                                disabled={disabled}
                                IconComponent={KeyboardArrowDown}
                                sx={{
                                    [`& .MuiSvgIcon-root`]: {
                                        transition: "0.2s",
                                        color: "var(--white)",
                                        left: "0",
                                        transform: "rotate(90deg)",
                                        [`&.MuiSelect-iconOpen`]: {
                                            transform: "rotate(0deg)",
                                        },
                                    },
                                    padding: "4px 0px",
                                    height: "34px",
                                    mb: "var(--margin-bottom)",
                                    mt: "30px",
                                    borderRadius: "var(--border-radius-inputs)",
                                    fontSize: "var(--font-size-small)",
                                    color: "var(--input-text-color)",
                                    outline: "none",
                                    backgroundColor: "var(--semi-dark-black)",
                                    width: "100%",
                                    zIndex: 999,
                                    "& .MuiOutlinedInput-notchedOutline": {
                                        outline: "none",
                                        border: "none",
                                    },
                                    "& .MuiSelect-select": {
                                        padding: "4px 15px !important",
                                        color: value === "none" ? "var(--visibility-icon-color)" : "var(--white)"
                                    },
                                    "& .Mui-disabled":{
                                        color:"var(--divider-color) !important",
                                        webkitTextFillColor:"var(--divider-color) !important"
                                    }
                                }}
                                {...field}
                                {...rest}
                            >
                                {props.loading &&
                                    <Box sx={{ textAlign: "center" }}>
                                        <CircularProgress size={20} />
                                    </Box>}

                                {options.map((option) =>
                                {
                                    return (
                                        <MenuItem
                                            sx={{
                                                backgroundColor: "var(--white)",
                                                color: "var(--dark-black)",
                                            }}
                                            key={option.value}
                                            value={option.value}
                                            name={option.value}
                                            disabled={option.value === 'none'}
                                        >
                                            {option.label}
                                        </MenuItem>
                                    );
                                })}
                            </SelectMui>
                            {error && (
                                <InputError dir="rtl">
                                    {form.errors[name]}
                                </InputError>
                            )}
                        </FormControl>
                    );
                }}
            </Field>
        </div>
    );
}