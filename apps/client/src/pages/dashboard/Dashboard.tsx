import { useAuth } from "@hooks";

const Dashboard = () => {
    const { user } = useAuth();

    // return if user is not null
    if (!user) return null;

    return (
        <div className="p-4 h-full">
            Dashboard
        </div>
    )
}
export default Dashboard;