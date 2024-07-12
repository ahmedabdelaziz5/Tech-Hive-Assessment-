import { FieldArray } from 'formik'
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import { ReactComponent as AddRoundedIcon } from '../../assets/icons/addRounded.svg';
import
{
    FormikControl,
    ArrayIconBtn
} from './';
import classes from './styles/InputArray.module.css'

export const InputArray = (props) =>
{
    const { name, inputs, intialObject, disabled, formik } = props;

    const addOne = (push) => () =>
    {
        push(intialObject)
    }

    const removeOne = (remove, index) => () =>
    {
        remove(index)
    }

    return (
        <FieldArray
            name={name}
        >
            {({ remove, push, form }) =>
            {
                return (
                    form.values[name].map((ele, index) => (
                        <div
                            className={classes.container}
                            key={index}
                        >
                            {inputs.map(({ size, isFirst, ...input }) => 
                            {
                                return (
                                    <div
                                        key={`${name}.${index}.${input.name}`}
                                        className={isFirst ? classes.firstInput : classes.secondInput}
                                    >
                                        <FormikControl
                                            {...input}
                                            name={`${name}.${index}.${input.name}`}
                                            disabled={disabled}
                                            formik={formik}
                                        />
                                    </div>
                                )
                            }
                            )}
                            {/* Add Btn */}
                            <ArrayIconBtn
                                title="Add one"
                                onClick={addOne(push)}
                                disabled={disabled}
                            >
                                <AddRoundedIcon />
                            </ArrayIconBtn>

                            {/* Remove Btn */}
                            {index !== 0 && (
                                <ArrayIconBtn
                                    title="Remove"
                                    onClick={removeOne(remove, index)}
                                    disabled={disabled}
                                >
                                    <RemoveRoundedIcon />
                                </ArrayIconBtn>
                            )}
                        </div>
                    ))
                )
            }}
        </FieldArray>
    )
}