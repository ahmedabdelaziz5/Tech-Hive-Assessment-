import { useNavigate } from 'react-router-dom'
import { ItemCard } from '../../../../../components/common'
import { LoopOnInputs } from '../../../../../components/inputs'
import { taskInputs } from '../taskData/taskInputs'
import { taskValidationSchema } from '../taskData/taskValidationSchema'
import { useSelector } from 'react-redux'
import useEditTask from '../hooks/use-edit-task'

const EditTask = () =>
{
    const navigate = useNavigate();
    const goBack = () => { navigate(-1 || "/tasks") }
    const taskInitialValues = useSelector(state => state.tasks.openedTask);
    const {
        handleEditTask,
        isLoadingEditTask
    } = useEditTask({ isNavigate: true });

    return (
        <ItemCard
            type="edit"
            title="Edit Task"
            initialValues={taskInitialValues}
            validationSchema={taskValidationSchema}
            onSubmit={(values) => handleEditTask(values, taskInitialValues)}
            onClose={goBack}
            isLoading={isLoadingEditTask}
        >
            <LoopOnInputs
                inputs={taskInputs}
                disabled={isLoadingEditTask}
                isEdit={true}
            />
        </ItemCard>
    )
}

export default EditTask