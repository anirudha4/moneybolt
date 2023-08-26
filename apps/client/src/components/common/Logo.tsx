import { PATHS } from '@config/constants/paths'
import { BiSolidBolt } from 'react-icons/bi'
import { NavLink } from 'react-router-dom'
type Props = {
    size?: 'sm' | 'md' | 'lg',
    full?: boolean
}

const LOGO_SIZE_MAP = {
    sm: 20,
    md: 24,
    lg: 28
}
const Logo = ({ size = 'md', full = true }: Props) => {
    return (
        <NavLink to={PATHS.HOME} className="flex items-center gap-1">
            <BiSolidBolt size={LOGO_SIZE_MAP[size]} className='text-primary' />
            {full && <div className="text-display font-extrabold text-xl text-primary tracking-wider">
                moneybolt
            </div>}
        </NavLink>
    )
}

export default Logo;