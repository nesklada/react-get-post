
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';

const CustomTooltip = styled(({ className, ...props }) => (
    <Tooltip disableFocusListener {...props} classes={{ popper: className, }} />
))({
    [`& .${tooltipClasses.tooltip}`]: {
        background: 'rgba(0,0,0, 0.87)',
        color: '#fff',
        fontSize: '16px',
        lineHeight: '1.62',
        padding: '3px 16px',
    },
});

export default CustomTooltip;