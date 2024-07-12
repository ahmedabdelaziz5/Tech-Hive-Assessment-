import { useNavigate, useParams } from 'react-router-dom';

const useDate = () =>
{
    const navigate = useNavigate()
    const { date: selectedDate } = useParams();
    const handleDateSelect = (newValue, type) =>
    {

        let newDate;
        if (type === "mob")
        {
            // case if day opened and navigate on him and month changed 
            // mobile calender will navigate i do that to stop it
            if (String(newValue._i) === String(selectedDate)) return
            newDate = newValue._d;
        } else
        {
            newDate = newValue;
        }

        navigate(`/tasks/calender/${new Date(newDate).toISOString()}`)
    };
    return {
        handleDateSelect,
        selectedDate
    }
}

export default useDate