import { motion } from "framer-motion";

export default function ErrorMessage({children}) {
    if(!children) return null;
    
    return <motion.div
        initial={{
            y: 40,
            opacity: 0.25
        }}
        animate={{
            y: 0,
            opacity: 1
        }}>
        {children}
    </motion.div>
}