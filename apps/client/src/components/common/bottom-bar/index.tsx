import { PATHS } from "@config/constants/paths"
import { TbLayoutDashboard, TbUser } from "react-icons/tb"
import { useNavigate } from "react-router-dom"
import { IntegrationIcon, InvoiceIcon, TransactionIcon } from "../icons"
import React, { ReactElement, createContext, useContext, useMemo, useState } from "react"
import classNames from "classnames"

type Props = {}

type Context = {
    activeTab: number,
    onTabChange: (index: number) => void
}
const TabContext = createContext<Context>({
    activeTab: 0,
    onTabChange: () => { }
})

const getTransform = (tab: number) => {
    switch (tab) {
        case 0:
            return 0;
        case 1:
            return 100;
        case 2:
            return 200;
        case 3:
            return 300;
        case 4:
            return 400;

    }
}
const PATH_MAP = {
    [PATHS.DASHBOARD]: 0,
    [PATHS.TRANSACTIONS]: 1,
    [PATHS.INVOICES]: 2,
    [PATHS.INTEGRATIONS]: 3,
    [PATHS.ACCOUNT]: 4,
}

const BottomBar = ({ }: Props) => {
    const [activeTab, setActiveTab] = useState(PATH_MAP[window.location.pathname]);
    const handleActiveTabChange = (index: number) => {
        setActiveTab(index);
    }
    const indicatorStyle = useMemo(() => {
        const width = (100 / 5) + '%';
        const transform = `translateX(${getTransform(activeTab)}%) translateY(-50%)`;
        return {
            width,
            transform
        }
    }, [activeTab]);
    return (
        <TabContext.Provider value={{
            activeTab,
            onTabChange: handleActiveTabChange
        }}>
            <div className="bottom-bar">
                <div className="flex h-full justify-between relative">
                    <div className="active-indicator" style={indicatorStyle}></div>
                    <Tab value={0} path={PATHS.DASHBOARD} icon={<TbLayoutDashboard />} />
                    <Tab value={1} path={PATHS.TRANSACTIONS} icon={<TransactionIcon />} />
                    <Tab value={2} path={PATHS.INVOICES} icon={<InvoiceIcon />} />
                    <Tab value={3} path={PATHS.INTEGRATIONS} icon={<IntegrationIcon />} />
                    <Tab value={4} path={PATHS.ACCOUNT} icon={<TbUser />} />
                </div>
            </div>
        </TabContext.Provider>
    )
}
export default BottomBar

type TabProps = {
    path: string;
    icon: ReactElement;
    value: number
}
export const Tab = ({ path, icon, value }: TabProps) => {
    const { onTabChange, activeTab } = useContext(TabContext);
    const navigate = useNavigate();
    const handleClick = () => {
        onTabChange(value)
        navigate(path)
    }
    return (
        <div onClick={handleClick} className={classNames(
            "flex items-center justify-center flex-1 text-muted-foreground z-10",
            {
                'text-primary': activeTab === value
            }
        )}>
            {React.cloneElement(icon, {
                size: 28,
                className: 'transition-all duration-200',
                strokeWidth: activeTab === value ? 2 : 1.5
            })}
        </div>
    )
}