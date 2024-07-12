import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../store/ui-slice";


const useModal = (id) =>
{
    // useModal hook to handle open/close modal
    const isModalOpened = useSelector(state => state.ui.isModalOpened)[id];
    const dispatch = useDispatch();

    // open options menu
    const openModal = () =>
    {
        dispatch(uiActions.openModal(id));
    }

    // close options menu
    const closeModal = () =>
    {
        dispatch(uiActions.closeModal(id));
    }

    return {
        openModal,
        closeModal,
        isModalOpened,
    }
}

export default useModal;