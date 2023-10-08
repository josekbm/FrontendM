import { HashRouter, Routes, Route } from "react-router-dom";
import { Empleados } from "./Pages/empleados/Empleados";
import Empleados2 from "./Pages/empleados/Empleados2";
import { SingleEmpleado } from "./Pages/empleados/SingleEmpleado";
import Login from "./Pages/login/Login";
import { Layout } from "./Components/Layout";
import "./App.css";
import LoginProvider from "./context/LoginProvider";
import RequiredAuth from "./context/RequiredAuth";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import { getLoggedUser } from "./Components/Sidebar";


function App() {
  return (
    <>
    <LoginProvider>
      <HashRouter>
        <RequiredAuth>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Empleados/>} />
              <Route path="/empleados/:upn" element={<SingleEmpleado />} />
              <Route path="/empleados2" element={<Empleados2 />} />
            </Route>
            <Route path="/login" element={<Login />} />
          </Routes>
        </RequiredAuth>
      </HashRouter>
      <ToastContainer/>
    </LoginProvider>
    </>
  );
}
export default App;
