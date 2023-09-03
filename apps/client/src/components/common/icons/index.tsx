import { FiLink2 } from "react-icons/fi";
import { RxCardStackMinus } from "react-icons/rx";
import { TbFileInvoice } from "react-icons/tb"

type Props = {
    size?: number,
}

export const TransactionIcon = ({ size = 18 }: Props) => {
    return (
        <RxCardStackMinus size={size} />
    )
}

export const InvoiceIcon = ({ size = 18 }: Props) => {
    return (
        <TbFileInvoice size={size} />
    )
}

export const IntegrationIcon = ({ size = 18 }: Props) => {
    return (
        <FiLink2 size={size} />
    )
}

