import { Button } from "@components/custom"
import { useState } from "react"
import { TbCheck, TbCopy, TbTrash } from "react-icons/tb"

type Props = {
    showCopy?: Boolean,
    onCopyLink?: () => void
    showDelete?: Boolean,
    onDelete?: () => void
}
const ActionBar = ({
    showCopy = true,
    showDelete = true,
    onCopyLink,
    onDelete
}: Props) => {
    const [copied, setCopied] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const handleCopy = () => {
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }, 2000)
        onCopyLink?.();
    }
    const handleDelete = async () => {
        if (onDelete) {
            setDeleting(true);
            await onDelete();
            setDeleting(false);
        }
    }
    return (
        <div className="flex items-center gap-2">
            {showCopy && (
                <Button
                    variant={copied ? "primary-light" : "ghost"}
                    size="xs"
                    onClick={handleCopy}
                >
                    {copied ? <TbCheck /> : <TbCopy />}
                    Copy Link
                </Button>
            )}
            {showDelete && (
                <Button
                    variant="ghost"
                    size="xs"
                    onClick={handleDelete}
                    loading={deleting}
                >
                    <TbTrash />
                    Delete
                </Button>
            )}
        </div>
    )
}
export default ActionBar