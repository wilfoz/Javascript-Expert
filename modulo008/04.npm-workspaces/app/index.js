import DateUtil from "@wilfoz/date-util";

console.log(DateUtil.formatDate(new Date("2021-09-01"), "dd/mm/yyyy"));
console.log(DateUtil.formatString("2023-10-01", "yyyy-mm-dd", "dd/mm/yyyy"));
