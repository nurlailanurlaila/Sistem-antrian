import PatientRegistrationForm from "./components/PatientRegistrationForm";
import HomePage from "./components/HomePage";
import {
  createBrowserRouter,
  RouterProvider,
  redirect
} from "react-router-dom";


const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />
  },
  {
    path: "/form-submit",
    element: <PatientRegistrationForm />
  }
]);
const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
