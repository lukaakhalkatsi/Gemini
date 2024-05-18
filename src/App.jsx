import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Chat from './pages/Chat/Chat.jsx'
import Enter from './pages/Enter/Enter.jsx'
import Protector from "./RouteProtector/Protector.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Enter />,
  },
  {
    path: "/chat",
    element: <Protector><Chat /></Protector>,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
