import { ErrorMessage, Field } from 'formik';
import 'moment/locale/de';
import moment from 'moment';
import { DesktopTimePicker } from '@mui/x-date-pickers';

import errorClasses from './styles/InputError.module.css'
import { InputError } from './InputError';
import { ReactComponent as ArrowBottomIcon } from '../../assets/icons/arrowBottom.svg'
import classes from './styles/DatePicker.module.css'

export const TimePicker = (props) =>
{
    const {
        label,
        name,
        isEdit,
        disabled,
    } = props;

    return (
        <Field
            name={name}
        >
            {({ field, form, meta: { touched, error } }) =>
            {
                const inputError = !!error && touched;
                const { setFieldValue } = form;

                return (
                    <div
                        className={classes.container}
                    >
                        <DesktopTimePicker
                            id={name}
                            name={name}
                            label={label}
                            slots={{ openPickerIcon: ArrowBottomIcon }}
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
