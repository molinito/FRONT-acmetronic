import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

function ProtectedRoutes() {
	// const isLogged = window.localStorage.getItem('logged');
	const isLogged = useSelector((state) => state.isAuthenticated);

	if (!isLogged) return <Navigate to='/login' />;

	return <Outlet />;
}

export default ProtectedRoutes;
