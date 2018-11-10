import * as React from 'react';
import Styled from 'styled-components';
const LogoUrl = require('assets/logo.png');

const StyledHeader = Styled.header`
	height: 72px;
	width: 100%;
	display: flex;
	justify-content: center;
`;

const Logo = Styled.img`
	height: 100%;
`;

const Header: React.StatelessComponent<{}> = () => {
	return (
		<StyledHeader>
			<Logo src={LogoUrl} alt="OatList" />
		</StyledHeader>
	);
};

export default Header;
