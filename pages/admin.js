//components
import Login from '../components/Login'
import DashboardRouter from '../components/DashboardRouter'
//redux
import { useSelector } from 'react-redux';



export default function Admin() {
    const isLoggedIn = useSelector(state => state.isLoggedIn);

    return (
        <div>
            {isLoggedIn ?
                <DashboardRouter />
                :
                <Login />
            }
            
        </div>
    )
}