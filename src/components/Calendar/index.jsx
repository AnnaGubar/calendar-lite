import { Component } from "react";
import classNames from "classnames";
import * as calendar from "./calendar";
import "./index.css";

export default class Calendar extends Component {
  static defaultProps = {
    date: new Date(),
    // для динамичной отрисовки лет
    years: [
      2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021,
      2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030,
    ],
    // для динамичной отрисовки месяцев
    monthNames: [
      "Январь",
      "Февраль",
      "Март",
      "Апрель",
      "Май",
      "Июнь",
      "Июль",
      "Август",
      "Сентябрь",
      "Октябрь",
      "Ноябрь",
      "Декабрь",
    ],
    // для динамичной отрисовки дней
    weekDayNames: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"],
    onChange: Function.prototype,
  };

  state = {
    date: this.props.date,
    currentDate: new Date(),
    selectedDate: null,
  };

  get year() {
    return this.state.date.getFullYear(); // метод new Date()
  }
  get month() {
    return this.state.date.getMonth(); // метод new Date()
  }
  get day() {
    return this.state.date.getDate(); // метод new Date()
  }

  handlePrevMonthButtonClick = () => {
    const date = new Date(this.year, this.month - 1);
    // console.log("PrevMonth - ", date);

    this.setState({ date });
  };

  handleNextMonthButtonClick = () => {
    const date = new Date(this.year, this.month + 1);
    // console.log("NextMonth - ", date);

    this.setState({ date });
  };

  handleSelectChange = () => {
    const year = this.yearSelect.value; // получаем выбранный пользователем год
    const month = this.monthSelect.value; // получаем выбранный пользователем месяц

    const date = new Date(year, month);

    // console.log(date)

    this.setState({ date });
  };

  handleDayClick = (date) => {
    // console.log(date) // клик по выбранному дню

    this.setState({ selectedDate: date });
    this.props.onChange(date);
  };

  render() {
    const { years, monthNames, weekDayNames } = this.props;
    const { currentDate, selectedDate } = this.state;
    const monthData = calendar.getMonthData(this.year, this.month);
    return (
      <div className="calendar">
        <header>
          <button onClick={this.handlePrevMonthButtonClick}>{"<"}</button>

          {/* разметка месяца */}
          <select
            ref={(element) => (this.monthSelect = element)} // доступ к dom-елементу
            value={this.month} // value делает форму контролируемой
            onChange={this.handleSelectChange}
          >
            {monthNames.map((name, index) => (
              <option key={name} value={index}>
                {name}
              </option>
            ))}
          </select>

          {/* разметка года */}
          <select
            ref={(element) => (this.yearSelect = element)}  // доступ к dom-елементу
            value={this.year} // value делает форму контролируемой
            onChange={this.handleSelectChange}
          >
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>

          <button onClick={this.handleNextMonthButtonClick}>{">"}</button>
        </header>

        <table>
          {/* разметка названий дней */}
          <thead>
            <tr>
              {weekDayNames.map((name) => (
                <th key={name}>{name}</th>
              ))}
            </tr>
          </thead>

          {/* разметка дней месяца */}
          <tbody>
            {monthData.map((week, index) => (
              <tr key={index} className="week">
                {week.map((date, index) =>
                  date ? (
                    <td
                      key={index}
                      className={classNames("day", {
                        "today": calendar.areEqual(date, currentDate), // подсветка синим цветом
                        "selected": calendar.areEqual(date, selectedDate), // подсветка синей рамкой
                      })}
                      onClick={() => this.handleDayClick(date)}
                    >
                      {date.getDate()}
                    </td>
                  ) : (
                    <td key={index}></td>
                  )
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
