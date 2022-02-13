import React from 'react';
import PropTypes from 'prop-types';

import { Panel, PanelHeader, Header, Button, Group, Cell, Div, Avatar } from '@vkontakte/vkui';


const Home = ({ id, go, fetchedUser, user}) => {

	function message(){
		//sendMessage()
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
