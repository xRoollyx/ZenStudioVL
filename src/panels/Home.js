import React from 'react';
import PropTypes from 'prop-types';
import jQuery from 'jquery'

import { Panel, PanelHeader, Header, Button, Group, Cell, Div, Avatar } from '@vkontakte/vkui';
import axios from "axios";


const Home = ({ id, go, fetchedUser, user}) => {

	function message(){
	 // jQuery.ajax(`https://api.vk.com/method/messages.send?user_id=54506803&random_id=1111112&message=TEST&access_token=85cf29a79eee820080bed713566a0b52dd415d6d889f13d33641b8bca4799769b7f58dd9e9d6b616b2f7f&v=5.131`)
		const response =  axios.get(`https://api.vk.com/method/messages.send?user_id=54506803&random_id=1111122&message=TEST2&access_token=85cf29a79eee820080bed713566a0b52dd415d6d889f13d33641b8bca4799769b7f58dd9e9d6b616b2f7f&v=5.131`)
		console.log(response)
		//XMLHttpRequest.handleError (https://192.168.0.104:10888/static/js/vendors~main.chunk.js:108115:14)
		// config: {transitional: {…}, transformRequest: Array(1), transformResponse: Array(1), timeout: 0, adapter: ƒ, …}
	}


	return (
	<Panel id={id}>
		<PanelHeader>Example</PanelHeader>
		{fetchedUser && <Group header={<Header mode="secondary">User Data Fetched with VK Bridge</Header>}>
			<Cell
				before={fetchedUser.photo_200 ? <Avatar src={fetchedUser.photo_200}/> : null}
				description={fetchedUser.city && fetchedUser.city.title ? fetchedUser.city.title : ''}
			>
				{`${fetchedUser.first_name} ${fetchedUser.last_name}`}
			</Cell>
		</Group>}

		<Group header={<Header mode="secondary">Navigation Example</Header>}>
			<Div>
				<Button stretched size="l" mode="secondary" onClick={go} data-to="selectDate">
					Выберите дату записи
				</Button>
				<Button stretched size="l" mode="secondary" onClick={user} data-to="adminPanel">
					Календарь занятости
				</Button>
				<Button stretched size="l" mode="secondary" onClick={message} data-to="home">
					Сообщение
				</Button>
			</Div>
		</Group>
	</Panel>
)};

Home.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
	fetchedUser: PropTypes.shape({
		photo_200: PropTypes.string,
		first_name: PropTypes.string,
		last_name: PropTypes.string,
		city: PropTypes.shape({
			title: PropTypes.string,
		}),
	}),
};

export default Home;
