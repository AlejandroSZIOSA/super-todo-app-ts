import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/Home";
import OrganizePage from "./pages/Organize";
import SettingsPage from "./pages/Settings";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      children: [
        { index: true, element: <HomePage /> },
        { path: "organize", element: <OrganizePage /> },
        { path: "settings", element: <SettingsPage /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
