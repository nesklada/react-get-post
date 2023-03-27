import Button from "components/Button/Button";
import Entry from "components/Entry/Entry";
import Heading from "components/Heading/Heading";

export default function EntrySection() {
    return (
        <Entry>
          <Heading type={1}>
            Test assignment for front-end developer
          </Heading>
          <p>
            What defines a good front-end developer is one that has skilled knowledge of HTML, CSS, JS with a vast understanding of User design thinking as they'll be building web interfaces with accessibility in mind. They should also be excited to learn, as the world of Front-End Development keeps evolving.
          </p>

          <Button>Sign up</Button>
        </Entry>
    )
}