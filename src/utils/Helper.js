

const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function getNext7Days() {
  const today = new Date();
  const next7Days = [];

  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);

    const dayObject = {
      dayName: daysOfWeek[date.getDay()],
      date: date.toISOString().split('T')[0],
    };

    next7Days.push(dayObject);
  }

  return next7Days;
}

function getFormattedDate() {
  const today = new Date();

  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
  const day = String(today.getDate()).padStart(2, "0");

  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
}



function generateRandomAroundNumber(centerNumber, range = 1) {
  const min = centerNumber - range;
  const max = centerNumber + range;

  const randomAroundNumber = Math.floor(Math.random() * (max - min + 1)) + min;

  return randomAroundNumber;
}


export { getNext7Days, getFormattedDate, daysOfWeek, generateRandomAroundNumber};
