import { useContext, useRef } from "react";
import { usersContext, usersHandleContext } from "context/UserContext";
import Heading from "components/Heading/Heading";
import Section from "components/Section/Section";
import SectionHeader from "components/Section/SectionHeader";
import Card from "components/Card/Card";
import Button from "components/Button/Button";
import Loader from 'components/Loader/Loader';

import stylesGrid from "scss/grid.module.scss";
import styles from './GetSection.module.scss';

const {container, dFlex, justifyCenter} = stylesGrid;

export const getSectionId = 'getSection'; 

export default function GetSection() {
    const {dataUsers , fetchingDataUsers} = useContext(usersContext);
    const page = useRef(1);
    const handleUsers = useContext(usersHandleContext);

    const isLastPage = dataUsers ? dataUsers.page === dataUsers.total_pages : false;

    function handleMore(){
        page.current++;
        const nextPage = page.current;

        handleUsers({
            page: nextPage >= dataUsers.total_pages ? dataUsers.total_pages : nextPage
        });
    }

    return (
        <Section id={getSectionId} className={container}> 
            <SectionHeader>
                <Heading type={1}>
                    Working with GET request
                </Heading>
            </SectionHeader>

            {(!dataUsers || fetchingDataUsers) && <Loader fullSize={dataUsers === null || !!dataUsers} />}

            <div className={styles.cards}>
                {dataUsers && dataUsers.users && 
                    dataUsers.users.map(function({id, position, name, phone, photo, email}) {
                        return (
                            <Card key={id}
                                name={name}
                                position={position}
                                phone={phone}
                                photo={photo}
                                email={email}/>
                        )
                    })
                }
            </div>

            {!isLastPage && 
            <div className={`${dFlex} ${justifyCenter}`}>
                <Button disabled={fetchingDataUsers}
                        onClick={handleMore}
                        scrollTo={getSectionId}>
                    Show more
                </Button>
            </div>}
        </Section>
    )
}