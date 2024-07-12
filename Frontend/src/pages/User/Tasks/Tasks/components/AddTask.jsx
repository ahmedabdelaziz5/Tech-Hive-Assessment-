import { useNavigate } from 'react-router-dom'
import { ItemCard } from '../../../../../components/common'
import { LoopOnInputs } from '../../../../../components/inputs'
import { taskInitialValues, taskInputs } from '../taskData/taskInputs'
import { taskValidationSchema } from '../taskData/taskValidationSchema'
import useAddTask from '../hooks/use-add-task'

const AddTask = () =>
{
    const navigate = useNavigate();
    const goBack = () => { navigate(-1 || "/tasks") }

    const {
        handleAddTask,
        isLoadingAddTask
    } = useAddTask();

    return (
        <ItemCard
            type="add"
            title="Add Task"
            initialValues={taskInitialValues}
            validationSchema={taskValidationSchema}
            onSubmit={handleAddTask}
            onClose={goBack}
            isLoading={isLoadingAddTask}
        >
            <LoopOnInputs
                inputs={taskInputs}
                disabled={isLoadingAddTask}
            />
        </ItemCard>
    )
}

export default AddTask