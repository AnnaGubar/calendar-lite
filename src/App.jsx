import React from 'react';
import Calendar from './components/Calendar';

export default class App extends React.Component {
	state = {
		date: null
	};

  // для строки "Выбранная дата"
	handleDateChange = date => this.setState({ date });

	render() {
		const { date } = this.state;

		return (
			<div>
				{date && <p>Выбранная дата: {date.toLocaleDateString()}</p>}

				<Calendar
					onChange={this.handleDateChange}
				/>
			</div>
		);
	}
}
