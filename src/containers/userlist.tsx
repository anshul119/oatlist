import * as React from 'react';
import Card from 'components/card';
import { IUserProps, IUser, User } from 'models/user';
import api from 'api';
import Styled from 'styled-components';
// import variables from 'style/variables';

interface IUserListState {
	currentOffset: number;
	userList: IUser[];
	hasMore: boolean;
}

const ListWrapper = Styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
`;

const Text = Styled.p`
	font-size: 24px;
	text-align: center;
`;

const Button = Styled.div`
	border: 2px solid #2c3e50;
	padding: 5px 25px;
	font-size: 18px;
	cursor: pointer;
	color: white;
	background: #34495e;
	max-width: 100px;
	margin: 20px auto;
	text-align: center;
`;

export default class UserList extends React.Component<{}, IUserListState> {
	limit: number = 20;

	state = {
		currentOffset: 0,
		userList: [],
		hasMore: true
	};

	fetchUserList = (limit?: number, offset?: number) => {
		return api.user.fetchUsers({ limit, offset }).then((response: IUserProps[]) => {
			const newUserList = response.map((userProps: IUserProps) => {
				return new User(userProps);
			});
			if (newUserList.length) {
				this.setState(prevState => ({
					currentOffset: prevState.userList.length + this.limit,
					userList: prevState.userList.concat(newUserList)
				}));
			} else {
				this.setState({ hasMore: false });
			}
		});
	};

	renderUserList = () => {
		return this.state.userList.map((user: IUser) => {
			return <Card key={user.id} name={user.fullName} />;
		});
	};

	loadUsers = () => {
		this.fetchUserList(this.limit, this.state.currentOffset);
	};

	renderLoadMoreButton = () => {
		return this.state.hasMore ? (
			<Button onClick={this.loadUsers}>Load More</Button>
		) : (
			<Text>Thats all for now Folks.</Text>
		);
	};

	componentDidMount() {
		this.loadUsers();
	}

	render() {
		const isLoading = !this.state.userList.length;
		return (
			<React.Fragment>
				<ListWrapper>{isLoading ? <Text>Loading...</Text> : this.renderUserList()}</ListWrapper>
				{isLoading ? null : this.renderLoadMoreButton()}
			</React.Fragment>
		);
	}
}
