import styled from "styled-components";

export const KpiRow = styled.div`
  display: flex;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 24px;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 32px;
`;

export const KPI = styled.div`
  height: 70px;
  width: 300px;
  display: flex;

  align-items: center;
  gap: 16px;
  padding: 16px 16px;
  background-color: #ffffff;
  box-shadow: 0px 4px 4px #00000005;
  border-radius: 12px;

  &:hover {
    scale: 1.1;
  }
`;

export const KpiIcon = styled.div`
  width: 55px;
  height: 55px;
  background: #ffedec;
  border-radius: 8px;
  color: #e23428;
  font-size: 32px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: #ffedec;
    background-color: #e23428;
  }
`;

export const KpiText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3.2px;
  margin: 0;
  h2 {
    text-align: left;
    font-weight: 600;
    font-size: 20px;
    font-family: "Poppins";
    color: #393939;
    margin: 0;
  }

  h6 {
    text-align: left;
    font-weight: 300;
    font-size: 10px;
    font-family: "Poppins";
    color: #787878;
    margin: 0;
  }
`;

export const CalendarRow = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 50% 50%;
  grid-column-gap: 20%;
  margin-bottom: 48px;
`;

export const BookingCalendar = styled.div`
  background-color: #ffffff;
  box-shadow: 0px 4px 4px #00000005;
  border-radius: 20px;
  padding: 32px 16px;

  .fc {
    max-height: 600px;
  }
  .fc-button {
    font-family: "Poppins";
    background-color: transparent;
    color: #393939;
    font-weight: 500;
    font-size: 16px;
    border: none;
  }

  .fc-titleCustom-button {
    font-family: "Poppins";
    background-color: transparent;
    color: #393939;
    font-weight: 500;
    font-size: 12px;
    border: none;
  }
  .fc-titleCustom-button:hover {
    font-family: "Poppins";
    background-color: transparent;
    color: #393939;
    font-weight: 500;
    font-size: 12px;
    border: none;
    cursor: default;
  }

  .fc-toolbar-title {
    font-family: "Poppins";
    background-color: transparent;
    color: #393939;
    font-weight: 500;
    font-size: 12px;
  }

  .fc .fc-toolbar {
    gap: 8px;
  }

  .fc-toolbar-chunk {
    div {
      display: flex;
      flex-direction: row;
      gap: 16px;
    }
  }
  .fc-dayGridMonth-view {
    table {
      border: none;
    }
    th {
      border: none;
      height: 40px;
    }
    td {
      border: none;
    }
  }

  table {
    border: none;
  }
  colgroup {
    width: auto;
  }

  .fc .fc-daygrid-day.fc-day-today {
    background-color: #ff9c3a65;
    border-radius: 12px;
  }

  .fc-day,
  .fc-day-sat,
  .fc-day-future,
  .fc-daygrid-day {
    text-align: center;
  }
  .fc-direction-ltr .fc-daygrid-event.fc-event-end,
  .fc-direction-rtl .fc-daygrid-event.fc-event-start {
    border-radius: 8px;
    border: none;
    padding: 3.2px;
  }
  .fc-direction-ltr .fc-daygrid-event.fc-event-start,
  .fc-direction-rtl .fc-daygrid-event.fc-event-end {
    border-radius: 8px;
    border: none;
    padding: 3.2px;
  }
  .fc-event {
    background-color: #ebd90d;
  }

  .fc-event:hover {
    scale: 1.1;
    cursor: pointer;
  }

  .fc-event-future {
    background-color: #5ad07a;
  }

  .fc-event-past {
    background-color: #e23428;
  }
`;
export const LastBookings = styled.table`
  width: 100%;
  background-color: #ffffff;
  box-shadow: 0px 4px 4px #00000005;
  border-radius: 20px;
  padding: 32px 2%;
`;

export const ViewMore = styled.tr`
  width: 100%;
  height: 48px;
  padding-left: 40%;
  padding-right: 40%;
`;

export const ViewMoreButton = styled.button`
  color: #135846;
  font-size: 14px;
  font-weight: 600;
  font-family: "Poppins";
  background-color: transparent;
  border: none;
  &:hover {
    cursor: pointer;
    scale: 1.1;
  }
`;
