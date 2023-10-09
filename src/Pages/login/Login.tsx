import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Logo } from "../../Components/SideBarStyled";
import { LogContainer, LogForm, Inputs } from "./LoginStyled";
import { EditButton } from "../../Components/Button";
import logo from "../../Assets/Logo.png";
import { useLogin } from "../../context/LoginProvider";
import { toast } from "react-toastify";
import axios from "axios";
import { toastSuccess, toastWarning } from "../../Features/toastify";

let toastMSG = (msg = "Wrong User") => {
  toast.error(msg, {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });
};

const loginApi = async (UPN: String, password: String) => {
  try {
    const response = await axios(`${process.env.REACT_APP_API_URL}usuario/login`, {
      method: "POST",
      
      data: JSON.stringify({ UPN: UPN, password: password }),
      headers: { "Content-type": "application/json;charset=UTF-8" },
      
    });
    if (!response.data.success) {
      toastMSG("Wrong User");
    } else {
      const data = response.data;
      return data;
    }
  } catch (e) {
    console.log(e);
  }
};

export function Login(props: any) {
  const login = useLogin();
  const [mail, setMail] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  });

  const calcularDiasCumpleanos = (fechaNacimiento: Date) => {
    const hoy = new Date();
    const proximoCumpleanos = new Date(
      hoy.getFullYear(),
      fechaNacimiento.getMonth(),
      fechaNacimiento.getDate()
    )
    if (proximoCumpleanos < hoy) {
      proximoCumpleanos.setFullYear(hoy.getFullYear() + 1);
    }
    const unDiaEnMilisegundos = 24 * 60 * 60 * 1000;
    const diferenciaEnDias = Math.floor((proximoCumpleanos.getTime() - hoy.getTime()) / unDiaEnMilisegundos);

    return diferenciaEnDias;
  }

  const cumpleanos = localStorage.getItem("user");
  
  if (cumpleanos) {
    const user = JSON.parse(cumpleanos)
    const fechaCumpleanos = new Date(user.cumpleaños)

    const diasHastaCumpleanos = calcularDiasCumpleanos(fechaCumpleanos)

    if (diasHastaCumpleanos === 0) {
      toastSuccess("Feliz Cumpleaños!!🥳🥳🥳🎂🎂🎂")
    }
    if(diasHastaCumpleanos === 1){
      toastSuccess("Mañana es tu cumple, prepárate! 😜")
    }else{
      toastWarning(`Faltan ${diasHastaCumpleanos} dias para tu cumpleaños! 🤯`)
    }
  }

  const handleForm = async (
    event: React.ChangeEvent<HTMLInputElement & HTMLFormElement>
  ) => {
    event.preventDefault();
    if (mail === "") {
      return toastMSG("Empty Email");
    }
    if (pass === "") {
      return toastMSG("Empty Password");
    }
    const token = await loginApi(mail, pass);
    if (!token) {
      return toastMSG("There's no Token!");
    }
    login.dispatch({ type: "login", user: { mail, pass, token } });
    setTimeout(() => {
      if (localStorage.getItem("token")) {
        
      }
    }, 100);
    setTimeout(() => navigate("/"), 100);
  };

  const handleMail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMail(event.target.value);
  };

  const handlePass = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPass(event.target.value);
  };

  return (
    <LogContainer>
      <LogForm onSubmit={handleForm} data-testid="login__form">
        <Logo column>
          <img src={logo} alt="logo" />
          <h2>Midway Employee Dashboard</h2>
        </Logo>
        <p>
          (Use email=<strong> usuario1@midwaytest.tech </strong> and password=
          <strong> admin</strong> to test the application )
        </p>
        <Inputs>
          <label htmlFor="email">Email:</label>
          <input
            data-testid="login__email__input"
            type="text"
            name="email"
            id="email"
            onChange={handleMail}
            placeholder="Email"
          />

          <label htmlFor="password">Pasword:</label>
          <input
            data-testid="login__password__input"
            type="password"
            name="password"
            id="password"
            onChange={handlePass}
            placeholder="Password"
          />
        </Inputs>

        <EditButton type="submit" data-testid="login__submit__button">
          Login
        </EditButton>
      </LogForm>
    </LogContainer>
  );
}
export default Login;
