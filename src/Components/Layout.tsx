import { Outlet, useLocation, useMatch } from "react-router-dom";
import { TopBar } from "./TopBar";
import { useState } from "react";
import { SideBar } from "./Sidebar";
import { Container, Content, LeftMenu, RightSection } from "./LayoutStyled";

export const Layout = () => {
  let location = useLocation();
  let employeeMatch = useMatch("/empleados/:upn");
  
  let title = "";
  const [open, setOpen] = useState(true);

  const titleChooser = () => {
    if (location.pathname === "/") {
      title = "Datos del Equipo";
    } else if(location.pathname === "/empleados") {
      title = "Empleados";
    } else if (employeeMatch != null && location.pathname === employeeMatch.pathname) {
      title = "Ficha Personal";
    }else if (location.pathname === "/organigrama") {
      title = "Organigrama";
    }

    return title;
  };

  return (
    <>
      <Container>
        <LeftMenu open={open}>
          <SideBar />
        </LeftMenu>
        <RightSection open={open}>
          <TopBar
            page={titleChooser()}
            showSideBar={setOpen}
            open={open}
          />
          <Content>
            <Outlet />
          </Content>
        </RightSection>
      </Container>
    </>
  );
};