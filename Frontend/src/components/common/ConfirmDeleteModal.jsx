import React from 'react'
import { ModalCard } from '../ui';
import { Btn } from '../inputs';

export const ConfirmDeleteModal = (props) =>
{
    const {
        open,
        onClose,
        deleteMessage,
        onDelete,
        isLoading,
    } = props;

    return (
        <ModalCard
            open={open}
            onClose={onClose}
        >
            <p>Delete {deleteMessage}?</p>
            <Btn
                onClick={onDelete}
                isLoading={isLoading}
            >
                Delete
            </Btn>
            <Btn
                onClick={onClose}
                disabled={isLoading}
                className='cancel-btn'
            >
                Cancel
            </Btn>
        </ModalCard>
    )
}
