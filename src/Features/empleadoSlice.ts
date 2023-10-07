import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Empleado } from "../interfaces";
import { RootState } from "../app/store";
import { CrossFetch } from "./API";

export const fetchEmpleados = createAsyncThunk<Empleado[], void>(
  "Empleados/fetchEmpleados ",
  async () => {
    const res = await CrossFetch("Empleados", "GET", null);
    return res.data;
  }
);

export const addEmpleado = createAsyncThunk<Empleado, Empleado>(
  "Empleados/addEmpleado ",
  async (userObject) => {
    const res = await CrossFetch("Empleado", "POST", JSON.stringify(userObject));

    console.log(userObject);
    console.log(res);
    return await res.data;
  }
);

export const getEmpleado = createAsyncThunk<Empleado["UPN"], Empleado["UPN"]>(
  "Empleados/getEmpleado ",
  async (userId: Empleado["UPN"]) => {
    const res = await CrossFetch(`Empleados/${userId}`, "GET", undefined);
    return await res.data;
  }
);

export const deleteEmpleado = createAsyncThunk<Empleado["UPN"], Empleado["UPN"]>(
  "Empleados/deleteEmpleado",
  async (userId: Empleado["UPN"]) => {
    const res = await CrossFetch(`Empleados/${userId}`, "DELETE", undefined);
    return await res.data;
  }
);

export const editEmpleado = createAsyncThunk<Empleado, Empleado>(
  "Empleado/editEmpleado",
  async (updatedUserObject: Empleado) => {
    const res = await CrossFetch(`users/${updatedUserObject.UPN}`, "PUT", JSON.stringify(updatedUserObject));
    console.log(updatedUserObject.UPN);
    console.log(res);
    return await res.data;
  }
);

export interface UsersState {
  EmpleadoListData: Empleado[];
  status: string;
  singleEmpleadoData: Empleado;
  singleEmpleadoStatus: string;
}
export interface actionInterface {
  payload: any;
  type: string;
}

const initialState: UsersState = {
  EmpleadoListData: [],
  status: "idle",
  singleEmpleadoData: {
    UPN: "",
    password: "",
    Nombre: "",
    Apellidos: "",
    FechaNacimiento: "",
    Responsable: "",
    Rol: "" 
  },
  singleEmpleadoStatus: "idle",
};

export const empleadosSlice = createSlice({
  name: "empleados",
  initialState,

  reducers: {},

  extraReducers(builder) {
    builder
      .addCase(fetchEmpleados.rejected, (state: UsersState) => {
        state.status = "rejected";
      })
      .addCase(fetchEmpleados.pending, (state: UsersState) => {
        state.status = "pending";
      })
      .addCase(fetchEmpleados.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.EmpleadoListData = action.payload;
      })

      .addCase(addEmpleado.rejected, (state: UsersState) => {
        state.status = "rejected";
      })
      .addCase(addEmpleado.pending, (state: UsersState) => {
        state.status = "pending";
      })
      .addCase(addEmpleado.fulfilled, (state, action) => {
        const lastId = parseInt(
          state.EmpleadoListData[state.EmpleadoListData.length - 1].UPN.slice(2)
        );
        action.payload.UPN = "U-" + (lastId + 1).toString().padStart(4, "0");
        state.EmpleadoListData.push(action.payload);
      })

      .addCase(deleteEmpleado.fulfilled, (state, action) => {
        state.EmpleadoListData = state.EmpleadoListData.filter(
          (item) => item.UPN !== action.payload
        );
        state.status = "fullfilled";
      })

      .addCase(deleteEmpleado.pending, (state) => {
        state.status = "pending";
      })

      .addCase(getEmpleado.fulfilled, (state, action: actionInterface) => {
        state.singleEmpleadoStatus = "fullfilled";
        state.singleEmpleadoData = action.payload;
      })

      .addCase(getEmpleado.pending, (state) => {
        state.singleEmpleadoStatus = "pending";
      })

      .addCase(editEmpleado.fulfilled, (state, action) => {
        state.status = "fulfilled";
        for (let i = 0; i < state.EmpleadoListData.length; i++) {
          if (state.EmpleadoListData[i].UPN === action.payload.UPN) {
            state.EmpleadoListData[i] = action.payload;
            state.singleEmpleadoData = action.payload;
            return;
          }
        }
      })

      .addCase(editEmpleado.pending, (state: UsersState) => {
        state.status = "pending";
      });
  },
});

export const getEmpleadosData = (state: RootState) => state.Empleados.EmpleadoListData;
export const getEmpleadosSingle = (state: RootState) => state.Empleados.singleEmpleadoData;
export const getSingleEmpleadoStatus = (state: RootState) => state.Empleados.singleEmpleadoStatus;
export const getEmpleadosStatus = (state: RootState) => state.Empleados.status;

export default empleadosSlice.reducer;
