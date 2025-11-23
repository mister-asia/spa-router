import { Router } from "@/components/Router";

import { useHistory } from "./hooks/useHistory";
import { useLocation } from "./hooks/useLocation";
import { useParams } from "./hooks/useParams";

const Main = () => {
  const history = useHistory();

  return (
    <div>
      <div>Main</div>
      <button
        onClick={() => {
          history.navigate("/login");
        }}
      >
        Go to login
      </button>
      <button
        onClick={() => {
          history.navigate("/user/123");
        }}
      >
        Go to user 123
      </button>
      <button
        onClick={() => {
          history.navigate("/user/123/wallet/456?replace=true#44", {
            state: { from: "main" },
          });
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
  const history = useHistory();
  const location = useLocation();

  console.log("location", location);

  return (
    <div>
      <div>
        Wallet {walletId} of user {userId}
      </div>
      <button onClick={() => history.back()}>Back</button>
      <button onClick={() => history.forward()}>Forward</button>
      <button onClick={() => history.go(-1)}>Go back</button>
      <button onClick={() => history.go(1)}>Go forward</button>
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
