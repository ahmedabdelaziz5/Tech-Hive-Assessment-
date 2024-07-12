import
{
    Gender,
    Input,
    InputArray,
    Password,
    Select,
    DatePicker,
    TimePicker,
} from './'

export const FormikControl = (props) =>
{
    const { control, size, isEdit, ...rest } = props;
    switch (control)
    {
        case "input":
            return <Input {...rest} />;
        case "password":
            return <Password {...rest} />;
        case "select":
            return <Select {...rest} />;
        case "array":
            return <InputArray {...rest} />;
        case "gender":
            return <Gender {...rest} />;
        case "date":
            return <DatePicker isEdit={isEdit} {...rest} />;
        case "time":
            return <TimePicker isEdit={isEdit} {...rest} />;

        default:
            return null;
    }
}