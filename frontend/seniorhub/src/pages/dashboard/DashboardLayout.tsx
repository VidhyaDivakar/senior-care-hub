import { Outlet } from 'react-router-dom'
//<Outlet /> is a placeholder that tells React Router "render the child route's component here."

const DashboardLayout = () => {
    return (
        <div>
            <p>Dashboard Layout</p>
            <Outlet />
        </div>
    )
};

export default DashboardLayout;