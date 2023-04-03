import usePortal from 'react-useportal';
import { Tooltip as TooltipNPM } from 'react-tooltip'

import 'react-tooltip/dist/react-tooltip.css';

export const tooltipID = 'tooltip';
export const tooltipClickableID = 'tooltipClickable';

export default function Tooltip() {
    const { Portal } = usePortal();

    return (
        <Portal>
            <TooltipNPM id={tooltipID}></TooltipNPM>
            <TooltipNPM id={tooltipClickableID} clickable></TooltipNPM>
        </Portal>
    )
}