import { Router } from "@/components/Router";
import { routerHistory } from "@/core/routerHistory";

import { useParams } from "./hooks/useParams";

const Main = () => {
  return (
    <div>
      <div>Main</div>
      <button
        onClick={() => {
          routerHistory.navigate("/login");
        }}
      >
        Go to login
      </button>
      <button
        onClick={() => {
          routerHistory.navigate("/user/123");
        }}
      >
        Go to user 123
      </button>
      <button
        onClick={() => {
          routerHistory.navigate("/user/123/wallet/456");
        }}
      >
        Go to wallet 456 of user 123
      </button>
    </div>
  );
};

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
      <button onClick={() => routerHistory.back()}>Back</button>
      <button onClick={() => routerHistory.forward()}>Forward</button>
      <button onClick={() => routerHistory.go(-1)}>Go back</button>
      <button onClick={() => routerHistory.go(1)}>Go forward</button>
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
