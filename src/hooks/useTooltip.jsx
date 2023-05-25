const useHoverTooltip = (ref) => {
    const [hovered, setHovered] = React.useState(false);
    const [x, setX] = React.useState(0);
    const [y, setY] = React.useState(0);
    
    const handleMouseOver = (e) => {
        setHovered(true);
        setX(e.clientX);
        setY(e.clientY);
    };
    
    const handleMouseOut = () => {
        setHovered(false);
    };
    
    React.useEffect(() => {
        const node = ref.current;
        if (node) {
        node.addEventListener("mouseover", handleMouseOver);
        node.addEventListener("mouseout", handleMouseOut);
    
        return () => {
            node.removeEventListener("mouseover", handleMouseOver);
            node.removeEventListener("mouseout", handleMouseOut);
        };
        }
    }, [ref]);
    
    return { hovered, x, y };
}
