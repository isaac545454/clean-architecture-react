import { makeAxiosHttpClient } from '../../httpClient/axios-http-client-factory'
import { AddAccount } from '@/Domain/usecases'
import { makeApiUrl } from '../../httpClient/api-url-factory'
import { RemoteAddAccount } from '@/data/usecases/add-account/remote-add-account'

export const makeAddAccount = (path: string): AddAccount => {
	return new RemoteAddAccount(makeApiUrl(path), makeAxiosHttpClient())
}
