import { useContext, useRef } from 'react';
import { motion } from "framer-motion";
import { usersContext, usersActionsContext } from "context/UsersContext";
import Loader from 'components/Loader/Loader';
import { MotionCard } from "components/Card/Card";
import Button from "components/Button/Button";

import styles from './Users.module.scss';
import stylesGrid from "scss/grid.module.scss";
import motionOnView from 'ui/motion';

const { dFlex, justifyCenter } = stylesGrid;
const is2x = window.matchMedia("(min-width: 768px)");
const is3x = window.matchMedia("(min-width: 1120px)");

export default function Cards({ onClickScrollTo }) {
    const { usersData, fetchingUsersData } = useContext(usersContext);
    const handleUsers = useContext(usersActionsContext);

    const usersPage = useRef(1);

    const fetching = fetchingUsersData;
    const users = usersData?.users;
    const isUsers = users?.length;

    const isLastPage = usersData ? usersData.page === usersData.total_pages : false;

    function handleMore() {
        usersPage.current++;
        const nextPage = usersPage.current;

        handleUsers({
            page: nextPage >= usersData.total_pages ? usersData.total_pages : nextPage
        });
    }

    return (
        <>
            <div className={styles.cards}>
                {(fetching || !users) && <Loader fullSize={fetching && isUsers} />}

                {isUsers && users.map(function ({ id, position, name, phone, photo, email }, index) {
                    let delay = 0;

                    if (is2x.matches) {
                        delay = usersPage.current === 1 ? index % 2 : index;
                    }

                    if (is3x.matches) {
                        delay = usersPage.current === 1 ? index % 3 : index;
                    }

                    return (
                        <MotionCard key={id}
                            name={name}
                            position={position}
                            phone={phone}
                            photo={photo}
                            email={email}
                            {...motionOnView}
                            transition={{
                                delay: delay * 0.1,
                                transition: 0.75
                            }} />
                    )
                })}
            </div>

            {users && !isLastPage &&
                <motion.div
                    className={`${dFlex} ${justifyCenter}`}
                    transition={{
                        transition: 0.75,
                        delay: 0.1
                    }}
                    {...motionOnView}>
                    <Button disabled={fetchingUsersData}
                        onClick={handleMore}
                        scrollTo={onClickScrollTo}>
                        Show more
                    </Button>
                </motion.div>}
        </>


    )
}