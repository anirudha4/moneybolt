import { IconContainer } from "@components/common";
import React, { ReactElement, createContext } from "react"
import { TbCube, TbX } from "react-icons/tb";

type DrawerContextType = {
    open: boolean | undefined;
    onClose: () => void;
}

const DrawerContext = createContext<DrawerContextType>({
    open: false,
    onClose: () => { }
})

type Props = {
    open?: boolean;
    title: string,
    children: ReactElement;
    actionBar?: ReactElement;
    onClose?: () => void;
    icon?: ReactElement;
}
const Drawer = ({
    children,
    actionBar = <></>,
    title,
    open,
    onClose = () => { },
    icon = <TbCube />
}: Props) => {
    const handleClose = () => {
        onClose();
    }
    return (
        <DrawerContext.Provider value={{
            open,
            onClose
        }}>
            <div className="drawer">
                <div className="absolute flex items-center gap-2">
                    {React.cloneElement(actionBar)}
                </div>
                <div className="flex items-center justify-between h-16 border-b px-4">
                    <div className="flex items-center gap-2">
                        {icon}
                        <div className="text-md font-medium">
                            {title}
                        </div>
                    </div>
                    <IconContainer onClick={handleClose} icon={<TbX />} />
                </div>
                {children}
            </div>
        </DrawerContext.Provider>
    )
}
export default Drawer;