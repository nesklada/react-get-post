import { forwardRef } from "react";
import { motion } from "framer-motion";

const Heading = forwardRef(({children, type = 1}, ref) => {
    const Headtype = `h${(type && +type > 6) ? 1 : type}`;

    return <Headtype ref={ref}>{children}</Headtype>
});

export const MotionHeading = motion(Heading);

export default Heading;