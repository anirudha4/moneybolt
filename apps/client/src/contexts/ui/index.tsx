import { UIContextType } from "@lib/types/contexts";
import { createContext, useState } from "react"


export const UIContext = createContext<UIContextType | null>(null);

type Props = {
    children: React.ReactNode
}
const UIProvider = ({ children }: Props) => {
    // sidebar
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)
    const closeSidebar = () => setIsSidebarOpen(false)
    const openSidebar = () => setIsSidebarOpen(true)

    // 

    // context values
    const values: UIContextType = {
        isSidebarOpen,
        toggleSidebar,
        closeSidebar,
        openSidebar
    }
    return (
        <UIContext.Provider value={values}>
            {children}
        </UIContext.Provider>
    )
}
export default UIProvider