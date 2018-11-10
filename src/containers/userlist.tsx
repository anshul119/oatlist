import * as React from 'react';
import Card from 'components/card';
import { IUserProps, IUser, User } from 'models/user';
import api from 'api';
import Styled from 'styled-components';
// import variables from 'style/variables';

interface IUserListState {
	userList: IUser[];
}

const ListWrapper = Styled.div`
	display: flex;
	flex-wrap: wrap;
`;

export default class UserList extends React.Component<{}, IUserListState> {
	state = {
		userList: []
	};
	renderUserList = () => {
		return this.state.userList.map((user: IUser) => {
			return <Card key={user.id} name={user.fullName} />;
		});
	};

	fetchUserList = (limit?: number, offset?: number) => {
		return api.user.fetchUsers({ limit, offset }).then((response: IUserProps[]) => {
			const userList = response.map((userProps: IUserProps) => {
				return new User(userProps);
			});
			this.setState({ userList });
		});
	};

	componentDidMount() {
		window.addEventListener('scroll', this.handleScroll);
		this.fetchUserList();
	}

	componentWillUnmount() {
		window.removeEventListener('scroll', this.handleScroll);
	}

	handleScroll() {
		if (window.innerHeight + document.documentElement!.scrollTop === document.documentElement!.offsetHeight) {
			console.log('fefrg');
			this.fetchUserList();
		}
	}

	render() {
		return <ListWrapper>{this.state.userList.length ? this.renderUserList() : <p>Loading...</p>}</ListWrapper>;
	}
}
