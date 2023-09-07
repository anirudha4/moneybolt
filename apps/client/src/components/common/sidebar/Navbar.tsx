import { PATHS } from "@config/constants/paths";
import { Transition } from "@headlessui/react";
import { useUI } from "@hooks";
import { mergeClasses } from "@utils";
import classNames from "classnames";
import React from "react";
import { LuSettings2, LuZap } from "react-icons/lu";
import { TbLayoutDashboard, TbUser } from "react-icons/tb";
import { NavLink } from "react-router-dom";
import { IntegrationIcon, InvoiceIcon, TransactionIcon } from "../icons";

type Props = {}
const Navbar = ({ }: Props) => {
    const { isSidebarOpen } = useUI();
    return (
        <Transition
            show={isSidebarOpen}
            enter="transform transition duration-[1000ms]"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity"
            leaveFrom="opacity-50"
            leaveTo="opacity-0"
        >
            <div className="flex flex-col p-4 gap-5 mt-5">
                <div className="flex flex-col gap-3">
                    <Title>
                        General
                    </Title>
                    <div className="flex flex-col gap-1">
                        <Link label="Dashboard" to={PATHS.DASHBOARD} icon={<TbLayoutDashboard size={18} />} />
                        <Link label="Transactions" to={PATHS.TRANSACTIONS} icon={<TransactionIcon size={18} />} />
                        <Link extraLabel="Pro" label="Invoices" to={PATHS.INVOICES} icon={<InvoiceIcon size={18} />} />
                    </div>
                </div>
                <div className="h-[1px] border-t"></div>
                <div className="flex flex-col gap-4">
                    <Title>
                        Tools
                    </Title>
                    <div className="flex flex-col gap-1">
                        <Link extraLabel={'Pro'} label="Integrations" to={PATHS.INTEGRATIONS} icon={<IntegrationIcon size={18} />} />
                        <Link extraLabel={'Pro'} label="Configurations" to={PATHS.CONFIGURE} icon={<LuSettings2 size={18} />} />
                    </div>
                </div>
                <div className="h-[1px] border-t"></div>
                <div className="flex flex-col gap-4">
                    <Title>
                        Account
                    </Title>
                    <div className="flex flex-col gap-1">
                        <Link label="Profile" to={PATHS.ACCOUNT} icon={<TbUser size={18} />} />
                        <Link label="Preferences" to={PATHS.WORKSPACE} icon={<LuZap size={18} />} />
                    </div>
                </div>
            </div>
        </Transition>
    )
}
export default Navbar;

const Title = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <div className="uppercase tracking-wider text-muted-foreground text-xs">
                {children}
            </div>
        </>
    )
}

const Link = ({ label, to, icon, extraLabel }: { label: string, to: string, icon: React.ReactNode, extraLabel?: string }) => {
    return (
        <NavLink to={to} className={({ isActive }) => mergeClasses(classNames(
            'w-full h-10',
            'rounded flex items-center gap-2',
            'hover:text-primary',
            'transition-colors duration-200',
            {
                'text-primary': isActive,
            }
        ))}>
            {icon}
            {label}
            {Boolean(extraLabel) && (
                <div className={classNames(
                    "px-3 h-5 text-[10px] rounded bg-secondary text-primary uppercase",
                    "flex items-center justify-center ml-auto",
                    "hover:text-primary-dark duration-200",
                )}>
                    {extraLabel}
                </div>
            )}
        </NavLink>
    )
}