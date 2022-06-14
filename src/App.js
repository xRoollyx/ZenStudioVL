import React, {useEffect} from 'react';
import bridge from '@vkontakte/vk-bridge';
import {
	View,
	AppRoot,
	useAdaptivity,
	PanelHeader,
	SplitCol,
	ViewWidth,
	SplitLayout
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import Home from './panels/Home';
import SelectDate from "./panels/SelectDate";
import SelectTime from "./panels/SelectTime";
import AdminPanel from "./panels/AdminPanel";
import {setUserAC, setDataBaseAC, setPopoutAC, setAllowMessagesAC} from "./redux/main-reducer"
import {fetchUser} from "./function/vk-api";
import {getServerBase} from "./components/crud/crud";
import {setFirstNameAC, setLastNameAC} from "./redux/selectTime-reducer";


const App = props => {
	const { viewWidth } = useAdaptivity();
	const activePanel = props.state.main.activePanel;
	const popout = props.state.main.popout;

	useEffect(() => {
		bridge.subscribe(({ detail: { type, data }}) => {
			if (type === 'VKWebAppUpdateConfig') {
				const schemeAttribute = document.createAttribute('scheme');
				schemeAttribute.value = data.scheme ? data.scheme : 'client_light';
				document.body.attributes.setNamedItem(schemeAttribute);
			}
		});

		bridge.send("VKWebAppAllowMessagesFromGroup", {"group_id": 209480369})
			.then((res) => {
				props.dispatch(setAllowMessagesAC(res.result))
			})
			.catch((err) => {console.log(err)});


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
			<AppRoot >
				<SplitLayout popout={popout} header={<PanelHeader separator={false} />}>
					<SplitCol spaced={viewWidth && viewWidth > ViewWidth.MOBILE}>
						<View activePanel={activePanel} >
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
								state={props.state}
								dispatch={props.dispatch}
							/>
						</View>
					</SplitCol>
				</SplitLayout>


			</AppRoot>

	);

}

export default App;
