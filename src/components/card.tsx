import * as React from 'react';
import Styled from 'styled-components';

interface ICardProps {
	name: string;
}

const StyledCard = Styled.div`
	border: 2px solid black;
	flex-basis: 23%;
	margin: 5px;
	text-align: center;

	p {
		text-transform: capitalize
	}
`;

export default class Card extends React.Component<ICardProps, {}> {
	render() {
		return (
			<StyledCard>
				<p>{this.props.name}</p>
			</StyledCard>
		);
	}
}
