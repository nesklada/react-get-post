import { useContext, useRef } from 'react';
import { usersContext, usersActionsContext } from "context/UsersContext";
import Loader from 'components/Loader/Loader';
import Card from "components/Card/Card";
import Button from "components/Button/Button";

import styles from './Users.module.scss';
import stylesGrid from "scss/grid.module.scss";

const { dFlex, justifyCenter } = stylesGrid;

export default function Cards({onClickScrollTo}) {
    const { usersData, fetchingUsersData } = useContext(usersContext);
    const handleUsers = useContext(usersActionsContext);

    const usersPage = useRef(1);

    const fetching = fetchingUsersData;
    const users = usersData?.users;
    const isUsers = users?.length;
    
    const isLastPage = usersData ? usersData.page === usersData.total_pages : false;

    function handleMore(){
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

                {isUsers && users.map(function ({ id, position, name, phone, photo, email }) {
                    return (<Card key={id}
                            name={name}
                            position={position}
                            phone={phone}
                            photo={photo}
                            email={email} />)
                    })}
            </div>

            {users && !isLastPage &&
                <div className={`${dFlex} ${justifyCenter}`}>
                    <Button disabled={fetchingUsersData}
                        onClick={handleMore}
                        scrollTo={onClickScrollTo}>
                        Show more
                    </Button>
                </div>}
        </>


    )
}