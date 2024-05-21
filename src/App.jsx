import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Chat from "./pages/Chat/Chat.jsx";
import Enter from "./pages/Enter/Enter.jsx";
import Protector from "./RouteProtector/Protector.jsx";
import Error from "./pages/Error/Error.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Enter />,
  },
  {
    path: "/chat",
    element: (
      <Protector>
        <Chat />
      </Protector>
    ),
  },
  {
    path: "/error",
    element: <Error />,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
