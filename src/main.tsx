import React from "react";
import ReactDOM from "react-dom/client";
import { Link, RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";

const Submit = () => {
  // const [disabled, setDisabled] = useState(!true);
  // useEffect(() => {
  //   if (Date.now() % 2 == 0) setDisabled(!false);
  // }, []);

  return (
    <div className="grid place-content-center gap-4">
      <h1 className="pricing-header firstch text-4xl uppercase font-biber">
        Entraines-toi à remplir le plus rapidement le formulaire
      </h1>
      <Link
        to={"/form"}
        className="bg-purple-500 capitalize text-white p-2 w-fit px-4 mx-auto text-center rounded-sm shadow"
      >
        <button type="submit" className="">commencer</button>
      </Link>
    </div>
  );
};
const router = createBrowserRouter([
  {
    path: "/",
    element: <Submit />,
  },
  {
    path: "/form",
    element: <App />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
