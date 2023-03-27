
import { useEffect, useState } from "react";
import { getUsers } from "api/config";
import Heading from "components/Heading/Heading";
import Section from "components/Section/Section";
import SectionHeader from "components/Section/SectionHeader";
import Card from "components/Card/Card";
import Button from "components/Button/Button";
import Loader from 'components/Loader/Loader';

import stylesGrid from "scss/grid.module.scss";
import styles from './GetSection.module.scss';

const {container, dFlex, justifyCenter} = stylesGrid;

export default function GetSection() {
    const [data, setData] = useState(null);
    const [isFetching, setIsFetching] = useState(false);

    const isLastPage = data && (data.total_pages === data.page);

    function handleMore() {
        setIsFetching(true);

        if(isLastPage) {
            return;
        }

        getUsers({
            page: data.page + 1
        }).then(data => {
            setData(data);
            setIsFetching(false);
        });
    }

    useEffect(() => {
        let ignore = false;

        getUsers().then(data => {
            if(!ignore) {
                setData(data);
            }
        });

        return () => ignore = true
    }, []);

    return (
        <Section className={container}> 
            <SectionHeader>
                <Heading type={1}>
                    Working with GET request
                </Heading>
            </SectionHeader>

            <div className={styles.cards}>
                {data === null ? 
                    <Loader /> : 
                    data.users.map(function({id, position, name, phone, photo, email}) {
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

            {!isLastPage && (<div className={`${dFlex} ${justifyCenter}`}>
                    <Button disabled={isFetching}
                            onClick={handleMore}>
                        Show more
                    </Button>
                </div>)}
        </Section>
    )
}