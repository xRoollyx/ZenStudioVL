import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import { View, ScreenSpinner, AdaptivityProvider, AppRoot } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import Home from './panels/Home';
import SelectDate from "./panels/SelectDate";
import SelectTime from "./panels/SelectTime";
import AdminPanel from "./panels/AdminPanel";

const App = props => {
	const [activePanel, setActivePanel] = useState('home');
	const [fetchedUser, setUser] = useState(null);
	const [popout, setPopout] = useState(<ScreenSpinner size='large' />);





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


	}, []);


	const go = e => {
		setActivePanel(e.currentTarget.dataset.to);
	};


	return (
		<AdaptivityProvider>
			<AppRoot >
				<View activePanel={activePanel} popout={popout}>
					<Home
						id='home'
						go={go}
					/>
					<SelectDate
						id='selectDate'
						go={go}
						store={props.store.selectDatePage}
						selectedDate={props.store.selectedDate}

					/>
					<SelectTime
						id='selectedTime'
						go={go}
						data={props.store.data}

					/>
					<AdminPanel
						id='adminPanel'
						go={go}
					/>
				</View>

			</AppRoot>
		</AdaptivityProvider>
	);

}

export default App;
