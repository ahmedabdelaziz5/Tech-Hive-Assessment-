import { useState } from 'react';
import ImageUploading from 'react-images-uploading';
import { useDispatch, useSelector } from 'react-redux'
import { ListItemIcon } from '@mui/material';

import { PopUpMenu } from '../../../../components/common'
import { ReactComponent as AddPicIcon } from '../../../../assets/icons/addPic.svg'
import { ReactComponent as BinIcon } from '../../../../assets/icons/bin.svg'
import classes from '../Profile.module.css'
import plusIcon from '../../../../assets/icons/plusPic.svg'
import { uiActions } from '../../../../store/ui-slice';

const ChangeProfilePic = ({ handleChangeProfilePic, isLoadingChangeProfilePic }) =>
{
    const profileUploadId = "profileUploadId";

    const profileImage = useSelector(state => state.auth?.userData?.profileImage);
    const dispatch = useDispatch();

    const closeMenu = () =>
    {
        dispatch(uiActions.closePopMenu(profileUploadId));
    };

    const [images, setImages] = useState([]);



    //  pass selected image to handleChangeProfilePic
    const onChangeImage = (imageList) =>
    {
        const selectedFile = imageList[0];
        setImages([selectedFile]);
        const formData = new FormData();
        formData.append("userImage", selectedFile.file);
        formData.append("type", "upload");
        handleChangeProfilePic(formData, selectedFile.data_url);
    };

    // handleChangeProfilePic with remove pic key
    const removePhoto = () =>
    {
        const formData = new FormData();
        formData.append("type", "remove");
        handleChangeProfilePic(formData, "default.png");
        setImages([])
    }

    return (
        <>
            {isLoadingChangeProfilePic ? (null) :
                (
                    <ImageUploading
                        value={images}
                        onChange={onChangeImage}
                        dataURLKey="data_url"
                    >
                        {({
                            onImageUpload,
                            onImageUpdate,
                            dragProps,
                        }) =>
                        {
                            return (
                                <PopUpMenu
                                    id={profileUploadId}
                                    openBtnType={"icon"}
                                    openBtnChild={<img src={plusIcon} alt="add" />}
                                    openBtnClassName={classes.plusIcon}
                                    containerClassName={classes.editPicPop}
                                    menuItems={
                                        [{
                                            onClick: () =>
                                            {
                                                profileImage && profileImage !== "default.png" ? onImageUpdate(0) : onImageUpload()
                                                closeMenu();
                                            },
                                            children:
                                                <div
                                                    className='center-y'
                                                    {...dragProps}
                                                >
                                                    <ListItemIcon className={classes.icon}>
                                                        <AddPicIcon className={classes.listIcon} />
                                                    </ListItemIcon>
                                                    {profileImage && profileImage !== "default.png" ? "Change Photo" : "Upload Photo"}
                                                </div>,
                                        },
                                        {
                                            onClick: () => { removePhoto(); closeMenu(); },
                                            children:
                                                profileImage && profileImage !== "default.png" ? (
                                                    <div
                                                        className='center-y'
                                                    >
                                                        <ListItemIcon className={classes.icon}>
                                                            <BinIcon className={classes.listIcon} />
                                                        </ListItemIcon>
                                                        Remove Photo
                                                    </div>
                                                ) : (null)
                                            ,
                                        }]
                                    }
                                />
                            )
                        }
                        }
                    </ImageUploading >
                )}
        </>
    )
}

export default ChangeProfilePic