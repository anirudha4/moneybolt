import { TransactionIcon } from "@components/common/icons";
import CategoryIcon from "@components/common/icons/CategoryIcon";
import { Loader } from "@components/custom";
import Drawer from "@components/custom/Drawer";
import SelectionDropdown from "@components/custom/SelectionDropdown";
import { Option } from "@components/custom/form/Select";
import { Type } from "@components/transactions/Transaction";
import { useAuth, useTransactions, useWallet } from "@hooks";
import { Transaction } from "@lib/types/resource-types";
import { makeOptions, mergeClasses } from "@utils";
import { TRANSACTION_TYPES } from "@utils/constants";
import classNames from "classnames";
import { ReactElement, useEffect, useMemo, useRef, useState } from "react";
import { TbWallet } from "react-icons/tb";
import { useLocation, useNavigate } from "react-router-dom";

type Props = {
    id: string
}

const TransactionExpand = ({ id }: Props) => {
    const { wallets = [] } = useWallet({});
    const { user } = useAuth();
    const navigate = useNavigate();
    const prevPath = useLocation().pathname.split('view')[0];

    const { transaction, updateTransaction } = useTransactions({ id: id });
    // memoized options
    const categoryOptions = useMemo(() => makeOptions(user?.categories), [user?.categories])
    const walletOptions = useMemo(() => makeOptions(wallets), [wallets])
    const selectedCategory = useMemo(() => categoryOptions?.find(option => option.value === transaction?.categoryId), [transaction?.categoryId, categoryOptions]);
    const selectedWallet = useMemo(() => walletOptions?.find(option => option.value === transaction?.walletId), [transaction?.categoryId, walletOptions]);
    if (!transaction) {
        return null
    }
    const handleUpdate = (key: string, value: string) => {
        updateTransaction({
            ...transaction,
            [key]: value
        })
    }
    const onClose = () => navigate(prevPath, { replace: true });
    return (
        <Drawer onClose={onClose} title={'Transaction Details'} key={id} icon={<TransactionIcon />}>
            <div className="p-4">
                <div className="-ml-2 my-3">
                    <NameField
                        name="name"
                        value={transaction.name}
                        transaction={transaction}
                        isTitleField
                    />
                </div>
                <div className="-ml-2 my-3">
                    <TextAreaField
                        name="description"
                        transaction={transaction}
                        value={transaction?.description}
                    />
                </div>
                <div className="h-1 border-b my-3"></div>
                <div className="flex flex-col gap-3">
                    <HorizontalField name="Amount">
                        <div className="flex items-center gap-1">
                            <span className="mt-[.5px]">
                                Rs.
                            </span>
                            <NumberField
                                name="amount"
                                transaction={transaction}
                                value={transaction.amount}
                            />
                        </div>
                    </HorizontalField>
                    <HorizontalField name="Type">
                        <SelectionDropdown
                            trigger={<div className="cursor-pointer"><Type type={transaction.type} /></div>}
                            onSelect={(value) => handleUpdate('type', value)}
                            options={Object.keys(TRANSACTION_TYPES).map(type => ({
                                label: type.toLowerCase(),
                                value: type.toLowerCase()
                            }))}
                            selected={transaction.type}
                        />
                    </HorizontalField>
                    <HorizontalField name="Category">
                        <SelectionDropdown
                            trigger={<div><CategoryTrigger option={selectedCategory} /></div>}
                            onSelect={(value) => handleUpdate('categoryId', value)}
                            options={categoryOptions}
                            selected={transaction.categoryId}
                        />
                    </HorizontalField>
                    <HorizontalField name="Wallet">
                        <SelectionDropdown
                            trigger={<div><WalletTrigger option={selectedWallet} /></div>}
                            onSelect={(value) => handleUpdate('categoryId', value)}
                            options={walletOptions}
                            selected={transaction.walletId}
                        />
                    </HorizontalField>
                </div>
            </div>
        </Drawer>
    )
}
export default TransactionExpand;

const CategoryTrigger = ({ option }: { option?: Option }) => {
    return (
        <div
            className={classNames(
                "text-secondary-foreground sm:text-sm px-3 rounded-[4px] cursor-pointer h-[40px] sm:h-[32px] w-full outline-none",
                "border hover:bg-muted flex items-center gap-3 focus:bg-muted",
                "transition-all"
            )}
            tabIndex={0}
        >
            <CategoryIcon categoryId={option?.value || ''} size={14} key={option?.value} />
            <span>{option?.label}</span>
        </div>
    )
}
const WalletTrigger = ({ option }: { option?: Option }) => {
    return (
        <div
            className={classNames(
                "text-secondary-foreground px-3 rounded-[4px] cursor-pointer h-[40px] sm:h-[32px] w-full outline-none",
                "border hover:bg-muted flex items-center gap-3 focus:bg-muted",
                "transition-all"
            )}
            tabIndex={0}
        >
            <TbWallet size={16} />
            <span className="">{option?.label}</span>
        </div>
    )
}

