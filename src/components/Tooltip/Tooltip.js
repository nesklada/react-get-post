import usePortal from 'react-useportal';
import { Tooltip as ReactTooltip } from 'react-tooltip'

import 'react-tooltip/dist/react-tooltip.css';

export const tooltipID = 'tooltip';
export const tooltipClickableID = 'tooltipClickable';

const style = {
    width: '300px',
    maxWidth: 'calc(100% - 20px)', 
    wordBreak: 'break-word'
}

export default function Tooltip() {
    const { Portal } = usePortal();

    return (
        <Portal>
            {/* <ReactTooltip id={tooltipID} style={style}></ReactTooltip> */}
            <ReactTooltip id={tooltipClickableID} clickable style={style}></ReactTooltip>
        </Portal>
    )
}