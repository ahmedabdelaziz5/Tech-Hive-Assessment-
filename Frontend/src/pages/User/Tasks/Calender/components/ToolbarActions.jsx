import { ButtonBase } from '@mui/material'
import React from 'react'
import { ReactComponent as LeftTriangleIcon } from '../../../../../assets/icons/leftTriangle.svg';
import { HeaderText } from '../../../../../components/ui';

const ToolbarActions = (props) =>
{
    const { onBack, backTitle, onNext, nextTitle, currentDate } = props;

    return (
        <div
            className='toolbar-actions-container center-y'
        >
            <ButtonBase
                className='toolbar-actions-btn'
                onClick={onBack}
                title={backTitle}
            >
                <LeftTriangleIcon />
            </ButtonBase>

            <HeaderText>
                {currentDate}
            </HeaderText>
            
            <ButtonBase
                className='right-triangle toolbar-actions-btn'
                onClick={onNext}
                title={nextTitle}
            >
                <LeftTriangleIcon />
            </ButtonBase>
        </div>
    )
}

export default ToolbarActions