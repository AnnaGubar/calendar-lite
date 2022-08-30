// --- new Date() ---

const newDate = new Date();
console.log("⭐ ~ newDate", newDate); // текущая дата

const year = newDate.getFullYear();
console.log("⭐ ~ year", year); // текущий год

// месяца от 0 до 11
const month = newDate.getMonth();
console.log("⭐ ~ month", month); // текущий месяц - 1

const dayNum = newDate.getDate();
console.log("⭐ ~ dayNum", dayNum); // текущее число дня

// необходимые параметры - год и месяц
const selectedDate = new Date(2019, 8);
console.log("⭐ ~ selectedDate", selectedDate);

// неделя начинается с ВС под индексом 0
const indexDayInWeek = new Date(2022, 7, 21).getDay();
console.log("⭐ ~ indexDayInWeek", indexDayInWeek); // Вс

//***   --- Unix время ---
console.log("--- Unix время ---")
// отсчет с 1 января 1970 года в часовом поясе UTC

console.log("⭐ ~ 0 - ", new Date(0)); // Thu Jan 01 1970 03:00:00 GMT+0300

console.log("⭐ ~ 15000 - ", new Date(15000)); // Thu Jan 01 1970 03:00:15 GMT+0300

// отсчет от Jan 01 1970 в миллисекундах
console.log("⭐ ~ getTime - ", new Date().getTime()); // 1661848729922

