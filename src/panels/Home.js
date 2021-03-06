import PropTypes from 'prop-types';

import { Panel, PanelHeader, Header, Button, Group, Cell, Div, Avatar } from '@vkontakte/vkui';

const Home = ({ id, go, fetchedUser, user, isAdmin, resetData}) => {

	function message(){
		console.log(fetchedUser.id)
	}

	return (
	<Panel id={id}>
		<PanelHeader>Фотостудия ZEN</PanelHeader>
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
				<Button stretched size="m" mode="secondary" onClick={go} data-to="selectDate">
					Выберите дату записи
				</Button>
				{isAdmin?<Button stretched size="m" mode="secondary" onClick={user} data-to="adminPanel">
					Календарь занятости
				</Button>:null}
				<Button stretched size="m" mode="secondary" onClick={message} data-to="home">
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
