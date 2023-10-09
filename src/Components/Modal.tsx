import { Button } from "./Button";
import { ModalButtonRow, ModalCloseRow, ModalContainer } from "./ModalStyled";
import { IoClose } from "react-icons/io5";
import { addEmpleado, deleteEmpleado, fetchEmpleados} from "../Features/empleadoSlice";
import {
  FormContainer,
  Input
} from "./FormStyled";
import {
  dateConverter,
  getTodayString,
} from "../Features/otherFunctions";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { useAppDispatch } from "../app/hooks";
import { useNavigate } from "react-router";
import { toastWarning, toastSuccess } from "../Features/toastify";

interface ModalProps {
  mode?: string,
  page?: string,
  itemId?: string,
  setShowDeleteModal?: Dispatch<SetStateAction<boolean>>,
  setShowCreateModal?: Dispatch<SetStateAction<boolean>>,
  showDeleteModal?: boolean,
  showCreateModal?: boolean,
  showModal?: boolean,
  setShowModal?: Dispatch<SetStateAction<boolean>>,
  showNotesModal?: boolean,
  setShowNotesModal?: Dispatch<SetStateAction<boolean>>,
  
}
export const Modal = ({page, itemId, setShowDeleteModal, setShowCreateModal, showDeleteModal, showCreateModal, mode} : ModalProps) => {
  const dispatch = useAppDispatch();
  const [fieldError, setFieldError] = useState("");
  const navigate = useNavigate();

  const [empleadoUPN, setEmpleadoUPN] = useState("");
  const [empleadoPassword, setEmpleadoPassword] = useState("");
  const [empleadoFechaNacimiento, setEmpleadoFechaNacimiento] = useState("");
  const [empleadoNombre, setEmpleadoNombre] = useState("");
  const [empleadoApellidos, setEmpleadoApellidos] = useState("");
  const [empleadoResponsable, setEmpleadoResponsable] = useState("");
  const [empleadoRol, setEmpleadoRol] = useState("");
  const [empleadoImage, setEmpleadoImage] = useState(
    "https://randomEmpleado.me/api/portraits/lego/5.jpg"
  );
  const [empleadoState, setEmpleadoState] = useState("");
  

  const onClickDeleteHandler = () => {
    if (page === "empleados" && setShowDeleteModal && itemId) {
      dispatch(deleteEmpleado(itemId)).then(()=> {
        dispatch(fetchEmpleados())
        toastSuccess("Empleado Borrado!")
      });
      navigate("/")
      setShowDeleteModal(false);
    }
       
  };

  const onCreateSubmitHandler = (event:FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (page === "empleados") {
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
        const empleado = {
          
          upn: empleadoUPN,
          nombre: empleadoNombre,
          apellidos: empleadoApellidos,
          fechaNacimiento: empleadoFechaNacimiento,
          password: empleadoPassword,
          responsable: empleadoResponsable,
          rol: empleadoRol,
          
        };
        dispatch(addEmpleado(empleado)).then(() => {
          dispatch(fetchEmpleados())
          toastSuccess("Empleado created!")          
        })
        navigate("/")
        
        if(setShowCreateModal){
          setShowCreateModal(false);
        }
        setFieldError("");
        setEmpleadoApellidos("");
        setEmpleadoNombre("");
        setEmpleadoImage(
          "https://randomEmpleado.me/api/portraits/lego/5.jpg"
        );
        const form = document.getElementById('createForm') as HTMLFormElement 
        form.reset();
        setEmpleadoPassword("");
        setEmpleadoRol("Manager");
        setEmpleadoFechaNacimiento("");
        setEmpleadoResponsable("");
        
        
      }
    }
    
  };

  if (mode === "delete") {
    return (
      <>
        <ModalContainer show={showDeleteModal}>
          <ModalCloseRow>
            <IoClose
              onClick={() => {
                if(setShowDeleteModal)
                setShowDeleteModal(false);
              }}
            />
          </ModalCloseRow>
          <h2>Estás seguro de que quieres borrar a este usuario?</h2>
          <ModalButtonRow>
            <Button type="delete" onClick={onClickDeleteHandler}>
              Borrar
            </Button>
            <Button
              onClick={() => {
                if(setShowDeleteModal)
                  setShowDeleteModal(false);
              }}
            >
              Cancelar
            </Button>
          </ModalButtonRow>
        </ModalContainer>
      </>
    );
  }
  if (mode === "create") {
    if (page === "empleados") {
      return (
        <>
          <ModalContainer show={showCreateModal} top>
            <ModalCloseRow>
              <IoClose
                onClick={() => {
                  if(setShowCreateModal)
                  setShowCreateModal(false);
                  setFieldError("");
                }}
              />
            </ModalCloseRow>
            <FormContainer onSubmit={onCreateSubmitHandler} id="createForm">
              <h2>New Empleado</h2>
              <p>{fieldError}</p>

              <Input>
                <label htmlFor="name">Nombre</label>
                <input
                  type="text"
                  name="name"
                  onChange={(e) => {
                    setEmpleadoNombre(e.target.value);
                  }}
                />
              </Input>
              <Input>
                <label htmlFor="name">Apellidos</label>
                <input
                  type="text"
                  name="apellidos"
                  onChange={(e) => {
                    setEmpleadoApellidos(e.target.value);
                  }}
                />
              </Input>
              <Input>
                <label htmlFor="position">Rol</label>
                <select
                  name="position"
                  defaultValue={"manager"}
                  onChange={(e) => {
                    setEmpleadoRol(e.target.value);
                  }}
                >
                  <option>Administrador</option>
                  <option>Mánager</option>
                  <option>Arquitecto</option>
                  <option>Desarrollador</option>
                  <option>Técnico</option>
                </select>
              </Input>
              <Input>
                <label htmlFor="name">Responsable</label>
                <input
                  type="email"
                  name="name"
                  onChange={(e) => {
                    setEmpleadoResponsable(e.target.value);
                  }}
                />
              </Input>
              <Input>
                <label htmlFor="email">UPN</label>
                <input
                  type="email"
                  name="name"
                  onChange={(e) => {
                    setEmpleadoUPN(e.target.value);
                  }}
                />
              </Input>
              <Input>
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  onChange={(e) => {
                    setEmpleadoPassword(e.target.value);
                  }}
                />
              </Input>
              <Input>
                <label htmlFor="name">Date of Birth</label>
                <input
                  type="date"
                  name="BirthDate"
                  defaultValue={getTodayString()}
                  onChange={(e) => {
                    setEmpleadoFechaNacimiento(e.target.value);
                  }}
                />
              </Input>
              <Button>Save!</Button>
            </FormContainer>
          </ModalContainer>
        </>
      );
    }
    
    else return(<></>)
  }

  
};