const HorizontalField = ({
    name,
    children
}: {
    name: string,
    children: ReactElement
}) => {
    return (
        <div className="grid grid-cols-3 items-center my-2">
            <div className="text-muted-foreground col-span-1 text-[14px] sm:text-sm">{name}</div>
            <div className="col-span-2">
                {children}
            </div>
        </div>
    )
}

type NameFieldProps = {
    value: string | undefined,
    transaction: Transaction | undefined,
    name: string,
    isTitleField?: boolean
}
export const NameField = ({
    value,
    transaction,
    name,
    isTitleField = false
}: NameFieldProps) => {
    const { updateTransaction } = useTransactions({ id: transaction?.id });
    const ref = useRef<HTMLInputElement>(null);

    const handleBlur = () => {
        handleUpdate();
    }
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleUpdate();
            ref.current?.blur();
        }
    }
    const handleUpdate = () => {
        if (ref.current && transaction && (ref.current.value !== value)) {
            updateTransaction({ ...transaction, [name]: ref.current.value })
        }
    }
    useEffect(() => {
        if (ref.current) {
            ref.current.value = value || '';
        }
    }, [value])
    return (
        <div className="flex w-full">
            <input
                type="text"
                name="name"
                id="name"
                className={mergeClasses(classNames(
                    "border text-secondary-foreground h-[35px] border-transparent px-2 outline-none w-full  rounded transition-all duration-200 hover:bg-muted focus:text-accent-foreground focus:border-border focus:bg-background",
                    {
                        "h-[40px] text-xl font-medium": isTitleField,
                    }
                ))}
                defaultValue={value}
                ref={ref}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
            />
        </div>
    )
}

type TextAreaField = {
    value: string | undefined,
    transaction: Transaction | undefined,
    name: string,
    isTitleField?: boolean
}
export const TextAreaField = ({
    value,
    transaction,
    name
}: TextAreaField) => {
    const { updateTransaction } = useTransactions({ id: transaction?.id });
    const ref = useRef<HTMLTextAreaElement>(null);

    const handleBlur = () => {
        handleUpdate();
    }
    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter') {
            handleUpdate();
            ref.current?.blur();
        }
    }
    const handleUpdate = () => {
        if (ref.current && transaction && (ref.current.value !== value)) {
            updateTransaction({ ...transaction, [name]: ref.current.value })
        }
    }
    useEffect(() => {
        if (ref.current) {
            ref.current.value = value || '';
        }
    }, [value])
    return (
        <div className="flex w-full">
            <textarea
                name="name"
                id="name"
                rows={3}
                placeholder="Description"
                className={mergeClasses(classNames(
                    "border resize-none text-secondary-foreground border-transparent p-2 outline-none w-full bg-muted",
                    "rounded transition-all duration-200 hover:bg-muted focus:text-accent-foreground",
                    "focus:border-border focus:bg-background"
                ))}
                defaultValue={value}
                ref={ref}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
            />
        </div>
    )
}

type NumberFieldProps = {
    value: number,
    transaction: Transaction,
    name: string,
    isTitleField?: boolean
}
export const NumberField = ({
    value,
    transaction,
    name = 'amount',
    isTitleField = false
}: NumberFieldProps) => {
    const [loading, setLoading] = useState(false);
    const { updateTransaction } = useTransactions({ id: transaction?.id });
    const [currentValue, setCurrentValue] = useState(value);
    // create a ref for input type number element
    const ref = useRef<HTMLInputElement>(null);

    const handleBlur = () => {
        handleUpdate();
    }
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleUpdate();
        }
    }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        if (inputValue === '') {
            setCurrentValue(0);
            return;
        }
        const parsedValue = parseInt(inputValue);
        if (parsedValue) {
            setCurrentValue(parsedValue);
        }
    }
    const handleUpdate = async () => {
        const newValue = currentValue === 0 ? value : currentValue;

        if (newValue !== value) {
            setLoading(true);
            await updateTransaction({
                ...transaction,
                [name]: currentValue
            })
            setLoading(false);
        }
        ref.current?.blur();
    }

    useEffect(() => {
        if (value) setCurrentValue(value);
    }, [value])
    return (
        <div className="flex w-full relative">
            <input
                type="text"
                name="name"
                id="name"
                onChange={handleChange}
                className={mergeClasses(classNames(
                    "border text-secondary-foreground h-[35px] border-transparent px-2 outline-none w-full  rounded transition-all duration-200 hover:bg-muted focus:text-accent-foreground focus:border-border focus:bg-background",
                    {
                        "h-[40px] text-xl font-medium": isTitleField,
                    }
                ))}
                defaultValue={value}
                ref={ref}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
            />
            {loading && <div className="absolute right-2 top-[50%] translate-y-[-50%]">
                <Loader size={20} />
            </div>}
        </div>
    )
}