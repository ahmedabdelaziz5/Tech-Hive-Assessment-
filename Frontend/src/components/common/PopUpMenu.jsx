import { ButtonBase, ClickAwayListener, Grow, IconButton, ListItem, MenuItem, MenuList, Popper } from '@mui/material';
import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { uiActions } from '../../store/ui-slice';
import classes from './styles/PopUpMenu.module.css'
export const PopUpMenu = (props) =>
{
    const {
        openBtnType,
        openBtnChild,
        openBtnClassName,
        menuItems,
        id,
        containerClassName,
        fullWidth,
        children,
        placement,
        popperClassName
    } = props;

    // handle open menu btn
    const btnsTypes = {
        "icon": IconButton,
        "base": ButtonBase,
    }
    const OpenBtn = btnsTypes[openBtnType];

    //handle menu open or not
    const isPopMenuOpened = useSelector(state => state.ui.isPopMenuOpened)[id] || false;
    const dispatch = useDispatch();
    const anchorRef = React.useRef(null);

    const handleOpenPopMenu = () =>
    {
        dispatch(uiActions.openPopMenu(id))
    }

    const handleClose = (event) =>
    {
        if (anchorRef?.current && anchorRef?.current?.contains(event?.target))
        {
            return;
        }

        handleClosePopMenu();
    };

    const handleClosePopMenu = (event) =>
    {
        dispatch(uiActions.closePopMenu(id))
    };

    const handleToggle = () =>
    {
        if (isPopMenuOpened) handleClosePopMenu()
        else handleOpenPopMenu()
    };

    // return focus to the button when we transitioned from !open -> open
    const prevOpen = useRef(isPopMenuOpened);
    useEffect(() =>
    {
        if (prevOpen.current === true && isPopMenuOpened === false)
        {
            anchorRef?.current?.focus();
        }

        prevOpen.current = isPopMenuOpened;
    }, [isPopMenuOpened]);

    return (
        <>
            <OpenBtn
                id="openMenuBtn"
                aria-controls={isPopMenuOpened ? 'menu' : undefined}
                aria-haspopup="true"
                aria-expanded={isPopMenuOpened ? 'true' : undefined}
                onClick={handleToggle}
                className={openBtnClassName}
                ref={anchorRef}
            >
                {openBtnChild}
            </OpenBtn>
            <Popper
                open={isPopMenuOpened}
                anchorEl={anchorRef.current}
                role={undefined}
                placement={placement ? placement : "bottom-start"}
                transition
                disablePortal
                sx={{
                    maxWidth: children ? "fit-content" : "100%",
                }}
                className={popperClassName}
            >
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{
                            transformOrigin:
                                placement === 'bottom-start' ? 'left bottom' : 'left top',
                        }}
                    >
                        <div
                            className={`${classes.menu} ${containerClassName || ""}`}
                            style={{
                                boxShadow: fullWidth ? "none" : "0px 1px 4px 0px #00000040",
                            }}
                        >
                            <ClickAwayListener
                                onClickAway={handleClose}
                            >
                                <div>
                                    {menuItems && (
                                        <MenuList
                                            id="menu"
                                        >
                                            {menuItems.map((item, index) => (
                                                item.component ? (<div key={index}>{item.component}</div>) :
                                                    (item.children && (
                                                        <MenuItem
                                                            component={!!item.menuItemComponent ? item.menuItemComponent : ListItem}
                                                            key={index}
                                                            onClick={item.onClick}
                                                            to={item.to}
                                                            disableTouchRipple={item.noHover}
                                                            disableGutters={item.noHover}
                                                            className={`${classes.item}${item.noHover ? classes.noHover : ""} ${item.haveStroke ? classes.hoverStroke : ""} ${item.className ? item.className : ""}`}
                                                            target={item.target}
                                                            disabled={!!item?.disabled}
                                                        >
                                                            {item.children}
                                                        </MenuItem>
                                                    ))
                                            ))}
                                        </MenuList>
                                    )}
                                    {children && (children)}
                                </div>
                            </ClickAwayListener>
                        </div>
                    </Grow>)}
            </Popper>
        </>
    )
}
