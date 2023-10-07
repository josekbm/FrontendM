import { BsArrowBarLeft, BsArrowBarRight } from "react-icons/bs";
import { HiOutlineLogout, HiOutlineBell, HiOutlineMail } from "react-icons/hi";
import { Nav, NavItemContainer } from "./TopBarStyled";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../context/LoginProvider";
import { Dispatch, SetStateAction } from "react";

interface TopBarProps {
  open: boolean,
  page: string,
  showSideBar: Dispatch<SetStateAction<boolean>>;
}

export const TopBar = ({open, page, showSideBar}: TopBarProps) => {
  const logout = useLogin()
  const onClickSideBarHandler = () => {
      if (open) {
        showSideBar(false);
      } else {
        showSideBar(true);
      }
  };
  const navigate = useNavigate()
  const HandleLogout = (event: any) => {
    event.preventDefault()
    logout.dispatch({type: 'logout'})
    // Redirigir al usuario a la página de inicio de sesión
    navigate("/login");
  };
  


  if (open) {
    return (
      <>
        <Nav>
          <NavItemContainer>
            <BsArrowBarLeft onClick={onClickSideBarHandler} />
            <h2>{page}</h2>
          </NavItemContainer>
          <NavItemContainer>
            <HiOutlineBell />
            <HiOutlineMail />
            <HiOutlineLogout onClick={HandleLogout} data-testid="logout__button"/>
          </NavItemContainer>
        </Nav>
      </>
    );
  } else {
    return (
      <>
        <Nav>
          <NavItemContainer>
            <BsArrowBarRight onClick={onClickSideBarHandler} />
            <h2>{page}</h2>
          </NavItemContainer>
          <NavItemContainer>
            <HiOutlineBell />
            <HiOutlineMail />
            <HiOutlineLogout onClick={HandleLogout} data-testid="logout__button"/>
          </NavItemContainer>
        </Nav>
      </>
    );
  }
};
