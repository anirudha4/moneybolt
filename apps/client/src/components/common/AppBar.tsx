import React from "react";
import { BiBell } from "react-icons/bi";
import { FiSearch } from "react-icons/fi";


type Props = {}
const AppBar = ({ }: Props) => {
    return (
        <div className="border-b h-16 flex justify-between px-5 gap-3">
            <Search placeholder="Search Transaction" />
            <div className="flex h-full items-center gap-3">
                <IconContainer>
                    <BiBell />
                </IconContainer>
            </div>
        </div>
    )
}
export default AppBar;

type SearchProps = {
    placeholder?: string
}
const Search = ({ placeholder }: SearchProps) => {
    return (
        <div className="h-full flex items-center gap-3 flex-1">
            <FiSearch size={18} className='text-muted-foreground' />
            <input
                type="text"
                placeholder={placeholder}
                className="h-full flex-1 border-none outline-none bg-transparent"
            />
        </div>
    )
}

const IconContainer = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="
            h-[40px] w-[40px] min-h-[40px] min-w-[40px] flex items-center justify-center
            rounded-md cursor-pointer border
            hover:bg-secondary group duration-200   
        ">
            {React.cloneElement(children as React.ReactElement, {
                className: 'text-muted-foreground duration-200',
                size: 18
            })}
        </div>
    )
}