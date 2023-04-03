import Section from "components/Section/Section";
import Form from "components/Form/Form";

import stylesGrid from "scss/grid.module.scss";

export const postSectionID = 'postSection';

export default function PostSection() {
    return (
        <Section id={postSectionID} className={stylesGrid.container}>
            <Form />
        </Section>
    )
}