export const TrucateText = ({text}) => {
    const truncateText = text.length > 10 ? text.slice(0, 25) + '...' : text;

    return truncateText
}
