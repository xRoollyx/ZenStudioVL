import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import { View, ScreenSpinner, AdaptivityProvider, AppRoot } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import Home from './panels/Home';
import SelectDate from "./panels/SelectDate";
import SelectTime from "./panels/SelectTime";
import AdminPanel from "./panels/AdminPanel";
import {checkWithCurrentDate} from "./function/Function";
import {deleteBase, getBase, putBase, putSession, sendMessage} from "./function/Server";

const App = () => {
	const [activePanel, setActivePanel] = useState('home');
	const [fetchedUser, setUser] = useState(null);
	const [popout, setPopout] = useState(<ScreenSpinner size='large' />);
	const [selectedDate,setSelectedDate] = useState(new  Date());
	const [base, setBase] = useState(null)

	async function fetchData() {
		const data = await getBase()
		const id = Object.keys(data)
		setBase(data[id])
	}

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
		fetchUser().catch(error => console.log(error.message));

		fetchData().catch(error => console.log(error.message));
	}, []);


	const go = e => {
		setActivePanel(e.currentTarget.dataset.to);
	};

	function user(){
		fetchData().catch(error => console.log(error.message));
		setActivePanel("adminPanel");
	}

	function setMySession(date, time, saves) {
		let mySession = {...saves, mySession: !base[date][time].mySession}
		putSession(date, time, mySession).then(()=>{
			fetchData().catch(error => console.log(error.message));
			setActivePanel("adminPanel");
		}).catch(err => {console.log(err)})
	}

	function setNote(date, time, saveNote) {
		putSession(date, time, saveNote).then(()=>{
			fetchData().catch(error => console.log(error.message));
			setActivePanel("adminPanel");
		}).catch(err => {console.log(err)})
	}


	function updateBase(e) {
		setActivePanel("home")
		putBase(e).catch(error => console.log(error.message));
	}
	
	function deleteRecordFromBase(recordDate, recordTimeToDelete) {
		if (confirm("Вы уверенны?")){
			const message = 'Ваша запись на ' + recordDate + ' в ' + recordTimeToDelete + ' анулированна'
			sendMessage(base[recordDate][recordTimeToDelete].vk_ID, Math.random()*34567, message).catch(err => {
				console.log(err)})
			deleteBase(recordDate, recordTimeToDelete).then(()=>{
				fetchData().catch(error => console.log(error.message));
				setActivePanel("adminPanel")
			}).catch(err=>console.log(err))
		}
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
						updateBase={updateBase}
					/>
					<AdminPanel
						id='adminPanel'
						go={go}
						base={base}
						deleteRecordFromBase={deleteRecordFromBase}
						getMySession={setMySession}
						setNote={setNote}
					/>
				</View>

			</AppRoot>
		</AdaptivityProvider>
	);

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
}

export default App;
