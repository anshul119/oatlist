import * as React from 'react';
import Header from 'components/header';
import { createGlobalStyle } from 'styled-components';
import variables from 'style/variables';
import UserList from 'containers/userlist';

//Defining global styles
const GlobalStyle = createGlobalStyle`
	html * {
		font-family: 'Playfair Display';
		color: ${variables.primaryColor};
	}
	body {
		margin: 0;
	}
`;

export default class App extends React.Component<{}, {}> {
	render() {
		return (
			<React.Fragment>
				<GlobalStyle />
				<Header />
				<UserList />
			</React.Fragment>
		);
	}
}
