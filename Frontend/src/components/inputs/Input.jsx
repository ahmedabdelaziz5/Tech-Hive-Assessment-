import React from "react";
import { ErrorMessage, Field } from "formik";
import { FormControl, InputBase, InputLabel } from "@mui/material";
import classes from './styles/Input.module.css'
import classesError from './styles/InputError.module.css'
import { InputError } from "./";
export const Input = (props) =>
{
    const {
        label,
        name,
        type,
        disabled,
        dir,
        children,
        onChange,
        onBlur,
        validateOnInput,
        formik,
        isCustomValidate,
        ...rest
    } = props;

    return (
        <Field
            name={name}
            validate={(value) => isCustomValidate && validateOnInput(value, formik, name)}
        >
            {({ field, form, meta: { touched, error } }) =>
            {
                const inputError = !!error && touched;
                const { handleBlur, setFieldValue } = form;

                return (
                    <FormControl
                        className={`
                            ${classes.input} 
                            ${inputError ? classesError.formError : ""}
                        `}
                        variant="filled"
                        fullWidth
                        disabled={disabled}
                        dir={dir}
                    >
                        {label && (
                            <InputLabel
                                shrink
                                htmlFor={name}
                                className={classes.label}
                            >
                                {label}
                            </InputLabel>
                        )}

                        <InputBase
                            name={name}
                            id={name}
                            type={type}
                            label={label}
                            {...field}
                            {...rest}
                            variant="outlined"
                            className={!!children ? classes.password : ""}
                            // TODO handle it from validation for langauge level
                            inputProps={{ min: rest.min, max: rest.max }}
                            onBlur={(e) =>
                            {
                                if (onBlur) onBlur(e, handleBlur);
                                else handleBlur(e);
                            }}
                            onChange={(e) =>
                            {
                                setFieldValue(name, e.target.value)
                                if (onChange) onChange(e);
                            }}
                        />
                        {children}
                        <ErrorMessage
                            name={name}
                            component={InputError}
                        />
                    </FormControl>
                );
            }}
        </Field >
    );
}