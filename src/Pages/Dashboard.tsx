import { MdOutlineKingBed } from "react-icons/md";
import {
  HiOutlineArrowRightOnRectangle,
  HiOutlineArrowLeftOnRectangle,
  HiOutlineCalendarDays,
} from "react-icons/hi2";
import { KPI, KpiIcon, KpiRow, KpiText } from "./DashboardStyled";
import { useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "../app/hooks";

import NotFound from "./notfoundpage/notfoundpage";
import { Wrapper } from "../Components/LayoutStyled";
import { PropagateLoader } from "react-spinners";

export const Dashboard = () => {
  const dispatch = useAppDispatch();

  return (
    <>
      <KpiRow data-testid="dashboard__kpi">
        <KPI>
          <KpiIcon>
            <MdOutlineKingBed />
          </KpiIcon>
          <KpiText>
            <h2>8,454</h2>
            <h6>New Booking</h6>
          </KpiText>
        </KPI>
        <KPI>
          <KpiIcon>
            <HiOutlineCalendarDays />
          </KpiIcon>
          <KpiText>
            <h2>963</h2>
            <h6>Scheduled Room</h6>
          </KpiText>
        </KPI>
        <KPI>
          <KpiIcon>
            <HiOutlineArrowRightOnRectangle />
          </KpiIcon>
          <KpiText>
            <h2>753</h2>
            <h6>Check In</h6>
          </KpiText>
        </KPI>
        <KPI>
          <KpiIcon>
            <HiOutlineArrowLeftOnRectangle />
          </KpiIcon>
          <KpiText>
            <h2>516</h2>
            <h6>Check Out</h6>
          </KpiText>
        </KPI>
      </KpiRow>
    </>
  );
};
