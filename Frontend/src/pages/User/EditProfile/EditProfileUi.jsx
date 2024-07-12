import { Btn, LoopOnInputs } from '../../../components/inputs'
import {  editProfileInputs } from './editProfileInputsData'
import { editProfileValidationSchema } from './editProfileValidationSchema'
import classes from './styles/EditProfileUi.module.css'
import { SideBar } from '../../../components/common/SideBar'
import Card from './Card'

import { Formik, Form } from 'formik'

const EditProfileUi = (props) =>
{
    const {
        initialUserData,
        isLoadingEditProfile,
        handleEditProfile,
    } = props;

    return (
        <div
            className={classes.container}
        >
            <SideBar />
            <div
                className={classes.data}
            >
                <Formik
                    initialValues={initialUserData}
                    validationSchema={editProfileValidationSchema}
                    onSubmit={handleEditProfile}
                    enableReinitialize={true}
                >
                    {(formik) =>
                    {
                        return (
                            <Form>
                                <Card
                                    title="Personal Information"
                                >
                                    <LoopOnInputs
                                        inputs={editProfileInputs}
                                        formik={formik}
                                        disabled={isLoadingEditProfile}
                                    />

                                    <div
                                        className={classes.action}
                                    >
                                        <Btn
                                            type="submit"
                                            isLoading={isLoadingEditProfile}
                                        >
                                            Save
                                        </Btn>
                                    </div>
                                </Card>
                            </Form>)
                    }}
                </Formik>
            </div>
        </div >
    )
}

export default EditProfileUi