import Button from "components/Button/Button";
import Entry from "components/Entry/Entry";
import { MotionHeading } from "components/Heading/Heading";
import { postSectionID } from "layout/PostSection/PostSection";
import { motion } from "framer-motion";
import motionOnView from "ui/motion";

import styles from "./EntrySection.module.scss";
import stylesGrid from "scss/grid.module.scss";

export default function EntrySection() {
    return (
        <Entry>
            <div className={stylesGrid.container}>
                <div className={styles.holder}>
                    <MotionHeading
                        type={1}
                        {...motionOnView}
                        transition={{
                            transition: 0.5
                        }}>
                        Test assignment for front-end developer
                    </MotionHeading>
                    <motion.p
                        {...motionOnView}
                        transition={{
                            delay: 0.3,
                            transition: 0.5
                        }}>
                        What defines a good front-end developer is one that has skilled knowledge of HTML, CSS, JS with a vast understanding of User design thinking as they'll be building web interfaces with accessibility in mind. They should also be excited to learn, as the world of Front-End Development keeps evolving.
                    </motion.p>

                    <motion.div
                        {...motionOnView}
                        transition={{
                            delay: 0.6,
                            transition: 0.5
                        }}>
                        <Button scrollTo={postSectionID}>Sign up</Button>
                    </motion.div>
                </div>
            </div>
        </Entry>
    )
}