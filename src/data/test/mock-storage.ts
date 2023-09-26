import { SetStorage } from '../protocols/cache/set-storage';

export class SetStorageSpy implements SetStorage {
	key: string = '';
	value: string = '';

	async set(key: string, value: string): Promise<void> {
		this.key = key;
		this.value = value;
	}
}
