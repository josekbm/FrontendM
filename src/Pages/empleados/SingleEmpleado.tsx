import { useNavigate, useParams } from "react-router-dom";
import {
  Card,
  CardContainer,
  CardTitle,
  UserImage,
  CardItem,
  CardSeparator,
  TitleRow,
  FeaturesRow,
  CardHeader,
  CloseIcon,
} from "../../Components/CardStyled";
import { useEffect, useState } from "react";
import {
  editEmpleado,
  getEmpleado,
  getSingleEmpleadoStatus,
  getEmpleadosSingle,
  
} from "../../Features/empleadoSlice";
import { FiArrowLeftCircle, FiEdit } from "react-icons/fi";
import { Button } from "../../Components/Button";
import { Input, Label, RadioInput } from "../../Components/FormStyled";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import NotFound from "../notfoundpage/notfoundpage";
import { Wrapper } from "../../Components/LayoutStyled";
import PropagateLoader from "react-spinners/PropagateLoader";
import { toastSuccess, toastWarning } from "../../Features/toastify";

export const SingleEmpleado = () => {
  const empleadoId = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const getEmpleadoData = useAppSelector(getEmpleadosSingle);
  const getEmpleadoStatus = useAppSelector(getSingleEmpleadoStatus);

  const [fieldError, setFieldError] = useState("");
  const [empleadoUPN, setEmpleadoUPN] = useState("");
  const [empleadoPassword, setEmpleadoPassword] = useState("");
  const [empleadoFechaNacimiento, setEmpleadoFechaNacimiento] = useState("");
  const [empleadoNombre, setEmpleadoNombre] = useState("");
  const [empleadoApellidos, setEmpleadoApellidos] = useState("");
  const [empleadoResponsable, setEmpleadoResponsable] = useState("");
  const [empleadoRol, setEmpleadoRol] = useState("");
  
  

  const [edit, setEdit] = useState(false);

  useEffect(() => {
    if (getEmpleadoData && empleadoId) {
      if (empleadoId.upn !== getEmpleadoData.upn) {
        dispatch(getEmpleado(empleadoId.upn as string));
      }
    }

    if (getEmpleadoData) {
      setEmpleadoUPN(getEmpleadoData.upn);
      setEmpleadoPassword(getEmpleadoData.password);
      setEmpleadoFechaNacimiento(getEmpleadoData.fechaNacimiento);
      setEmpleadoNombre(getEmpleadoData.nombre);
      setEmpleadoApellidos(getEmpleadoData.apellidos);
      setEmpleadoResponsable(getEmpleadoData.responsable);
      setEmpleadoRol(getEmpleadoData.rol);
      
    }
  }, [dispatch, getEmpleadoStatus, empleadoId.UPN, getEmpleadoData]);

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      empleadoUPN === "" ||
      empleadoPassword === "" ||
      empleadoNombre === "" ||
      empleadoApellidos === "" ||
      empleadoFechaNacimiento === "" ||
      empleadoResponsable === "" ||
      empleadoRol === ""
    ) {
      toastWarning("It seems you miss enter some field!");
    } else {
      if (getEmpleadoData) {
        const empleado = {
          upn: getEmpleadoData.upn,
          nombre: empleadoNombre,
          apellidos: empleadoApellidos,
          fechaNacimiento: empleadoFechaNacimiento,
          password: empleadoPassword,
          responsable: empleadoResponsable,
          rol: empleadoRol,
                    
        };
        dispatch(editEmpleado(empleado)).then(() => {
          dispatch(getEmpleado(empleado.upn));
          toastSuccess("User modified!");
        });
        dispatch(getEmpleado(empleado.upn));
        console.log(getEmpleadoData);
        setEdit(false);
      }
    }
  };

  if (getEmpleadoStatus === "rejected") {
    return (
      <>
      <NotFound />
      </>
    );
  } else {
    if (getEmpleadoData.upn === empleadoId.upn) {
      if (edit !== true) {
        return (
          <>
            <CardContainer>
              <Card>
                <CardHeader>
                  <FiArrowLeftCircle
                    onClick={() => {
                      navigate("/");
                    }}
                  />
                  <FiEdit
                    onClick={() => {
                      setEdit(true);
                    }}
                  />
                </CardHeader>

                <TitleRow>
                  <UserImage>
                    <img src="https://randomuser.me/api/portraits/lego/1.jpg"alt="" />
                  </UserImage>
                  <CardTitle>
                    <h2>{getEmpleadoData.nombre}</h2>
                    <h5>{getEmpleadoData.rol}</h5>
                  </CardTitle>
                </TitleRow>
                <FeaturesRow>
                  <CardItem>
                    <h6>UPN</h6>
                    <h5>{getEmpleadoData.upn}</h5>
                  </CardItem>
                  <CardItem>
                    <h6>Responsable</h6>
                    <h5>{getEmpleadoData.responsable}</h5>
                  </CardItem>
                </FeaturesRow>
                <FeaturesRow>
                  <CardItem>
                    <h6>Date of Birth</h6>
                    <h5>{getEmpleadoData.fechaNacimiento}</h5>
                  </CardItem>
                </FeaturesRow>
                <FeaturesRow>
                  <CardItem>
                    <h6>Password</h6>
                    <h5>{"*********"}</h5>
                  </CardItem>
                </FeaturesRow>
                <CardSeparator />
                
              </Card>
            </CardContainer>
          </>
        );
      } else {
        return (
          <>
            <CardContainer>
              <Card>
                <CardHeader>
                  <FiArrowLeftCircle
                    onClick={() => {
                      navigate("/");
                    }}
                  />
                  <p>{fieldError}</p>
                  <CloseIcon
                    onClick={() => {
                      setEdit(false);
                      setFieldError("");
                    }}
                  />
                </CardHeader>
                <form onSubmit={onSubmitHandler}>
                  <FeaturesRow>
                    <CardItem>
                      <Input>
                        <h6>Nombre</h6>
                        <input
                          type="text"
                          name="name"
                          defaultValue={empleadoNombre}
                          onInput={(e) => {
                            setEmpleadoNombre(e.currentTarget.value);
                          }}
                        />
                      </Input>
                    </CardItem>
                    <CardItem>
                      <Input>
                        <h6>Rol</h6>
                        <select
                          name="rol"
                          defaultValue={empleadoRol}
                          onChange={(e) => {
                            setEmpleadoRol(e.target.value);
                          }}
                        >
                          <option>Administrado</option>
                          <option>Desarrollador</option>
                          <option>Arquitecto</option>
                          <option>Mánager</option>
                          <option>Técnico</option>
                        </select>
                      </Input>
                    </CardItem>
                  </FeaturesRow>

                  <FeaturesRow>
                    <CardItem>
                      <Input>
                        <h6>Responsable</h6>
                        <input
                          type="email"
                          name="name"
                          defaultValue={empleadoResponsable}
                          onInput={(e) => {
                            setEmpleadoResponsable(e.currentTarget.value);
                          }}
                        />
                      </Input>
                    </CardItem>
                    <CardItem>
                      <Input>
                        <h6>UPN</h6>
                        <input
                          type="email"
                          name="name"
                          defaultValue={empleadoUPN}
                          onInput={(e) => {
                            setEmpleadoUPN(e.currentTarget.value);
                          }}
                        />
                      </Input>
                    </CardItem>
                  </FeaturesRow>
                  <FeaturesRow>
                    <CardItem>
                      <Input>
                        <h6>Fecha de Nacimiento</h6>
                        <input
                          type="date"
                          name="startDate"
                          defaultValue={empleadoFechaNacimiento}
                          onInput={(e) => {
                            setEmpleadoFechaNacimiento(e.currentTarget.value);
                          }}
                        />
                      </Input>
                    </CardItem>
                    <CardItem>
                      
                    </CardItem>
                  </FeaturesRow>
                  <FeaturesRow>
                    <CardItem>
                      <Input>
                        <h6>Password</h6>
                        <input
                          type="password"
                          defaultValue={empleadoPassword}
                          name="password"
                          onInput={(e) => {
                            setEmpleadoPassword(e.currentTarget.value);
                          }}
                        />
                      </Input>
                    </CardItem>
                  </FeaturesRow>
                  <CardSeparator />

                  <FeaturesRow>
                    <Button>Save</Button>
                  </FeaturesRow>
                </form>
              </Card>
            </CardContainer>
          </>
        );
      }
    } else {
      return (
        <>
          <Wrapper>
            <PropagateLoader color="#407957" size={15} />
          </Wrapper>
        </>
      );
    }
  }
};
