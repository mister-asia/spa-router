import {Route} from "@/types";
import {Router} from "@/components/Router";
import {useParams} from "@/components/RouterProvider";

const Main = () => <div>Main</div>
const Login = () => <div>Login</div>

const User = () => {
    const {userId} = useParams();
    return <div>User {userId}</div>
}

const Wallet = () => {
    const {userId, walletId} = useParams();
    return <div>Wallet {walletId} of user {userId}</div>
}

const routes: Route[] = [
    {
        path: '/',
        component: Main
    },
    {
        path: '/login',
        component: Login
    },
    {
        path: '/user/:userId',
        component: User
    },
    {
        path: '/user/:userId/wallet/:walletId',
        component: Wallet
    },
]

export default function App() {
    return <Router routes={routes}/>
}
