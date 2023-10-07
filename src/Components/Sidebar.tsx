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
  RiKey2Line,
  RiCalendarEventFill,
  RiUser6Line,
} from "react-icons/ri";
import { HiOutlineMail } from "react-icons/hi";
import { useNavigate } from "react-router";

export const SideBar = () => {
  const navigate = useNavigate();
    
    const clickHandler = () => {
        navigate(`/Empleados/usuario1@midwaytest.tech`);
    };

  return (
    <Wrapper>
      <Logo>
        <img src={logo} alt="logo" />
        <div>
          <h2>Midway</h2>
          <p>midway Employee Dashboard</p>
        </div>
      </Logo>
      <LinkContainer>
        <li>
          <MenuLink to="/">
            <RiDashboardLine /> Dashboard
          </MenuLink>
        </li>
        <li>
          <MenuLink to="/empleados">
            <RiUser6Line />
            Empleados
          </MenuLink>
        </li>
      </LinkContainer>
      <User>
        <SideBarUserImage
          src={"https://randomuser.me/api/portraits/lego/1.jpg"}
          alt="logo"
        ></SideBarUserImage>
        <h5>Admin</h5>
        <p>admin@admin.com</p>
        <button onClick={clickHandler}>Edit User</button>
      </User>

      <Copyright>
        <h6>Midway Employee Dashboard</h6>
        <p>2023 All Rights Reserved</p>
      </Copyright>
    </Wrapper>
  );
};
