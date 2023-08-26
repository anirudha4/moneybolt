import Button from "@components/custom/Button";
import { PATHS } from "@config/constants/paths";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
const Home = () => {
    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                exit={{ opacity: 1 }}
            >
                {/* HERO */}
                <div className="flex flex-col items-center justify-center gap-10" style={{ minHeight: 'calc(100vh - 6rem)' }}>
                    <div className="-mt-20">
                        <div className="max-w-4xl text-secondary-foreground mx-auto text-center md:text-6xl text-4xl text-display leading-normal">
                            Gain Financial Clarity and track expenses  with <span className="text-primary">moneybolt</span>.
                        </div>
                        <div className="mt-5 text-secondary-foreground text-center text-lg font-light max-w-lg mx-auto tracking-wide">
                            Track expenses, analyze spending patterns, and make informed financial decisions effortlessly
                        </div>
                    </div>
                    <div className="flex items-center gap-5">
                        <Link to={PATHS.AUTH + '?type=signup'}><Button className="md:w-[180px] w-[150px]" variant="primary" size="lg">Try Free Forever</Button></Link>
                        <Button className="w-[180px]" variant="outline" size="lg">Contact Us</Button>
                    </div>
                </div>
                {/* END HERO */}
            </motion.div>
        </AnimatePresence>
    )
}
export default Home;