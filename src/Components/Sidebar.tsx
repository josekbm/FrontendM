import {
  Wrapper,
  Logo,
  LinkContainer,
  User,
  SideBarUserImage,
  MenuLink,
  Copyright,
} from "./SideBarStyled";
import logo from "../Assets/Logo.png";
import {
  RiDashboardLine,
  RiUser6Line,
} from "react-icons/ri";
import { useNavigate } from "react-router";

export function getLoggedUser() {
  let userString = localStorage.getItem("user");
  if (userString) {
    const user = JSON.parse(userString);
    return user

  }
}

export const SideBar = () => {
  const navigate = useNavigate();

  
    
    const clickHandler = () => {
        navigate(`empleados/usuario1@midwaytest.tech`);
    };

  return (
    <Wrapper>
      <Logo>
        <img src={logo} alt="logo" />
        <div>
          <h2>Midway</h2>
          <p>Employee Dashboard</p>
        </div>
      </Logo>
      <LinkContainer>
        <li>
          <MenuLink to="/">
            <RiDashboardLine /> Dashboard
          </MenuLink>
        </li>
        <li>
          <MenuLink to={`empleados/${getLoggedUser()}`}>
            <RiUser6Line />
            Empleado
          </MenuLink>
        </li>
      </LinkContainer>
      <User>
        <SideBarUserImage
          src={"https://randomuser.me/api/portraits/lego/1.jpg"}
          alt="logo"
        ></SideBarUserImage>
        <h5>{getLoggedUser().nombre}</h5>
        <p>{getLoggedUser().apellidos}</p>
        <p>{getLoggedUser().upn}</p>
        
      </User>

      <Copyright>
        <h6>Midway Employee Dashboard</h6>
        <p>2023 All Rights Reserved</p>
      </Copyright>
    </Wrapper>
  );
};
