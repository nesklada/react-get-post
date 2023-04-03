export default function Heading({children, type = 1} = {}) {
    const Headtype = `h${(type && +type > 6) ? 1 : type}`;

    return <Headtype>{children}</Headtype>
}