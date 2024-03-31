import { SearchHistoryService } from '../search-history.service'

import { makeStorageAdapter } from '@/adapters/impl/storage.adapter'
import { StorageAdapter } from '@/adapters/storage.adapter'

import { KEYS } from '@/constants/keys'

class SearchHistoryServiceImpl implements SearchHistoryService {
	constructor(private readonly storage: StorageAdapter) {}
	async getAll(): Promise<string[]> {
		const data = await this.storage.get(KEYS.SEARCH_HISTORY)
		if (!data) return []
		return JSON.parse(data)
	}
	async set(value: string): Promise<void> {
		const history = await this.getAll()
		if (!history.length) {
			return await this.storage.set(
				KEYS.SEARCH_HISTORY,
				JSON.stringify([value])
			)
		}
		const historyWithoutSearchedValue = history.filter((v) => v !== value)
		await this.storage.set(
			KEYS.SEARCH_HISTORY,
			JSON.stringify([value, ...historyWithoutSearchedValue])
		)
	}
}

export const makeSearchHistoryService = () =>
	new SearchHistoryServiceImpl(makeStorageAdapter())
