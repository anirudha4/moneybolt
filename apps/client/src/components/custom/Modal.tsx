import React, { Fragment, useState } from "react";
import classNames from "classnames";
import { Dialog, Transition } from "@headlessui/react"
import { FiX } from "react-icons/fi";

type Props = {
    children: React.ReactNode,
    trigger: React.ReactNode,
    isOpen?: boolean,
    title: string | React.ReactNode | undefined,
    action?: React.ReactNode,
    onClose?: () => void
}
const Modal = ({ trigger, children, title, isOpen: defaultOpen = false, action, onClose }: Props) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    const handleOpen = () => setIsOpen(true);
    const handleClose = () => {
        onClose && onClose();
        setIsOpen(false)
    };



    return (
        <>
            {trigger && React.cloneElement(trigger as React.ReactElement<any>, {
                onClick: handleOpen
            })}
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-40" onClose={handleClose}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-start mt-2 md:mt-0 md:items-center justify-center text-center relative z-100">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-sm lg:max-w-md transform rounded bg-background text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="font-medium text-secondary-foreground px-4 border-b flex items-center justify-between h-[60px] gap-2"
                                    >
                                        {title}
                                        <div
                                            className={classNames(
                                                "h-[35px] w-[35px] min-w-[35px] flex items-center justify-center rounded hover:bg-secondary transition-all duration-200", "cursor-pointer border border-transparent hover:border-border group"
                                            )}
                                            onClick={handleClose}
                                        >
                                            <FiX className="text-muted-foreground group-hover:text-accent-foreground transition-all duration-200" />
                                        </div>
                                    </Dialog.Title>
                                    {children}
                                    {action && <div className="h-[60px] px-4 border-t flex items-center justify-end">
                                        {React.cloneElement(action as React.ReactElement<any>, {
                                            onClick: handleClose
                                        })}
                                    </div>}
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}
export default Modal;