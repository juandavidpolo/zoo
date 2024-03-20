const { DateTime } = require("luxon");

export const formatDateTime = (datetime) =>{
  const localTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const timestamp = DateTime.fromISO(datetime, { zone: 'utc' });
  const localTime = timestamp.toLocal();
  const formattedLocalTime = localTime.toFormat('yyyy-MM-dd hh:mm:ss a');
  return formattedLocalTime
}

export const formatAge = (age) => {

  const years = Math.floor(age / 365.25);
  const remainingDays = age % 365.25;
  const months = Math.floor(remainingDays / 30.4375);
  const daysLeft = Math.floor(remainingDays % 30.4375);

  return `${years} years, ${months} months, and ${daysLeft} days`
}