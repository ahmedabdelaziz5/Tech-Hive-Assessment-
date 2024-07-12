import { HeaderText, ModalCard } from '../ui'
import { Btn, FormikContainer } from '../inputs'
import classes from './styles/ItemCard.module.css'
export const ItemCard = (props) =>
{
    const {
        children,
        type,
        initialValues,
        validationSchema,
        title,
        onSubmit,
        onClose,
        isLoading,
        addBtnTitle,
        AdditionalAction
    } = props;

    return (
        <ModalCard
            open={true}
            onClose={onClose}
        >
            <div
                className={`${classes.content} ${type === "edit" ? classes.edit : ""}`}
            >
                {title &&
                    <HeaderText
                        size='medium'
                    >
                        {title}
                    </HeaderText>
                }

                <FormikContainer
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                    enableReinitialize={true}
                >
                    {children}

                    {/* actions btns */}
                    {type !== "details" && (
                        <div
                            className={classes.actions}
                        >
                            {AdditionalAction}

                            <Btn
                                onClick={onClose}
                                className={`cancel-btn ${classes.marginRight}`}
                            >
                                Cancel
                            </Btn>

                            <Btn
                                isLoading={isLoading}
                                type="submit"
                            >
                                {addBtnTitle ? addBtnTitle
                                    : type === "add" ? "Add" : "Save"}
                            </Btn>
                        </div>
                    )}
                </FormikContainer>
            </div>
        </ModalCard>
    )
}
