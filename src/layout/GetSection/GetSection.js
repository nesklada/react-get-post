import Section from "components/Section/Section";
import SectionHeader from "components/Section/SectionHeader";
import { MotionHeading } from "components/Heading/Heading";
import Users from "components/Users/Users";
import motionOnView from "ui/motion";

import stylesGrid from "scss/grid.module.scss";

export const getSectionId = 'getSection';

export default function GetSection() {
    return (
        <Section id={getSectionId} className={stylesGrid.container}> 
            <SectionHeader>
                <MotionHeading 
                    type={1}
                    {...motionOnView}
                    >
                    Working with GET request
                </MotionHeading>
            </SectionHeader>

            <Users onClickScrollTo={getSectionId}/>
        </Section>
    )
}