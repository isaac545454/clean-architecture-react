import { SaveAcessToken } from '@/Domain/usecases/save-acess-token';
import { LocalSaveAcessToken } from '@/data/usecases/save-acess-token/local-save-acess-token';
import { makeLocalStorageAdapter } from '@/main/factories/cache/local-storage-adapter-factory';

export const makeLocalSaveAcessToken = (): SaveAcessToken => new LocalSaveAcessToken(makeLocalStorageAdapter());
