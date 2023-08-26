import { TbLogout } from 'react-icons/tb';

import Button from "@components/custom/Button";
import { useAuth } from "@hooks";
import { Container } from '@components/custom';

const Dashboard = () => {
    const { user, logoutMutation, logoutLoading } = useAuth();

    // return if user is not null
    if (!user) return null;

    return (
        <Container>
            <div className="h-screen flex items-center justify-center">
                <div className="max-w-[500px] shadow-md rounded-md border p-4 w-full">
                    <div className="flex items-center gap-4">
                        <div className="h-16 w-16 rounded-full mx-auto overflow-hidden">
                            {user.avatarUrl ? (
                                <img className='w-full h-full' src={user.avatarUrl} />
                            ) : (
                                <div className="h-full w-full bg-primary-foreground text-primary-dark flex items-center justify-center text-3xl text-display">
                                    {user.name.charAt(0).toUpperCase()}
                                </div>
                            )}
                        </div>
                        <div className="flex flex-1 flex-col">
                            <div className="font-medium text-lg">
                                {user.name}
                            </div>
                            <div className="text-sm text-muted-foreground">
                                {user.email}
                            </div>
                        </div>
                    </div>
                    <br />
                    <hr />
                    <br />
                    <div className="flex justify-end">
                        <Button
                            variant='destructive'
                            size='md'
                            onClick={logoutMutation}
                            loading={logoutLoading}
                        >
                            <TbLogout size={18} />
                            <span>Logout</span>
                        </Button>
                    </div>
                </div>
            </div>
        </Container>
    )
}
export default Dashboard;