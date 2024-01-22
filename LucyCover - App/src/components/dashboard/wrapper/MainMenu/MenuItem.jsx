

const MenuItem = ({title,children}) => {
    return (
            <span>
                {children}
                <h6>{title}</h6>
            </span>
    )
}

export default MenuItem