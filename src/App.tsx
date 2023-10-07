import { HashRouter, Routes, Route } from "react-router-dom";
import { Dashboard } from "./Pages/Dashboard";
import { Empleados } from "./Pages/empleados/Empleados";
import { SingleEmpleado } from "./Pages/empleados/SingleEmpleado";
import Login from "./Pages/login/Login";
import { Layout } from "./Components/Layout";
import "./App.css";
import LoginProvider from "./context/LoginProvider";
import RequiredAuth from "./context/RequiredAuth";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <>
    <LoginProvider>
      <HashRouter>
        <RequiredAuth>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/Empleados" element={<Empleados />} />
              <Route path="/Empleados/:UPN" element={<SingleEmpleado />} />
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
