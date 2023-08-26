import { Container } from "@components/custom";
import { Logo, Navbar } from ".";
import { PRODUCT_LINKS } from "@config/constants/paths";

const Header = () => {
    return (
        <div className="h-24 min-h-[6rem] flex items-center">
            <Container className="flex items-center h-full justify-between w-full">
                <div className="flex items-center gap-10">
                    <Logo size="lg" />
                    {PRODUCT_LINKS.map(link => (
                        <a key={link.id} className="text-secondary-foreground hover:text-primary hidden md:block" href={link.value}>{link.label}</a>
                    ))}
                </div>
                <Navbar />
            </Container>
        </div>
    )
}
export default Header;