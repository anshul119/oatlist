import { IUserEntity } from 'api/schemas/user';
import { buildRequest, RequestMethod } from 'api';
import config from 'config/production';

interface IFetchUserParameters {
	limit?: number;
	offset?: number;
	name?: string;
}

interface IFetchUserResponse extends Array<IUserEntity> {}

export default {
	fetchUsers: (parameters: IFetchUserParameters): Promise<IFetchUserResponse> => {
		return buildRequest({
			method: RequestMethod.GET,
			pathname: config.api.user,
			parameters
		});
	}
};
