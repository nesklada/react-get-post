import usePortal from 'react-useportal';
import { Tooltip as TooltipNPM } from 'react-tooltip'

import 'react-tooltip/dist/react-tooltip.css';

export const tooltipID = 'tooltip';
export const tooltipClickableID = 'tooltipClickable';

const style = {
    maxWidth: 'calc(100% - 20px)', 
    wordBreak: 'break-word'
}

export default function Tooltip() {
    const { Portal } = usePortal();

    return (
        <Portal>
            <TooltipNPM id={tooltipID} style={style}></TooltipNPM>
            <TooltipNPM id={tooltipClickableID} clickable style={style}></TooltipNPM>
        </Portal>
    )
}