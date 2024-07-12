import { ErrorMessage, Field } from 'formik';
import 'moment/locale/de';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import moment from 'moment';

import errorClasses from './styles/InputError.module.css'
import { InputError } from './InputError';
import { ReactComponent as DateIcon } from '../../assets/icons/date.svg'
import classes from './styles/DatePicker.module.css'

export const DatePicker = (props) =>
{
    const {
        label,
        name,
        isEdit,
        disabled
    } = props;

    return (
        <Field
            name={name} >
            {({ field, form, meta: { touched, error } }) =>
            {
                const inputError = !!error && touched;
                const { setFieldValue } = form;

                return (
                    <div
                        className={classes.container}
                    >
                            <DesktopDatePicker
                                id={name}
                                name={name}
                                label={label}
                                slots={{ openPickerIcon: DateIcon }}
                                value={(field.value && moment(field.value)) || null}
                                onChange={(newValue) => { setFieldValue(name, newValue._d) }}
                                className={`
                                    ${classes.date} 
                                    ${inputError ? errorClasses.formError : ""}
                                    ${isEdit ? classes.edit : ""}
                                `}
                                disabled={disabled}
                            />

                        <ErrorMessage
                            name={name}
                            component={InputError}
                        />
                    </div>
                );
            }}
        </Field >
    );
}
