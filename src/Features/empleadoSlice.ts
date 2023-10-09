import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Empleado } from "../interfaces";
import { RootState } from "../app/store";
import { AxiosRequest } from "./API";

export const fetchEmpleados = createAsyncThunk<Empleado[], void>(
  "empleados/fetchEmpleados ",
  async () => {
    const res = await AxiosRequest("empleados", "GET", null);
    console.log(res);
    return res
  }
);

export const addEmpleado = createAsyncThunk<Empleado, Empleado>(
  "empleados/addEmpleado ",
  async (userObject) => {
    const res = await AxiosRequest("empleados", "POST", JSON.stringify(userObject));

    console.log(userObject);
    console.log(res);
    return await res;
  }
);

export const getEmpleado = createAsyncThunk<Empleado["upn"], Empleado["upn"]>(
  "empleados/getEmpleado ",
  async (userId: Empleado["upn"]) => {
    const res = await AxiosRequest(`empleados/${userId}`, "GET", undefined);
    return await res;
  }
);

export const deleteEmpleado = createAsyncThunk<Empleado["upn"], Empleado["upn"]>(
  "empleados/deleteEmpleado",
  async (userId: Empleado["upn"]) => {
    const res = await AxiosRequest(`empleados/${userId}`, "DELETE", undefined);
    return await res;
  }
);

export const editEmpleado = createAsyncThunk<Empleado, Empleado>(
  "empleado/editEmpleado",
  async (updatedUserObject: Empleado) => {
    const res = await AxiosRequest(`empleados/${updatedUserObject.upn}`, "PUT", JSON.stringify(updatedUserObject));
    console.log(updatedUserObject.upn);
    console.log(res);
    return await res;
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
    upn: "",
    password: "",
    nombre: "",
    apellidos: "",
    fechaNacimiento: "",
    responsable: "",
    rol: "" 
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
        state.EmpleadoListData.push(action.payload);
      })

      .addCase(deleteEmpleado.fulfilled, (state, action) => {
        state.EmpleadoListData = state.EmpleadoListData.filter(
          (item) => item.upn !== action.payload
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
          if (state.EmpleadoListData && state.EmpleadoListData[i].upn === action.payload.upn) {
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
