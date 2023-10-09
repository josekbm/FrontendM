import React, { createContext, useContext, useReducer } from "react";


interface State {
  upn: string;
  pass: string;
  token: {
    message: string;
    result: string;
    upn: string;
    nombre: string;
    apellidos: string;
    fechaNacimiento:string;
    success: boolean;
  };
  isLogged: boolean;
}

interface Action {
  type: string;
  user: {
    upn: string;
    pass: string;
    token: {
      message: string;
      result: string;
      upn: string;
      nombre: string;
      apellidos: string;
      fechaNacimiento:string;
      success: boolean;
    };
  };
}

interface Context {
  user: {
    upn: string;
    pass: string;
    token: {
      message: string;
      result: string;
      upn: string;
      nombre: string;
      apellidos: string;
      fechaNacimiento:string;
      success: boolean;
    };
    isLogged: boolean;
  };
  dispatch?: any;
}

const initialContext: Context = {
  user: {
    upn: "",
    pass: "",
    token: {
      message: "",
      result: "",
      upn: "",
      nombre: "",
      apellidos: "",
      fechaNacimiento:"",
      success: false,
    },
    isLogged: false,
  },
};

const LoginContext = createContext(initialContext);

export const useLogin = () => {
  return useContext(LoginContext);
};

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "login":
      if (action.user.token) {
        localStorage.setItem(
          "user",
          JSON.stringify({
            upn: action.user.token.upn,
            nombre: action.user.token.nombre,
            apellidos: action.user.token.apellidos,
            cumpleaños: action.user.token.fechaNacimiento,
            token: action.user.token.result,
            isLogged: true,
          })
        );
        return { ...state, UPN: action.user.upn, isLogged: true };
      } else {
        return { ...state, isLogged: false };
      }
    case "logout":
      localStorage.removeItem("user");
      return { ...state, UPN: "", isLogged: false };
    default:
      return { ...state };
  }
};

const LoginProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  let userEmpty = { UPN: "", isLogged: false };

  const [user, dispatch] = useReducer(
    reducer,
    JSON.parse(localStorage.getItem("user") || JSON.stringify(userEmpty))
  );

  return (
    <LoginContext.Provider value={{ user, dispatch }}>
      {children}
    </LoginContext.Provider>
  );
};

export default LoginProvider;

