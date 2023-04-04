
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';

const CustomTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className, }} />
))({
    [`& .${tooltipClasses.tooltip}`]: {
        padding: '3px 16px',
        fontFamily: 'Nunito',
        fontSize: '16px',
        lineHeight: '1.62',
        color: '#fff',
        background: 'rgba(0,0,0, 0.87)',
    },
});

export default CustomTooltip;