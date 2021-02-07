//components
import Login from '../components/Login'
import Dashboard from '../components/Dashboard'
//redux
import { useSelector } from 'react-redux';



export default function Admin() {
    const isLoggedIn = useSelector(state => state.isLoggedIn);

    return (
        <div>
            {isLoggedIn ?
                <Dashboard />
                :
                <Login />
            }
            
        </div>
    )
}