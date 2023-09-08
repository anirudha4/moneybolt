import React from "react";
import { TbPlugConnected, TbReceipt, TbArrowsExchange } from "react-icons/tb";

type Props = {
    size?: number,
    stroke?: string
} & React.SVGProps<SVGSVGElement>

export const TransactionIcon = ({ size = 18, ...props }: Props) => {
    return (
        <TbArrowsExchange size={size} {...props} />
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

