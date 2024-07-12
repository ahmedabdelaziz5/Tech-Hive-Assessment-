import { useNavigate } from 'react-router-dom'
import { OutlinedBtn } from '../inputs'
import { ReactComponent as ArrowLeftIcon } from '../../assets/icons/arrowLeft.svg'

export const BackOutlinedBtn = ({ disabled }) =>
{
    const navigate = useNavigate();

    return (
        <OutlinedBtn
            size="small"
            startIcon={
                <ArrowLeftIcon
                    fill={disabled ?
                        "rgba(0, 0, 0, 0.26)" :
                        "var(--secondary)"}
                />
            }
            onClick={() => navigate(-1)}
            disabled={disabled}
        >
            Back
        </OutlinedBtn>
    )
}
