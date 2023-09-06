import React, { ReactElement } from "react"

type Props = {
    icon: ReactElement
    text: string,
    secondary?: string
}
const Empty = ({ icon, text, secondary }: Props) => {
    return (
        <div className="w-full h-full flex flex-col gap-2 items-center justify-center py-10">
            {React.cloneElement(icon, {
                size: 55,
                className: "hidden md:block"
            })}
            <div className="text-center">
                <div className="text-secondary-foreground text-md font-medium">
                    {text}
                </div>
                {secondary && (
                    <div className="text-muted-foreground font-light text-xs mt-1">
                        {secondary}
                    </div>
                )}
            </div>
        </div>
    )
}
export default Empty