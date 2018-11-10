import { IUserEntity } from 'api/schemas/user';

export interface IUserProps extends IUserEntity {}

export interface IUser {
	readonly id: number;
	readonly fullName: string;
}

export class User implements IUser {
	private props: IUserProps;

	constructor(props: IUserProps) {
		this.props = props;
	}

	get id() {
		return this.props.userId;
	}

	get fullName() {
		return `${this.props.firstName} ${this.props.lastName}`;
	}
}
