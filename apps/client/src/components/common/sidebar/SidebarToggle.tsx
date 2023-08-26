import useUI from "@hooks/useUI";
import { mergeClasses } from "@utils";
import classNames from "classnames";
import { TbChevronLeft } from "react-icons/tb";

type Props = {}
const SidebarToggle = ({ }: Props) => {
    const { toggleSidebar, isSidebarOpen } = useUI();
    return (
        <div onClick={toggleSidebar} className={classNames(
            "absolute top-[80px] right-[-15px] w-[30px] h-[30px] rounded-lg",
            "flex justify-center items-center",
            "bg-background cursor-pointer hover:bg-secondary group duration-200 border",
        )}>
            <TbChevronLeft size={18} className={mergeClasses(classNames(
                "rotate-180 duration-200 text-secondary-foreground",
                {
                    "rotate-0": isSidebarOpen
                }
            ))} />
        </div>
    )
}
export default SidebarToggle