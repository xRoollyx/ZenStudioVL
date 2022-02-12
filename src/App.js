import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import { View, ScreenSpinner, AdaptivityProvider, AppRoot } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import Home from './panels/Home';
import SelectDate from "./panels/SelectDate";
import SelectTime from "./panels/SelectTime";
import {checkWithCurrentDate} from "./function/Function";
import {getBase} from "./base/base";
import {getBaseTest, postBaseTest, putBaseTest} from "./function/server";

const App = () => {
	const [activePanel, setActivePanel] = useState('home');
	const [fetchedUser, setUser] = useState(null);
	const [popout, setPopout] = useState(<ScreenSpinner size='large' />);
	const [selectedDate,setSelectedDate] = useState(new  Date());
	const [base, setBase] = useState(getBase())
	const [testBase, setTestBase] = useState(null)

	useEffect(() => {
		bridge.subscribe(({ detail: { type, data }}) => {
			if (type === 'VKWebAppUpdateConfig') {
				const schemeAttribute = document.createAttribute('scheme');
				schemeAttribute.value = data.scheme ? data.scheme : 'client_light';
				document.body.attributes.setNamedItem(schemeAttribute);
			}
		});
		async function fetchUser() {
			const user = await bridge.send('VKWebAppGetUserInfo');
			setUser(user);
			setPopout(null);
		}
		fetchUser();

		async function fetchData() {
			const data = await getBaseTest()
			setTestBase(data)
		}

		fetchData();
	}, []);

	function user(){
		console.log(testBase)
		const tt =Object.keys(testBase)
		const rr = {...testBase[tt]}
		console.log(rr)

	}

	const go = e => {
		setActivePanel(e.currentTarget.dataset.to);
	};

	function handlePrevMonthButtonClick (e) {
			setSelectedDate(checkWithCurrentDate(new Date(e.getFullYear(), e.getMonth() - 1, e.getDate())))
	}
	function handleNextMonthButtonClick (e) {
		setSelectedDate(new Date(e.getFullYear(), e.getMonth() + 1, e.getDate()))
	}
	function handleSelectMonth (e) {
		setSelectedDate(checkWithCurrentDate(new Date(selectedDate.getFullYear(), e.target.value, selectedDate.getDate())))
	}
	function handleSelectYear (e) {
		setSelectedDate(checkWithCurrentDate(new Date(e.target.value, selectedDate.getMonth(), selectedDate.getDate())))

	}
	function handleSelectDay (e) {
		const tempDay = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), e.getDate())
		setSelectedDate(tempDay)
	}
	function selectBase(e) {
		setActivePanel("home")
		putBaseTest(e)
		console.log(e)
	}

	return (
		<AdaptivityProvider>
			<AppRoot>
				<View activePanel={activePanel} popout={popout}>
					<Home
						fetchedUser={fetchedUser}
						id='home'
						go={go}
						user={user}
					/>
					<SelectDate
						selectedDate = {selectedDate}
						id='selectDate'
						go={go}
						handlePrevMonthButtonClick={handlePrevMonthButtonClick}
						handleNextMonthButtonClick={handleNextMonthButtonClick}
						handleSelectMonth={handleSelectMonth}
						handleSelectYear={handleSelectYear}
						onChange={handleSelectDay}
					/>
					<SelectTime
						id='selectedTime'
						go={go}
						base={base}
						selectedDate={selectedDate}
						fetchedUser={fetchedUser}
						selectBase={selectBase}
					/>
				</View>

			</AppRoot>
		</AdaptivityProvider>
	);
}

export default App;
