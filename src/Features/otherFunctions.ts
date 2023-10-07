export const dateConverter = (dateToConver: string) => {
  const fecha = new Date(dateToConver);

  const opcionesFecha: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  const opcionesHora: Intl.DateTimeFormatOptions = {
    hour12: true,
    hour: "numeric",
    minute: "numeric",
  };

  const fechaString = fecha.toLocaleDateString("en-US", opcionesFecha);
  const horaString = fecha.toLocaleTimeString("en-US", opcionesHora);

  return {
    date: fechaString,
    hour: horaString,
  };
};


export function getTodayString() {
  const today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth() + 1;
  const yyyy = today.getFullYear();
  let day = dd.toString();
  let month = mm.toString();
  let year = yyyy.toString();

  if (dd < 10) {
    day = "0" + day;
  }

  if (mm < 10) {
    month = "0" + month;
  }

  return year + "-" + month + "-" + day;
}


