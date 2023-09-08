import React, { useMemo } from "react";
import { HiCubeTransparent, HiOutlineColorSwatch } from "react-icons/hi";

import { useAuth } from "@hooks"
import { Category } from "@lib/types/resource-types";
import { LuBookOpen, LuBox, LuCurrency, LuHeartPulse, LuPiggyBank, LuPlane, LuShieldCheck, LuShirt, LuShoppingBag, LuUtensils, LuZap } from "react-icons/lu";
import { BsGraphUpArrow, BsHouseDash } from 'react-icons/bs'
import { RiBusLine, RiFundsBoxLine, RiGiftLine } from 'react-icons/ri'
import { MdAccountBalance, MdOutlineMovieFilter } from 'react-icons/md'
import { BiBitcoin } from "react-icons/bi";
import { Tb3DCubeSphere } from "react-icons/tb";

type Props = {
    categoryId: string,
    size?: number,
    className?: string
}

const CategoryIcon = ({
    categoryId,
    size = 16,
    className
}: Props) => {
    const { user } = useAuth();

    const icon: React.ReactNode = useMemo(() => {

        const category = user?.categories?.find((category: Category) => category.id === categoryId)
        if (!category) return <HiCubeTransparent />

        switch (category.name) {
            case 'Groceries':
                return <LuShoppingBag />
            case 'Dining Out':
                return <LuUtensils />
            case 'Rent':
                return <BsHouseDash />
            case 'Utilities':
                return <HiOutlineColorSwatch />
            case 'Transportation':
                return <RiBusLine />
            case 'Healthcare':
                return <LuHeartPulse />
            case 'Insurance':
                return <LuShieldCheck />
            case 'Entertainment':
                return <MdOutlineMovieFilter />
            case 'Education':
                return <LuBookOpen />
            case 'Clothing':
                return <LuShirt />
            case 'Travel':
                return <LuPlane />
            case 'Savings':
                return <LuPiggyBank />
            case 'Investments':
                return <BsGraphUpArrow />
            case 'Gifts':
                return <RiGiftLine />
            case 'Salary':
                return <LuZap />
            case 'Freelancing':
                return <LuBox />
            case 'Third Party Income':
                return <LuCurrency />
            case 'Stocks':
                return <RiFundsBoxLine />
            case 'Savings Accounts':
                return <MdAccountBalance />
            case 'Cryptocurrency':
                return <BiBitcoin />
            case 'Other':
                return <Tb3DCubeSphere />
            default:
                return <LuUtensils />
        }
    }, [user?.categories]);

    return React.cloneElement(icon, {
        size,
        className
    })
}
export default CategoryIcon