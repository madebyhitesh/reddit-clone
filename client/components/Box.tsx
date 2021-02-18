import React from 'react'

interface Props {
    size?: "large" | "medium",
    className?: string
}

const Box: React.FC<Props> = ({ children, size = "large", className }) => {

    const styles = {
        width: size === "large" ? "600px" : "400px",
    }
    return (
        <div style={styles} className={className}>
            {children}
        </div>
    )
}

export default Box
