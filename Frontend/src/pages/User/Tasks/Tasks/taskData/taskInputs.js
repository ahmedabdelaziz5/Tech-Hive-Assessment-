export const taskInputs = [
    {
        control: "input",
        type: "text",
        name: "title",
        label: "Task Title",
        placeholder: "Add task title"
    },
    {
        control: "input",
        type: "text",
        multiline: true,
        maxRows: 4,
        name: "content",
        label: "Description",
        placeholder: "Add more detailed..."
    },
    {
        control: "date",
        name: "startDate",
        label: "Date",
        size: 4,
        xs: 12
    },
    {
        control: "time",
        name: "startDate",
        label: "Start Time",
        size: 4,
        xs: 6
    },
    {
        control: "time",
        name: "endDate",
        label: "End Time",
        size: 4,
        xs: 6
    },
];

export const taskInitialValues={
    title:"",
    content:"",
    startDate:"",
    endDate:"",
    // TODO add taskStatus when add in backend
}