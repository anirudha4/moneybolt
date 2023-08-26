import React from "react";
import classNames from "classnames";
import { Popover, Transition } from "@headlessui/react";
import { TbLogout, TbSelector, TbSettings } from 'react-icons/tb';
import { BiUser } from "react-icons/bi";

import { Avatar } from "..";
import { UserType } from "@contexts/auth";
import SidebarToggle from "./SidebarToggle";
import { useAuth } from "@hooks"
import useUI from "@hooks/useUI";
import { mergeClasses } from "@utils";
import Navbar from "./Navbar";

type Props = {}
const Sidebar = ({ }: Props) => {
    const { user } = useAuth();
    const { isSidebarOpen } = useUI()

    // variables
    const organizationInitial = user?.organization?.name.charAt(0).toUpperCase() || "";
    const firstName = user?.name?.split(" ")[0] || "";

    return (
        <div
            className="border-r relative"
        >
            <SidebarToggle />
            {isSidebarOpen && (
                <>
                    <ProfileDropdown
                        user={user}
                        organizationInitial={organizationInitial}
                        firstName={firstName}
                    >
                        {isSidebarOpen ? (
                            <div
                                className={classNames(
                                    "w-full border-b h-16 flex justify-between items-center",
                                    "cursor-pointer outline-none px-4"
                                )}
                            >
                                <div className="flex items-center gap-3 truncate h-full flex-1">
                                    <Avatar character={organizationInitial} />
                                    <div className="flex flex-col gap-1 truncate">
                                        <div className="font-medium font-xs truncate text-secondary-foreground">{user?.organization?.name}</div>
                                    </div>
                                </div>
                                <TbSelector size={16} />
                            </div>
                        ) : (
                            <div
                                className={classNames(
                                    "w-full border-b h-16 flex justify-center items-center",
                                    "cursor-pointer outline-none"
                                )}
                            >
                                <Avatar character={organizationInitial} />
                            </div>
                        )}
                    </ProfileDropdown>
                    <Navbar />
                </>
            )}
        </div >
    )
}
export default Sidebar;

export const ProfileDropdown = ({ user, children, firstName, organizationInitial }: { children: React.ReactNode, user: UserType | null, firstName: string, organizationInitial: string }) => {
    const { logoutMutation } = useAuth();
    return (
        <Popover as="div" className="relative">
            <Popover.Button as={React.Fragment}>
                {children}
            </Popover.Button>
            <Transition
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
            >
                <Popover.Panel className={classNames(
                    "w-[320px] shadow-lg rounded-sm bg-background mt-2 ml-4 border absolute z-10"
                )}>
                    <div className="text-muted-foreground text-xs px-2 pt-2">Logged in as {user?.name}</div>
                    <div className="flex items-center gap-2 my-3 w-full truncate px-2">
                        <Avatar size="md" character={organizationInitial} />
                        <div className="flex flex-col w-full truncate">
                            <p className="text-accent-foreground truncate">{firstName}'s Workspace</p>
                            <span className="text-muted-foreground text-xs">Free Plan</span>
                        </div>
                    </div>
                    <div className="border-t flex flex-col gap-1 p-1.5">
                        <Option icon={<BiUser size={16} />} label="Profile" />
                        <Option icon={<TbSettings size={16} />} label="Account Settings" />
                        <div className="h-[1px] border-t"></div>
                        <Option icon={<TbLogout size={16} />} label="Logout" danger onClick={logoutMutation} />
                    </div>
                </Popover.Panel>
            </Transition>
        </Popover>
    )
}

type OptionProps = {
    label: string,
    onClick?: () => void,
    danger?: boolean,
    icon: React.ReactNode
}

const Option = ({ label, onClick = () => { }, danger = false, icon }: OptionProps) => {
    return (
        <div
            className={mergeClasses(classNames(
                "p-2 rounded flex items-center gap-2 duration-100 font-medium text-xs",
                "cursor-pointer hover:bg-secondary",
                {
                    "text-destructive hover:bg-destructive-foreground": danger
                }
            ))}
            onClick={onClick}
        >
            {icon}
            <span>
                {label}
            </span>
        </div>
    )
}