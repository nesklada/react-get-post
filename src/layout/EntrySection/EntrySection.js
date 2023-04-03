import Button from "components/Button/Button";
import Entry from "components/Entry/Entry";
import Heading from "components/Heading/Heading";
import { postSectionID } from "layout/PostSection/PostSection";

import styles from "./EntrySection.module.scss";
import stylesGrid from "scss/grid.module.scss";

export default function EntrySection() {
    return (
        <Entry>
          <div className={stylesGrid.container}>
            <div className={styles.holder}>
              <Heading type={1}>
                Test assignment for front-end developer
              </Heading>
              <p>
                What defines a good front-end developer is one that has skilled knowledge of HTML, CSS, JS with a vast understanding of User design thinking as they'll be building web interfaces with accessibility in mind. They should also be excited to learn, as the world of Front-End Development keeps evolving.
              </p>

              <Button scrollTo={postSectionID}>Sign up</Button>
            </div>
          </div>
        </Entry>
    )
}