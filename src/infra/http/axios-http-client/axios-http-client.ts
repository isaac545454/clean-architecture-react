import { HttpPostClient, HttpPostParams, HttpResponse, HttpStatusCode } from '@/data/protocols/http';
import axios from 'axios';

export class AxiosHttpClient implements HttpPostClient<any, any> {
	async post(params: HttpPostParams<any>): Promise<HttpResponse<any>> {
		let httpResponse;
		try {
			httpResponse = await axios.post(params.url, params.body);
		} catch (error) {
			httpResponse = {
				status: HttpStatusCode.notFound,
				body: 'Credenciais invalidas',
			};
		}
		return httpResponse;
	}
}
