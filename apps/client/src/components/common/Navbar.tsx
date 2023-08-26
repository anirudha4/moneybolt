import Button from "@components/custom/Button";
import { PATHS } from "@config/constants/paths";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
    return (
        <div className="flex items-center gap-10">
            <NavLink className='hidden md:block text-secondary-foreground hover:text-primary duration-150' to={PATHS.AUTH}>Login</NavLink>
            <Link to={PATHS.AUTH + '?type=signup'}><Button rounded="full">Get Started</Button></Link>
        </div>
    )
}
export default Navbar;