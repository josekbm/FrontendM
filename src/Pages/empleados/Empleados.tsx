import {
  getEmpleadosStatus,
  getEmpleadosData,
  fetchEmpleados,
} from "../../Features/empleadoSlice";
import { useEffect, useState } from "react";
import { Button, StatusButton } from "../../Components/Button";
import {
  CustomDropdown,
  ImageItem,
  LeftActions,
  RightActions,
  SearchBar,
  StyledLink,
  TableActions,
  TableItem,
  TableLink,
  UserTableImage,
  TableRow,
  TableContainer,
  TableTitle,
} from "../../Components/TableStyled";
import { Modal } from "../../Components/Modal";
import { dateConverter } from "../../Features/otherFunctions";
import { AiOutlineInfoCircle, AiOutlineSearch } from "react-icons/ai";
import { VscTrash } from "react-icons/vsc";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import NotFound from "../notfoundpage/notfoundpage";
import { Wrapper } from "../../Components/LayoutStyled";
import PropagateLoader from "react-spinners/PropagateLoader";

export const Empleados = () => {
  const dispatch = useAppDispatch();
  const empleadosStatus = useAppSelector(getEmpleadosStatus);
  const empleadosData = useAppSelector(getEmpleadosData);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showAll, setShowAll] = useState("true");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [targetId, setTargetId] = useState("");
  const [tableData, setTableData] = useState(empleadosData);
  const [orderValue, setOrderValue] = useState("ID");

  const tableTitles = [
    "Name",
    "Start Date",
    "Description",
    "Contact",
    "Status",
    "Details",
    "Delete",
  ];

  const options = ["Date", "Name", "ID"];

  useEffect(() => {
    if (empleadosStatus === "idle") {
      dispatch(fetchEmpleados());
    }
    setTableData(empleadosData);
  }, [dispatch, empleadosStatus, empleadosData]);

  /*const onClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    const input = e.target as HTMLElement;
    const option = input.innerText;
    if (option === "All users") {
      setShowAll("true");
      setShowActive("false");
      setShowInactive("false");
      setOrderValue("ID");
      setTableData(usersData);
    } else if (option === "Active users") {
      setShowActive("true");
      setShowAll("false");
      setShowInactive("false");
      setOrderValue("ID");
      setTableData(empleadosData.filter((user) => user.state === "ACTIVE"));
    } else if (option === "Inactive users") {
      setShowActive("false");
      setShowAll("false");
      setShowInactive("true");
      setOrderValue("ID");
      setTableData(usersData.filter((user) => user.state === "INACTIVE"));
    }
  };*/

  /*const onSearchInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTableData(
      tableData.filter((user) =>
        Empleados.Nombre.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
    if (e.target.value === "") {
      if (showAll === "true") {
        setTableData(usersData);
      }
      if (showActive === "true") {
        setTableData(usersData.filter((user) => user.state === "ACTIVE"));
      }
      if (showInactive === "true") {
        setTableData(usersData.filter((user) => user.state === "INACTIVE"));
      }
    }
  };*/

  /*const onChangeHandler = (e: any) => {
    const option = e.value;
    console.log(option);
    if (option === "ID") {
      setTableData(empleadossData);
    }
    if (option === "Name") {
      setOrderValue("Name");
      setTableData(
        [...tableData].sort((a, b) => {
          if (a.name < b.name) return -1;
          if (a.name > b.name) return 1;
          return 0;
        })
      );
    }
    if (option === "Date") {
      setOrderValue("Date");
      setTableData(
        [...tableData].sort((a, b) => {
          if (a.startDate < b.startDate) return -1;
          if (a.startDate > b.startDate) return 1;
          return 0;
        })
      );
    }
  };*/

  if (empleadosStatus === "pending") {
    return (
      <>
        <Wrapper>
          <PropagateLoader color="#407957" size={15} />
        </Wrapper>
      </>
    );
  } else {
    if (empleadosStatus === "fulfilled" && tableData.length > 0) {
      return (
        <>
          <TableContainer>
            <thead>
              <TableTitle>
                {tableTitles.map((element) => (
                  <th key={tableTitles.indexOf(element)}>{element}</th>
                ))}
              </TableTitle>
            </thead>
            <tbody>
              {tableData.map((element) => (
                <TableRow key={element.UPN}>
                  <TableItem>
                    <ImageItem user>
                      <UserTableImage src="https://randomEmpleado.me/api/portraits/lego/5.jpg" alt="user" />

                      <div>
                        {element.Nombre}
                        <p>{element.UPN}</p>
                      </div>
                    </ImageItem>
                  </TableItem>
                  <TableItem>
                    {dateConverter(element.FechaNacimiento).date}
                    <p>{dateConverter(element.FechaNacimiento).hour}</p>
                  </TableItem>
                  <TableItem>
                    <p>{element.Responsable}</p>
                    <p>{element.UPN}</p>
                  </TableItem>
                  <TableItem>
                    <StyledLink to={`/empleados/${element.UPN}`}>
                      <AiOutlineInfoCircle />
                    </StyledLink>
                  </TableItem>
                  <TableItem>
                    <VscTrash
                      onClick={() => {
                        setShowDeleteModal(true);
                        setTargetId(element.UPN);
                      }}
                    />
                  </TableItem>
                </TableRow>
              ))}
            </tbody>
          </TableContainer>
          <Modal
            mode="delete"
            page={"empleados"}
            showDeleteModal={showDeleteModal}
            setShowDeleteModal={setShowDeleteModal}
            itemId={targetId}
          />

          <Modal
            mode="create"
            page={"empleados"}
            setShowCreateModal={setShowCreateModal}
            showCreateModal={showCreateModal}
          />
        </>
      );
    } else {
      return <NotFound />;
    }
  }
};
