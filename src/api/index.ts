import * as url from 'url';
import * as path from 'path';
import config from 'config/production';
import user from 'api/user';
import * as qs from 'qs';

/**
 * HTTP Request Methods
 */
export enum RequestMethod {
	GET = 'GET'
}

/**
 * Api request options which can be used to build an api call.
 */
export interface IRequestOptions {
	api?: string;
	pathname: string;
	method: RequestMethod;
	parameters?: any;
}

/**
 * this function can build an api call based on the provider options.
 * @param options
 */
export const buildRequest = (options: IRequestOptions): Promise<any> => {
	const { api, pathname, parameters, method } = options;

	/**
	 * Request URL is the URL that we will call and all the variable is replaced to values
	 * @type {string}
	 */
	let requestUrl = url.format({
		protocol: config.api.protocol,
		slashes: true,
		host: config.api.host,
		pathname: api ? path.join(api, pathname) : pathname
	});

	/**
	 * Prepare parameters that will be sent to the api.
	 */
	let body: string | undefined;
	if (parameters) {
		switch (method) {
			case RequestMethod.GET:
				requestUrl += `?${qs.stringify(parameters)}`;
				break;
			default:
				body = JSON.stringify(parameters);
				break;
		}
	}

	return new Promise((resolve, reject) => {
		fetch(requestUrl, {
			method: RequestMethod[method as any],
			body
		})
			.then((response: Response) => {
				if (!response.ok) {
					throw response;
				}

				return response.json().catch(() => {
					return {};
				});
			})
			.then((response: any) => {
				resolve(response);
			})
			.catch((error: any) => {
				reject(error);
			});
	});
};

/**
 * List of APIs
 */
export default {
	user
};
