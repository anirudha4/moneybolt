import { PATHS } from "@config/constants/paths";
import useUI from "@hooks/useUI";
import { mergeClasses } from "@utils";
import classNames from "classnames";
import React from "react";
import { FiLink2 } from "react-icons/fi";
import { LuSettings2 } from "react-icons/lu";
import { RxCardStackMinus } from "react-icons/rx";
import { TbFileInvoice, TbLayoutDashboard } from "react-icons/tb";
import { NavLink } from "react-router-dom";

type Props = {}
const Navbar = ({ }: Props) => {
    return (
        <div className="flex flex-col p-4 gap-5 mt-5">
            <div className="flex flex-col gap-3">
                <Title>
                    General
                </Title>
                <div className="flex flex-col gap-1">
                    <Link label="Dashboard" to={PATHS.DASHBOARD} icon={<TbLayoutDashboard size={18} />} />
                    <Link label="Transactions" to={PATHS.TRANSACTIONS} icon={<RxCardStackMinus size={18} />} />
                    <Link label="Invoices" to={PATHS.INVOICES} icon={<TbFileInvoice size={18} />} />
                </div>
            </div>
            <div className="h-[1px] border-t"></div>
            <div className="flex flex-col gap-4">
                <Title>
                    Tools
                </Title>
                <div className="flex flex-col gap-1">
                    <Link label="Integrations" to={PATHS.INTEGRATIONS} icon={<FiLink2 size={18} />} />
                    <Link label="Configurations" to={PATHS.CONFIGURE} icon={<LuSettings2 size={18} />} />
                </div>
            </div>
        </div>
    )
}
export default Navbar;

const Title = ({ children }: { children: React.ReactNode }) => {
    const { isSidebarOpen } = useUI();
    return (
        <>
            {isSidebarOpen && <div className="uppercase tracking-wider text-muted-foreground">
                {children}
            </div>}
        </>
    )
}

const Link = ({ label, to, icon }: { label: string, to: string, icon: React.ReactNode }) => {
    return (
        <NavLink to={to} className={({ isActive }) => mergeClasses(classNames(
            'w-full h-10',
            'rounded flex items-center gap-2',
            'hover:text-primary',
            'transition-colors duration-200 ease-in-out',
            {
                'text-primary': isActive,
            }
        ))}>
            {icon}
            {label}
        </NavLink>
    )
}