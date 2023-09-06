import React from "react";
import { TbPlugConnected, TbReceipt } from "react-icons/tb";
import { RxCardStackMinus } from "react-icons/rx";

type Props = {
    size?: number,
    stroke?: string
} & React.SVGProps<SVGSVGElement>

export const TransactionIcon = ({ size = 18, ...props }: Props) => {
    return (
        <RxCardStackMinus size={size} {...props} />
    )
}

export const InvoiceIcon = ({ size = 18, ...props }: Props) => {
    return (
        <TbReceipt size={size}  {...props} />
    )
}

export const IntegrationIcon = ({ size = 18, ...props }: Props) => {
    return (
        <TbPlugConnected size={size} {...props} />
    )
}

