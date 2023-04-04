import Section from "components/Section/Section";
import SectionHeader from "components/Section/SectionHeader";
import Heading from "components/Heading/Heading";
import Users from "components/Users/Users";

import stylesGrid from "scss/grid.module.scss";

export const getSectionId = 'getSection'; 

export default function GetSection() {
    return (
        <Section id={getSectionId} className={stylesGrid.container}> 
            <SectionHeader>
                <Heading type={1}>
                    Working with GET request
                </Heading>
            </SectionHeader>

            <Users onClickScrollTo={getSectionId}/>
        </Section>
    )
}