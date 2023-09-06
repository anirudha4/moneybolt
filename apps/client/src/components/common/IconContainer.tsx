import classNames from "classnames"
import React, { ReactElement } from "react"

type Props = {
    onClick?: () => void,
    icon: ReactElement
}
const IconContainer = ({ onClick = () => { }, icon }: Props) => {
    return (
        <div>
            <div
                className={classNames(
                    "h-[35px] w-[35px] min-w-[35px] flex items-center justify-center rounded hover:bg-secondary transition-all duration-200", 
                    "bg-background",
                    "cursor-pointer border border-transparent hover:border-border group",
                )}
                onClick={onClick}
            >
                {React.cloneElement(icon, {
                    className: "text-muted-foreground group-hover:text-accent-foreground transition-all duration-200"
                })}
            </div>
        </div>
    )
}
export default IconContainer