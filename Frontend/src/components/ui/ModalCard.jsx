import { Modal } from '@mui/material'
import classes from './styles/ModalCard.module.css'

export const ModalCard = (props) =>
{
    const { open, onClose, children } = props;
    return (
        <Modal
            open={open}
            onClose={onClose}
            className={`center-x center-y ${classes.modal}`}
            sx={{
                ".MuiBackdrop-root": {
                    backgroundColor: "rgba(0, 0, 0, 0.1) !important"
                }
            }}
        >
            <div
                className={classes.container}
            >
                <div
                    className={classes.content}
                >
                    {children}
                </div>
            </div>
        </Modal>
    )
}
