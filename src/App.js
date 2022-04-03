import React, {useEffect } from 'react';
//import bridge from '@vkontakte/vk-bridge';
import { View, AdaptivityProvider, AppRoot } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import Home from './panels/Home';
import SelectDate from "./panels/SelectDate";
import SelectTime from "./panels/SelectTime";
import AdminPanel from "./panels/AdminPanel";
import {setDataBaseAC, setPopoutAC, setUserAC} from "./redux/homePage-reducer";
import {fetchUser} from "./function/vk-api";
import {getServerBase} from "./components/crud/crud";
import {setFirstNameAC, setLastNameAC} from "./redux/selectTime-reducer";

const App = props => {
	const activePanel = props.state.homepage.activePanel;
	const popout = props.state.homepage.popout;

	useEffect(() => {
		// bridge.subscribe(({ detail: { type, data }}) => {
		// 	if (type === 'VKWebAppUpdateConfig') {
		// 		const schemeAttribute = document.createAttribute('scheme');
		// 		schemeAttribute.value = data.scheme ? data.scheme : 'client_light';
		// 		document.body.attributes.setNamedItem(schemeAttribute);
		// 	}
		// });
		getServerBase().then((response) => {
			return props.dispatch(setDataBaseAC(response))
		})
		fetchUser().then((user) => {
			props.dispatch(setUserAC(user));
			props.dispatch(setFirstNameAC(user.first_name))
			props.dispatch(setLastNameAC(user.last_name))
			props.dispatch(setPopoutAC(null));
		})
			.catch(error => console.log(error.message));

	}, []);

	return (
		<AdaptivityProvider>
			<AppRoot >
				<View activePanel={activePanel} popout={popout}>
					<Home
						id='home'
						state={props.state}
						dispatch={props.dispatch}
					/>
					<SelectDate
						id='selectDate'
						state={props.state}
						dispatch={props.dispatch}
					/>
					<SelectTime
						id='selectedTime'
						state={props.state}
						dispatch={props.dispatch}
					/>
					<AdminPanel
						id='adminPanel'
					/>
				</View>

			</AppRoot>
		</AdaptivityProvider>
	);

}

export default App;
