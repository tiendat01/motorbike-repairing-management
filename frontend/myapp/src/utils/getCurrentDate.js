const newDate = new Date();

export function getCurrentFullDate(separator = "") {
  const date = newDate.getDate();
  const month = newDate.getMonth() + 1;
  const year = newDate.getFullYear();

  return `${year}${separator}${
    month < 10 ? `0${month}` : `${month}`
  }${separator}${date < 10 ? `0${date}` : `${date}`}`;
}

export function getCurrentDate() {
  return newDate.getDate();
}

export function getCurrentMonth() {
  return newDate.getMonth() + 1;
}

export function getCurrentYear() {
  return newDate.getFullYear();
}

export function formatDateTime(value) {
  if (value) {
    if (value.includes(" ")) {
      const [datePart, timePart] = value.split(" ");
      const [date, month, year] = datePart.split("-");
      // eslint-disable-next-line no-unused-vars
      const [hours, minutes, seconds] = timePart.split(":");

      return `${year}-${month}-${date}T${hours}:${minutes}`;
    } else return value;
  } else return;
}
