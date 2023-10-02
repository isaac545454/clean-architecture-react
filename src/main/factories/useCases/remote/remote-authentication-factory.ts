import { RemoteAuthentication } from '@/data/usecases/authentication/remote-authentication'
import { makeAxiosHttpClient } from '../../httpClient/axios-http-client-factory'
import { Authentication } from '@/Domain/usecases'
import { makeApiUrl } from '../../httpClient/api-url-factory'

export const makeRemoteAuthentication = (path: string): Authentication => {
	return new RemoteAuthentication(makeApiUrl(path), makeAxiosHttpClient())
}
