import { ImSpinner2 } from 'react-icons/im';

type Props = {
    size?: number
}
const Loader = ({ size = 30 }: Props) => {
    return (
        <ImSpinner2 size={size} className='animate-spin' />
    )
}
export default Loader