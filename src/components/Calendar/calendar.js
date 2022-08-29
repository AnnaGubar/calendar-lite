const DAYS_IN_WEEK = 7;
const DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

const Month = {
  January: 0,
  February: 1,
  March: 2,
  April: 3,
  May: 4,
  June: 5,
  July: 6,
  August: 7,
  September: 8,
  October: 9,
  Novermber: 10,
  December: 11,
};

export function getMonthData(year, month) {
  const date = new Date(year, month);

  const result = [];
  let day = 1;

  const daysInMonth = getDaysInMonth(date);// высчитывает высокосный февраль

  // формат Америки - Вс первый день недели 
  // const monthStartsOn = getDayOfweek(date.getDay); 
  const monthStartsOn = getDayOfweek(date);

  // месяц - цикл определяет сколько недель в месяце
  // monthStartsOn - с какого дня начинать разметку месяца
  //                      30       +     4          /      7       =   5 (недель)
  for (let i = 0; i < (daysInMonth + monthStartsOn) / DAYS_IN_WEEK; i++) {
    result[i] = [];

    // неделя
    for (let j = 0; j < DAYS_IN_WEEK; j++) {
      // первая неделя                       последняя
      if ((i === 0 && j < monthStartsOn) || day > daysInMonth) {
        // [i] - ряд(неделя), [j] - ячейка(день)
        result[i][j] = undefined;
      } else {
        result[i][j] = new Date(year, month, day++);
      }
    }
  }

  return result;
}

export function getDaysInMonth(date) {
  const month = date.getMonth();
  const daysInMonth = DAYS_IN_MONTH[month];

  // проверка на выосоксный год
  // если год высокосный и месяц февраль 
  if (isLeapYear(date.getFullYear()) && month === Month.February) {
    // в высокосном феврале 29 дней
    return daysInMonth + 1;
  } else {
    return daysInMonth;
  }
}

// высчитывает высокосный год
export function isLeapYear(year) {
  return !(year % 4 || (!(year % 100) && year % 400));
}

// делаем Пн первым днем недели (меняя индекс)
export function getDayOfweek(date) {
  const dayOfWeek = date.getDay();

  // 0 - Вс, 1 - Пн ...
  // Чтобы сделать Вс последним днем в неделе
  if (dayOfWeek === 0) return 6;

  // Пн (индекс 1) - 1 = первый день недели
  return dayOfWeek - 1;
}

// сравнение дат исключая сравнения секунд и миллисекунд
export function areEqual(a,b){
  if (!a || !b) return false;

  return (
      a.getFullYear() === b.getFullYear() &&
      a.getMonth() === b.getMonth() &&
      a.getDate() === b.getDate()
  );
}
