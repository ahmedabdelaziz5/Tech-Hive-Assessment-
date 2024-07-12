import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material'
import { ErrorMessage, Field } from 'formik'

import classes from './styles/Gender.module.css'
import classesError from './styles/InputError.module.css'
import { InputError } from './'

export const Gender = ({ disabled }) =>
{
    return (
        <Field
            name="gender"
            disabled={disabled}
        >
            {({ field, meta: { touched, error } }) =>
            {
                const inputError = !!error && touched;

                return (
                    <FormControl
                        fullWidth
                        className={`
                            ${classes.container} 
                            ${inputError && classesError.formError}
                        `}
                        name="gender"
                    >
                        <FormLabel
                            className={classes.label}
                            id="gender-label"
                            htmlFor='gender'
                        >
                            Gender
                        </FormLabel>
                        <RadioGroup
                            className={`
                            ${classes.gender}
                            ${inputError && classesError.borderError}
                            `}
                            row
                            aria-labelledby="gender-label"
                            id="gender"
                            {...field}
                        >
                            <FormControlLabel value="male" control={<Radio
                                sx={{
                                    '& .MuiSvgIcon-root': {
                                        fontSize: 15,
                                    },
                                }}
                            />} label="Male" />
                            <FormControlLabel value="female" control={<Radio
                                sx={{
                                    '& .MuiSvgIcon-root': {
                                        fontSize: 15,
                                    },
                                }}
                            />} label="Female" />
                        </RadioGroup>
                        <ErrorMessage
                            name="gender"
                            component={InputError}
                        />
                    </FormControl>
                )
            }}
        </Field>

    )
}