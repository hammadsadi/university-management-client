export const monthsList: string[] = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const monthsOptions = monthsList.map((month: string) => ({
  value: month,
  label: month,
}));

export const courseStatus = ["UPCOMING", "ONGOING", "ENDED"];
