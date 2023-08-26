import Loader from "@components/custom/Loader";

const Splash = () => {
    return (
        <div className="h-screen flex justify-center items-center text-primary">
            <Loader size={50} />
        </div>
    )
}
export default Splash;