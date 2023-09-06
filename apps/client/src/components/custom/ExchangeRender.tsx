import React, { ReactElement, useState } from "react";

type Props = {
    trigger: ReactElement,
    children: ReactElement
}
const ExchangeRender = ({ children, trigger }: Props) => {
    const [isOpen, setIsOpen] = useState(false);
    const hideRender = () => setIsOpen(false)
    const showRender = () => setIsOpen(true);
    if (isOpen) {
        return React.cloneElement(children, {
            onClose: hideRender
        })
    }
    return React.cloneElement(trigger, {
        onClick: showRender
    })
}
export default ExchangeRender