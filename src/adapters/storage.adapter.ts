export interface StorageAdapter {
	set(key: string, value: string): Promise<void>
	get(key: string): Promise<string | null>
	getAll(): Promise<readonly string[]>
	delete(key: string): Promise<void>
	deleteAll(): Promise<void>
}
