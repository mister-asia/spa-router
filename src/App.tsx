import { createBrowserRouter } from "@/core/createBrowserRouter";

import { useHistory } from "./hooks/useHistory";
import { useLocation } from "./hooks/useLocation";
import { useParams } from "./hooks/useParams";
import { useQuery } from "./hooks/useQuery";
import { useSearchParams } from "./hooks/useSearchParams";
import Resize from "./pages/Resize";

import "./index.css";

const Main = () => {
  const history = useHistory();

  return (
    <div>
      <div>Main page</div>
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
      <button
        onClick={() => {
          history.navigate("/resize/1200");
        }}
      >
        Go to Resize page
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
  const [, setSearchParams] = useSearchParams();
  const { userId, walletId } = useParams<{
    userId: string;
    walletId: string;
  }>();

  const query = useQuery();
  console.log("query", query);

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
      <button onClick={() => setSearchParams({ page: "2" }, { replace: true })}>
        Set page to 2
      </button>
    </div>
  );
};

const NotFound = () => <div>Custom 404</div>;

export default function App() {
  return createBrowserRouter(
    [
      { path: "/", element: <Main /> },
      { path: "/login", element: <Login /> },
      {
        path: "/user/:userId",
        element: <User />,
        children: [
          {
            path: "/user/:userId/wallet/:walletId",
            element: <Wallet />,
          },
        ],
      },
      { path: "/resize/:minWidth", element: <Resize /> },
    ],
    <NotFound />,
  );
}
