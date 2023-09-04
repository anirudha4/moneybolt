import { Popover, Transition } from "@headlessui/react"
import classNames from "classnames"
import React from "react"

type Props = {
    children: React.ReactNode,
    trigger: React.ReactNode,
    positionClasses?: string,
    width?: string
}
const Popup = ({ children, trigger, positionClasses = 'right-0 top-2', width = 'w-[350px]' }: Props) => {
    return (
        <Popover>
            <Popover.Button as={React.Fragment}>
                {trigger}
            </Popover.Button>
            <Transition
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-100 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
            >
                <Popover.Panel className={classNames(
                    "absolute z-10 bg-background",
                    "rounded-md shadow-lg border",
                    width,
                    positionClasses
                )}>
                    {children}
                </Popover.Panel>
            </Transition>
        </Popover>
    )
}
export default Popup