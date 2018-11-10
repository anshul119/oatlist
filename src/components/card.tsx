import * as React from 'react';
import Styled from 'styled-components';
import * as GeoPattern from 'geopattern';

interface ICardProps {
	name: string;
}

const StyledCard = Styled.div`
	border: 2px solid black;
	flex-basis: 22%;
	margin: 5px;
	padding: 2px 5px;
	text-align: center;
	display: flex;
	align-items: center;

	p {
		text-transform: capitalize
	}
`;

const Avatar = Styled.img`
	height: 48px;
	width: 48px;
	margin-right: 5px;
`;

const Card: React.StatelessComponent<ICardProps> = props => {
	const pattern = GeoPattern.generate(props.name).toDataUri();

	return (
		<StyledCard>
			<Avatar src={pattern} />
			<p>{props.name}</p>
		</StyledCard>
	);
};

export default Card;
