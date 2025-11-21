import { Router } from "@/components/Router";
import { routerHistory } from "@/core/routerHistory";

import { useParams } from "./hooks/useParams";

const Main = () => <div>Main</div>;
const Login = () => <div>Login</div>;

const User = () => {
  const { userId } = useParams();
  return <div>User {userId}</div>;
};

const Wallet = () => {
  const { userId, walletId } = useParams<{
    userId: string;
    walletId: string;
  }>();

  return (
    <div>
      <div>
        Wallet {walletId} of user {userId}
      </div>
      <button
        onClick={() => {
          routerHistory.navigate("/user/123");
        }}
      >
        Go to user 123
      </button>
    </div>
  );
};

const NotFound = () => <div>Custom 404</div>;

export default function App() {
  return (
    <Router
      routes={[
        { path: "/", element: <Main /> },
        { path: "/login", element: <Login /> },
        { path: "/user/:userId", element: <User /> },
        { path: "/user/:userId/wallet/:walletId", element: <Wallet /> },
      ]}
      Fallback={<NotFound />}
    />
  );
}
