import moment from "moment";

export const formatServerTime = (value, paterrn = "HH:mm MM-DD-YYYY") => {
  return moment.utc(value).format(paterrn);
};
export const toLocalTime = (serverTime, paterrn = "HH:mm DD/MM/YYYY") => {
  if (!serverTime) return null;
  if (!moment.utc(serverTime).isValid()) {
    return null;
  }
  return moment.utc(serverTime).local().format(paterrn);
};
