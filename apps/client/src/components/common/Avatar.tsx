import classNames from "classnames"

type Props = {
    src?: string
    character?: string | number,
    size?: 'sm' | 'md' | 'lg'
}

const Avatar = ({ src, character, size = 'sm' }: Props) => {
    const sizeMap = {
        sm: 'min-h-[30px] min-w-[30px] h-[30px] w-[30px]',
        md: 'min-h-[40px] min-w-[40px] h-[40px] w-[40px]',
        lg: 'min-h-[50px] min-w-[50px] h-[50px] w-[50px]'
    }
    return (
        <div
            className={classNames(
                "bg-secondary overflow-hidden flex items-center justify-center rounded-md",
                "cursor-pointer border-primary-foreground",
                sizeMap[size]
            )}
        >
            {src ? (
                <img
                    className="rounded-full w-full h-full object-cover"
                    src={src}
                    alt="avatar"
                />
            ) : (
                <div className="text-secondary-foreground font-semibold">
                    {character}
                </div>
            )}
        </div>
    )
}
export default Avatar