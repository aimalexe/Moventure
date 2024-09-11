import React from 'react'

const FlexBetween = ({ children, className, Element = "div" }) => {
    const style = {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    };

    return <Element style={style} className={className}>{children}</Element>;
};


export default FlexBetween
