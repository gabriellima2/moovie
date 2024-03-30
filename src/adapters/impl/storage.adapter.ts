import { StorageAdapter } from '../storage.adapter'
import { storage } from '@/lib/storage'

class StorageAdapterImpl implements StorageAdapter {
	async set(key: string, value: string): Promise<void> {
		await storage.setItem(key, value)
	}
	async get(key: string): Promise<string | null> {
		return await storage.getItem(key)
	}
	async getAll(): Promise<readonly string[]> {
		return await storage.getAllKeys()
	}
	async delete(key: string): Promise<void> {
		await storage.removeItem(key)
	}
	async deleteAll(): Promise<void> {
		await storage.clear()
	}
}

export const makeStorageAdapter = () => new StorageAdapterImpl()
