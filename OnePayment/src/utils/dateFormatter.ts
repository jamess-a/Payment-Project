
type DateType = string | number | Date;

const DateFormatter = (date: DateType): string => {
  const formattedDate: string = new Date(date).toLocaleString("th-TH", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZone: "Asia/Bangkok",
  });

  return formattedDate;
};

export default DateFormatter;
